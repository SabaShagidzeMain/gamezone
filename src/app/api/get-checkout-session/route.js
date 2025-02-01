import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function GET(req) {
  const url = new URL(req.url); // Get the full URL
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
      expand: ["line_items.data.price.product"], // Expanding product details
    });

    console.log("Stripe session fetched successfully:", session);

    // Check if the session has line items
    if (!session.line_items.data.length) {
      console.error("No items found in the session");
      return new NextResponse("No items found in the session", { status: 400 });
    }

    // Extract relevant data from the session
    const userId = session.metadata.user_id;
    const productId = session.line_items.data[0].price.product.id;
    const productName = session.line_items.data[0].price.product.name;
    const productImage = session.metadata?.disc_image || undefined;
    const purchaseTime = new Date(session.created * 1000).toLocaleString();
    const username = session.metadata.username;

    const productPrice = session.line_items.data[0].price.unit_amount / 100;

    console.log("Extracted session data:", {
      userId,
      productId,
      productName,
      productImage,
      purchaseTime,
      username,
      productPrice,
    });

    // Return extracted data, including price and image
    return NextResponse.json({
      userId,
      username,
      productName,
      productImage,
      purchaseTime,
      productPrice, // Send price to the front-end
    });
  } catch (error) {
    console.error("Error fetching Stripe session:", error);
    return new NextResponse("Error fetching session", { status: 500 });
  }
}
