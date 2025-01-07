import { NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "@/lib/supabase"; // your supabase client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { sessionId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.metadata.userId; // You should set this during the checkout session creation


    const { data, error } = await supabase
      .from("users") // Your users table
      .update({ plan: session.metadata.plan }) // Update the plan column in the users table
      .eq("id", userId); // Match user by the unique user ID

    if (error) {
      console.error("Error updating user plan:", error);
      return NextResponse.error();
    }

    return NextResponse.json({ message: "User plan updated successfully!" });
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return NextResponse.error();
  }
}
