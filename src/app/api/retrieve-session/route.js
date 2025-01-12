import Stripe from "stripe";
import { supabase } from "@/utilities/supabase/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Session ID is required" }), {
      status: 400,
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const { userId, plan } = session.metadata;

    const { data, error } = await supabase
      .from("users")
      .update({ plan })
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(session), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching session data or updating user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch session or update user plan" }),
      {
        status: 500,
      }
    );
  }
}
