import Stripe from "stripe";
import { supabase } from "@/utilities/supabase/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Define the function to handle GET requests
export async function GET(req: Request): Promise<Response> {
  const sessionId = new URL(req.url).searchParams.get("session_id"); // Extract session_id from query params

  // If session_id is missing, return an error response
  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Session ID is required" }), {
      status: 400,
    });
  }

  try {
    // Retrieve the session data from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Extract metadata and assign types for userId and plan
    const { userId, plan } = session.metadata as {
      userId: string;
      plan: string;
    };

    // Update user plan in Supabase
    const { data, error } = await supabase
      .from("users")
      .update({ plan })
      .eq("id", userId);

    // Handle any errors from Supabase
    if (error) {
      throw new Error(error.message);
    }

    // Return session data if successful
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error fetching session data or updating user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch session or update user plan" }),
      { status: 500 }
    );
  }
}
