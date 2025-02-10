"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";
import styles from "./success.module.css";

interface SubscriptionData {
  metadata?: {
    plan?: string;
  };
  error?: string;
}

interface User {
  plan?: string;
}

const SubscriptionSuccess = () => {
  const searchParams = useSearchParams();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] || "en";

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = searchParams?.get("session_id");

      if (!sessionId) {
        console.error("No session_id in URL");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/retrieve-session?session_id=${sessionId}`
        );
        const session: SubscriptionData = await res.json();

        if (session.error) {
          console.error("Error fetching session data:", session.error);
          setLoading(false);
          return;
        }

        setSubscriptionData(session);
        setLoading(false);

        const userString = localStorage.getItem("user");
        if (userString) {
          const user: User = JSON.parse(userString);
          user.plan = session.metadata?.plan;
          localStorage.setItem("user", JSON.stringify(user));
          console.log("User plan updated:", user.plan);
        } else {
          console.error("User not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        setLoading(false);
      }
    };

    if (searchParams?.has("session_id")) {
      fetchSessionData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h1>{t("subscription.successTitle")}</h1>
        <h3>{t("subscription.welcomeMessage")}</h3>
        <p>
          {t("subscription.planLabel")}{" "}
          <span className={styles.sub_span}>
            {subscriptionData?.metadata?.plan || t("subscription.unknownPlan")}
          </span>
        </p>
        <p>{t("subscription.thankYouMessage")}</p>
        <p>{t("subscription.adventureMessage")}</p>
        <div className={styles.success_button_container}>
          <button className={styles.success_button}>
            <Link href={`/${locale}/`}>{t("navigation.backToHome")}</Link>
          </button>
          <button className={styles.success_button}>
            <Link href={`/${locale}/login`}>{t("navigation.profilePage")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
