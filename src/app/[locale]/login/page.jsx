"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabaseClient";
import styles from "./login.module.css";

const LoginPage = () => {
  const { user, error: authError, isLoading, signOut } = useUser(); // Using useUser for auth state
  const [userData, setUserData] = useState(null); // State to hold user data from users table
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Fetch user data from the users table when the user logs in
  useEffect(() => {
    if (user) {
      fetchUserData(user.id); // Fetch data when user is authenticated
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, email, plan") // Fetching user-specific data including 'plan'
      .eq("id", userId)
      .single();

    if (error) {
      setError("Failed to fetch user data.");
    } else {
      setUserData(data); // Set the fetched user data
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data)); // Store user info (e.g., id, username, plan)
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
      fetchUserData(data.user.id); // Fetch user data on login success
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user object
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
        plan: "basic", // Set default plan to 'basic'
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
      localStorage.removeItem("user"); // Remove user data from localStorage on logout
      router.push("/login");
    } else {
      console.error("signOut function is not available.");
    }
  };

  return (
    <div className={styles.login_page_wrapper}>
      {!user ? (
        <div className={styles.login_box}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button onClick={() => setShowModal(true)} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div className={styles.profile_box}>
          <h1>Profile</h1>
          <p>
            <strong>Username:</strong> {userData?.username || "Loading..."}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email || "Loading..."}
          </p>
          <p>
            <strong>Subscription Plan:</strong> {userData?.plan || "Basic"}{" "}
            {/* Displaying the plan */}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button onClick={handleSignUp} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <button onClick={() => setShowModal(false)}>Close</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
