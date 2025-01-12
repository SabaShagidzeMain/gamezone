"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SubscriptionSuccess = () => {
  const searchParams = useSearchParams();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = searchParams.get("session_id");

      console.log("Session ID:", sessionId);

      if (sessionId) {
        try {
          const res = await fetch(
            `/api/retrieve-session?session_id=${sessionId}`
          );
          const session = await res.json();

          console.log("Session Data:", session);

          if (session.error) {
            console.error("Error fetching session data:", session.error);
            return;
          }

          setSubscriptionData(session);
          setLoading(false);

          const user = JSON.parse(localStorage.getItem("user"));

          if (user) {
            user.plan = session.metadata?.plan;
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User plan updated:", user.plan);
          } else {
            console.error("User not found in localStorage");
          }
        } catch (error) {
          console.error("Error fetching session data:", error);
        }
      } else {
        console.error("No session_id in URL");
      }
    };

    if (searchParams.has("session_id")) {
      fetchSessionData();
    }
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Subscription Success</h1>
      <p>Your subscription plan: {subscriptionData?.metadata?.plan}</p>
    </div>
  );
};

export default SubscriptionSuccess;
