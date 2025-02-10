import { loadStripe } from "@stripe/stripe-js";

// Define types for the function parameters
interface User {
  id: string;
  username: string;
}

const handlePurchase = async (
  productIds: string | string[],
  locale: string
): Promise<void> => {
  try {
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;
    const userId = user?.id;
    const username = user?.username;

    if (!userId || !username) {
      console.error("User not authenticated or username missing");
      return;
    }

    // Ensure productIds is always an array
    const productArray = Array.isArray(productIds) ? productIds : [productIds];

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        username,
        productIds: productArray, // Sending the productIds here
        locale,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create checkout session");
      return;
    }

    const { id: sessionId } = await response.json();
    console.log("Session ID received:", sessionId);

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
    console.error("Error in purchase request:", error);
  }
};

export default handlePurchase;
