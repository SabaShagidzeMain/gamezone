"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      const updateUserPlan = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch("/api/verify-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id }),
          });

          if (response.ok) {
            setSuccess(true);
          } else {
            const { message } = await response.json();
            setError(message || "Error updating user plan.");
          }
        } catch (err) {
          setError("Network error. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      updateUserPlan();
    }
  }, [session_id]);

  return (
    <div>
      <h1>Subscription Successful!</h1>
      {loading && <p>Updating your plan...</p>}
      {success && <p>Your plan has been updated successfully.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SuccessPage;
