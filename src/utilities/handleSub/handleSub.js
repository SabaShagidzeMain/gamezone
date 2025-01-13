import { loadStripe } from "@stripe/stripe-js";

const handleSub = async (plan) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    const response = await fetch("/api/create-subscription-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, plan }),
    });

    if (!response.ok) {
      console.error("Failed to create subscription session");
      return;
    }

    const { id: sessionId } = await response.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Error redirecting to checkout:", error.message);
    }
  } catch (error) {
    console.error("Error in subscription request:", error);
  }
};

export default handleSub;
