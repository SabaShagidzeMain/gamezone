import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function POST(req) {
  const { pathname } = req.nextUrl; // Correct way to access the pathname in Next.js API routes
  const locale = pathname.split("/")[1]; // Extract locale from pathname

  const { plan, userId } = await req.json(); // Pass the userId and plan in the request body

  let priceId;
  if (plan === "essential") {
    priceId = "price_1QYss1AmxgDfPxvUAKShC8GL";
  } else if (plan === "extra") {
    priceId = "price_1QegetAmxgDfPxvUmuPed4f2";
  } else if (plan === "premium") {
    priceId = "price_1QegfMAmxgDfPxvU5wf89VQz";
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      client_reference_id: userId, 
      metadata: {
        plan: plan,
      },
      success_url: `${process.env.YOUR_DOMAIN}/en/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.YOUR_DOMAIN}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.error();
  }
}
