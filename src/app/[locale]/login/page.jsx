"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabase";

import Profile from "@/Components/Profile/Profile";
import OrderInfo from "@/Components/orderInfo/orderInfo";

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

      // Clear input fields after successful login
      setEmail("");
      setPassword("");
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
      router.push(`/${locale ? locale : "en"}/login`);
    } else {
      console.error("signOut function is not available.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen justify-center items-center p-16">
      {!user ? (
        <div className="flex mt-4 bg-[var(--background-color)] flex-col justify-center items-center gap-4 w-80 h-[100%] p-8 shadow-[var(--box-shadow)] rounded-[5px]">
          <h1 className="text-[var(--text-color)] font-bold">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
          />
          <div className="flex justify-center items-center mt-8 gap-8">
            <button
              className="w-24 h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[var(--accent-color)]"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              className="w-24 h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[var(--accent-color)]"
              onClick={() => setShowModal(true)}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div className="mt-20 flex justify-start items-center gap-8">
          <Profile userData={userData} logOut={handleLogout} />
          <OrderInfo />
        </div>
      )}

      {showModal && (
        <div className="absolute bg-[var(--background-color)] w-full flex justify-center items-center text-[var(--text-color)] mt-[3rem]">
          <div className="flex justify-center items-center flex-col p-8 gap-4 w-[50rem] pt-[3rem]">
            <h2 className="text-[var(--text-color)] font-bold text-[2.5rem]">Sign Up</h2>
            <input
              className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="h-8 bg-[var(--background-color)] p-[0.3rem] rounded-[5px] text-[var(--text-color)] border-[1px] border-[solid] border-[var(--text-color)]"
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              className="w-24 h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[var(--accent-color)]"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <button
              className="w-24 h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[var(--accent-color)]"
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
