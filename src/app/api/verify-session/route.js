import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/utilities/supabase/supabaseClient";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    const { session_id } = await req.json(); // Parse request body to get session_id

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Session not found.",
      });
    }

    // Check if payment is successful
    if (session.payment_status === "paid") {
      const userId = session.client_reference_id; // Retrieve userId from session
      const userPlan = session.metadata.plan; // Retrieve plan from session metadata

      if (!userId || !userPlan) {
        return NextResponse.json({
          success: false,
          message: "Missing userId or plan in session metadata.",
        });
      }

      // Update the user's plan in Supabase
      const { data, error } = await supabase
        .from("users")
        .update({ plan: userPlan }) // Update the plan column
        .eq("id", userId); // Match the correct user ID

      if (error) {
        console.error("Error updating plan:", error);
        return NextResponse.json({
          success: false,
          message: "Failed to update user plan in database.",
        });
      }

      return NextResponse.json({
        success: true,
        message: "User plan updated successfully.",
        data,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment was not successful.",
      });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}
