"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = searchParams.get("session_id");

      console.log("Session ID:", sessionId);

      if (!sessionId) {
        console.error("Session ID not found in the URL");
        return;
      }

      try {
        const response = await fetch(
          `/api/get-checkout-session?session_id=${sessionId}`
        );
        const data = await response.json();

        console.log("Session Data:", data);

        if (data.error) {
          console.error("Error fetching session data:", data.error);
          return;
        }

        setSessionData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    if (searchParams.has("session_id")) {
      fetchSessionData();
    } else {
      console.error("Session ID is missing in the URL");
    }
  }, [searchParams]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!sessionData) {
    return <p>Error fetching session data</p>;
  }

  const price = sessionData.productPrice ? sessionData.productPrice / 100 : 0;

  if (isNaN(price)) {
    return <p>Error: Invalid price data</p>;
  }

  return (
    <div>
      <h1>Purchase Successful!</h1>
      <p>User: {sessionData.username}</p>
      <p>User Id: {sessionData.userId}</p>
      <p>Product: {sessionData.productName}</p>
      <p>Price: {price} GEL</p>
      <p>Purchase Time: {sessionData.purchaseTime}</p>
      <Image
        src={sessionData.productImage}
        alt={sessionData.productName}
        width={100}
        height={100}
      />
    </div>
  );
};

export default CheckoutSuccessPage;
