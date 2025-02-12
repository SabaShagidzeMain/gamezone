import { supabase } from "@/utilities/supabase/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Type for the incoming request JSON payload
interface CheckoutRequestBody {
  userId: string;
  username: string;
  productIds: string[];
  locale: string;
}

// Type for the product fetched from the database
interface Product {
  stripe_price_id: string;
  stripe_product_id: string;
  name: string;
  price: number;
  id: string;
  main_images: string[];
}

// Type for the Next.js handler function
export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const { userId, username, productIds, locale }: CheckoutRequestBody =
      await req.json();

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

    const { data: products, error } = await supabase
      .from("games_admin")
      .select(
        "stripe_price_id, stripe_product_id, name, price, id, main_images"
      )
      .in("id", productIds);

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
      quantity: 1,
    }));

    const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    const successUrl = `${domain}/${locale}/games/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${domain}/${locale}/games/cancel`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
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
