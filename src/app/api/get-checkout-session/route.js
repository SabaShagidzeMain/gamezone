import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/utilities/supabase/supabase"; // Import the pre-configured client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function GET(req) {
  const url = new URL(req.url);
  const session_id = url.searchParams.get("session_id"); // Extract session_id from query params

  console.log("Session ID received:", session_id);

  if (!session_id) {
    console.error("Session ID is required");
    return new NextResponse("Session ID is required", { status: 400 });
  }

  try {
    console.log("Fetching session data from Stripe...");
    // Fetch the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"],
    });

    console.log("Stripe session fetched successfully:", session);

    // Check if the session has line items
    if (!session.line_items.data.length) {
      console.error("No items found in the session");
      return new NextResponse("No items found in the session", { status: 400 });
    }

    // Extract common session data
    const userId = session.metadata.user_id;
    const username = session.metadata.username;
    const purchaseTime = new Date(session.created * 1000).toLocaleString();

    // Map each line item to a product object.
    // Use the Stripe product ID as 'stripeProductId'
    const rawProducts = session.line_items.data.map((item) => {
      const prod = item.price.product;
      return {
        stripeProductId: prod.id,
        productName: prod.name,
        productImage: prod.images?.[0] || "", // Fallback image (will be replaced below)
        productPrice: item.price.unit_amount / 100,
        quantity: item.quantity,
      };
    });

    // Query Supabase for disc images using stripeProductId
    const stripeProductIds = rawProducts.map((p) => p.stripeProductId);
    const { data: gamesData, error: gamesError } = await supabase
      .from("games_admin")
      .select("stripe_product_id, main_images")
      .in("stripe_product_id", stripeProductIds);

    if (gamesError) {
      console.error("Error fetching games data from Supabase:", gamesError);
      // Continue with rawProducts if this fails
    }

    // For each product from Stripe, replace its image with the disc image from Supabase if available.
    const products = rawProducts.map((product) => {
      const game = gamesData?.find(
        (g) => g.stripe_product_id === product.stripeProductId
      );
      return {
        ...product,
        productImage:
          game && game.main_images?.disc
            ? game.main_images.disc
            : product.productImage,
      };
    });

    console.log("Extracted session data:", {
      userId,
      username,
      purchaseTime,
      products,
    });

    return NextResponse.json({
      userId,
      username,
      purchaseTime,
      products,
    });
  } catch (error) {
    console.error("Error fetching Stripe session:", error);
    return new NextResponse("Error fetching session", { status: 500 });
  }
}
