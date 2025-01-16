"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabaseClient";
import styles from "./login.module.css";

import Profile from "@/Components/Profile/Profile";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const LoginPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const { user, error: authError, isLoading, signOut } = useUser();
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, email, plan")
      .eq("id", userId)
      .single();

    if (error) {
      setError("Failed to fetch user data.");
    } else {
      setUserData(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      fetchUserData(data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!username || !email || !password || !repeatPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const { user, error: insertError } = await supabase.from("users").upsert({
        id: data.user.id,
        username: username,
        email: email,
        plan: "basic",
      });

      if (insertError) {
        setError(insertError.message);
      } else {
        alert("Sign-up successful! Check your email for confirmation.");
        setShowModal(false);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    if (signOut) {
      await signOut();
      localStorage.removeItem("user");
      router.push(`${locale}/login`);
    } else {
      console.error("signOut function is not available.");
    }
  };

  return (
    <div className={styles.login_page_wrapper}>
      {!user ? (
        <div className={styles.login_box}>
          <h1 className={styles.login_header}>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.log_input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.log_input}
          />
          <div className={styles.button_wrapper}>
            <button
              className={styles.log_button}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              className={styles.log_button}
              onClick={() => setShowModal(true)}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <Profile userData={userData} logOut={handleLogout} />
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2 className={styles.signup_header}>Sign Up</h2>
            <input
              className={styles.log_input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={styles.log_input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.log_input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={styles.log_input}
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              className={styles.log_button}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <button
              className={styles.log_button}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
