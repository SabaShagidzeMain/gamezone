import { loadStripe } from "@stripe/stripe-js";

// Define types for the function parameters
interface User {
  id: string;
}

interface Plan {
}

const handleSub = async (plan: Plan): Promise<void> => {
  try {
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;
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

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    if (!stripe) {
      console.error("Stripe.js failed to load");
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Error redirecting to checkout:", error.message);
    }
  } catch (error) {
    console.error("Error in subscription request:", error);
  }
};

export default handleSub;
