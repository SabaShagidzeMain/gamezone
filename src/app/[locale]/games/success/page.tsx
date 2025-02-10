"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utilities/supabase/supabase";
import { useCart } from "@/utilities/CartContext/CartContext";

interface Product {
  productName: string;
  productPrice: number;
  productImage: string;
}

interface SessionData {
  userId: string;
  username: string;
  purchaseTime: string;
  products: Product[];
}

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      // Safe access with optional chaining
      const sessionId = searchParams?.get("session_id") || null;
      console.log("Session ID:", sessionId);

      if (!sessionId) {
        console.error("Session ID not found in the URL");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/get-checkout-session?session_id=${sessionId}`
        );
        const data: SessionData & { error?: string } = await response.json();

        if (data.error) {
          console.error("Error fetching session data:", data.error);
          setLoading(false);
          return;
        }

        setSessionData(data);
        setLoading(false);

        if (data.userId && data.products) {
          const orders = data.products.map((product: Product) => ({
            user_id: data.userId,
            username: data.username,
            product_name: product.productName,
            product_price: product.productPrice * 100,
            created_at: new Date().toISOString(),
            product_image: product.productImage,
          }));

          const { error } = await supabase.from("orders").insert(orders);

          if (error) {
            console.error("Error inserting orders:", error);
          } else {
            console.log("Orders inserted successfully");
            clearCart();
          }
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        setLoading(false);
      }
    };

    // Add null check for searchParams
    if (searchParams?.has("session_id")) {
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
        sessionData.products.map((product: Product, index: number) => (
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
