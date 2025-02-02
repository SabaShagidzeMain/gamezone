import { supabase } from "@/utilities/supabase/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId, username, productId, locale } = await req.json(); // Destructure username

    // Ensure all necessary fields are present
    if (!userId || !username || !productId || !locale) {
      return new NextResponse(
        "Missing userId, username, productId, or locale",
        { status: 400 }
      );
    }

    console.log(
      `Creating checkout session for user: ${userId}, username: ${username}, product: ${productId}, locale: ${locale}`
    );

    const { data: product, error } = await supabase
      .from("games_admin")
      .select(
        "stripe_price_id, stripe_product_id, name, price, id, main_images"
      )
      .eq("stripe_price_id", productId)
      .single();

    if (error || !product) {
      console.error("Product not found:", error);
      return new NextResponse("Product not found", { status: 404 });
    }
    const discImage = product.main_images?.disc || "";

    const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    const successUrl = `${domain}/${locale}/games/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${domain}/${locale}/games/${product.id}/cancel`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: product.stripe_price_id,
          quantity: 1,
        },
      ],
      metadata: {
        stripe_price_id: product.stripe_price_id,
        stripe_product_id: product.stripe_product_id,
        product_name: product.name,
        product_price: product.price,
        product_id: product.id,
        disc_image: discImage,
        user_id: userId,
        username: username, // Now username is passed correctly in the metadata
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("Checkout session created:", session.id);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Error creating checkout session", { status: 500 });
  }
}
