"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./success.module.css";

import Link from "next/link";

import { FaStar } from "react-icons/fa";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const SubscriptionSuccess = () => {
  const searchParams = useSearchParams();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

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
    return (
      <div className={styles.loading_container}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.success_wrapper}>
      <div className={styles.success_inner}>
        <div>
          <FaStar className={styles.success_icon} />
        </div>
        <h1>Subscription Success</h1>
        <h3>Welcome to the Ultimate Gaming & Tech Subscription Service!</h3>
        <p>
          Your subscription plan:{" "}
          <span className={styles.sub_span}>
            {subscriptionData?.metadata?.plan}
          </span>
        </p>
        <p>
          Thank you for joining us. Your journey to exclusive perks, fresh
          content, and awesome benefits starts now. We`re thrilled to have you
          as part of our community!
        </p>
        <p>Let the adventure begin!</p>
        <div className={styles.success_button_container}>
          <button className={styles.success_button}>
            <Link href={`/${locale}/`}>Back To GameZone</Link>
          </button>
          <button className={styles.success_button}>
            <Link href={`/${locale}/login`}>Your Profile Page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
