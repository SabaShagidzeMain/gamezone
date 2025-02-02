import { supabase } from "@/utilities/supabase/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId, username, productIds, locale } = await req.json();

    // Ensure all necessary fields are present
    if (!userId || !username || !productIds || !locale) {
      return new NextResponse(
        "Missing userId, username, productIds, or locale",
        { status: 400 }
      );
    }

    console.log(
      `Creating checkout session for user: ${userId}, username: ${username}, products: ${productIds.length} items, locale: ${locale}`
    );

    console.log("Product IDs received:", productIds);

    // Fetch products from the database using the productIds
    const { data: products, error } = await supabase
      .from("games_admin")
      .select(
        "stripe_price_id, stripe_product_id, name, price, id, main_images"
      )
      .in("id", productIds); // Query using the product's 'id' field

    if (error || !products.length) {
      console.log("Products fetched:", products);
      console.error(
        "Error fetching products:",
        error ? error.message : "No products found"
      );
      return new NextResponse("Some products not found", { status: 404 });
    }

    const lineItems = products.map((product) => ({
      price: product.stripe_price_id,
      quantity: 1, // Or use the quantity from the cart if available
    }));

    const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    const successUrl = `${domain}/${locale}/games/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${domain}/${locale}/games/cancel`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems, // No 'product_data' field here
      metadata: {
        user_id: userId,
        username: username,
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
