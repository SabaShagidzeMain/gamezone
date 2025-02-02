"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utilities/supabase/supabase";
import { useCart } from "@/context/CartContext"; // Import the hook

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const { clearCart } = useCart(); // Destructure clearCart from your cart context
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = searchParams.get("session_id");
      console.log("Session ID:", sessionId);
      if (!sessionId) {
        console.error("Session ID not found in the URL");
        setLoading(false);
        return;
      }
      try {
        // Fetch session data from our API
        const response = await fetch(
          `/api/get-checkout-session?session_id=${sessionId}`
        );
        const data = await response.json();
        console.log("Session Data:", data);
        if (data.error) {
          console.error("Error fetching session data:", data.error);
          setLoading(false);
          return;
        }
        setSessionData(data);
        setLoading(false);

        // Insert each product as an order into the orders table
        const orders = data.products.map((product) => ({
          user_id: data.userId,
          username: data.username,
          product_name: product.productName,
          product_price: product.productPrice * 100, // stored in cents
          created_at: new Date().toISOString(), // or use data.purchaseTime if preferred
          product_image: product.productImage,
        }));

        const { error } = await supabase.from("orders").insert(orders);
        if (error) {
          console.error("Error inserting orders into Supabase:", error);
        } else {
          console.log("Orders inserted successfully");
          // Clear the cart when orders are successfully inserted
          clearCart();
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        setLoading(false);
      }
    };

    if (searchParams.has("session_id")) {
      fetchSessionData();
    } else {
      console.error("Session ID is missing in the URL");
      setLoading(false);
    }
  }, [searchParams, clearCart]);

  if (loading) return <p>Loading...</p>;
  if (!sessionData) return <p>Error fetching session data</p>;

  return (
    <div>
      <h1>Purchase Successful!</h1>
      <p>User: {sessionData.username}</p>
      <p>User Id: {sessionData.userId}</p>
      <p>Purchase Time: {sessionData.purchaseTime}</p>
      {sessionData.products.length > 0 ? (
        sessionData.products.map((product, index) => (
          <div key={index}>
            <p>Product: {product.productName}</p>
            <p>Price: {product.productPrice} GEL</p>
            {product.productImage && (
              <Image
                src={product.productImage}
                alt={product.productName}
                width={100}
                height={100}
              />
            )}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default CheckoutSuccessPage;
