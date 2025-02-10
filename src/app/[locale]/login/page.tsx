"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabase";

import Profile from "@/Components/Profile/Profile";
import OrderInfo from "@/Components/orderInfo/orderInfo";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface UserData {
  id: string;
  username: string;
  email: string;
  plan: "basic" | "essential" | "extra" | "premium";
}

const LoginPage = () => {
  const t = useTranslations();
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] || "en";

  const { user, error: authError, isLoading, signOut } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUserData = async (userId: string) => {
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
      // Check if the user data is present
      const user = data?.user;

      if (user) {
        const { error: insertError } = await supabase.from("users").upsert({
          id: user.id,
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
      } else {
        setError("User data is null.");
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
    <div className="my-[2rem] md:my-0 flex flex-col justify-between h-screen items-center p-4 md:p-16">
      {!user ? (
        <div className="flex mt-4 bg-[var(--background-color)] flex-col justify-center items-center gap-4 w-full md:w-80 h-[100%] p-4 md:p-8 shadow-[var(--box-shadow)] rounded-[5px]">
          <h1 className="text-[var(--text-color)] font-bold text-xl md:text-2xl">
            Login
          </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
          />
          <div className="flex flex-col md:flex-row justify-center items-center mt-4 md:mt-8 gap-4 md:gap-8">
            <button
              className="w-full md:w-24 h-10 md:h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[var(--accent-color)]"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              className="w-full md:w-24 h-10 md:h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[var(--accent-color)]"
              onClick={() => setShowModal(true)}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : (
        <div className="mt-8 md:mt-20 flex flex-col md:flex-row justify-start items-center gap-4 md:gap-8">
          <Profile userData={userData} logOut={handleLogout} />
          <OrderInfo />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:items-center pt-4 md:pt-0">
          <div className="bg-[var(--background-color)] w-full md:w-[50rem] mx-4 md:mx-0 p-4 md:p-8 rounded-[5px] flex flex-col items-center gap-4">
            <h2 className="text-[var(--text-color)] font-bold text-2xl md:text-4xl">
              Sign Up
            </h2>
            <input
              className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full h-10 md:h-8 bg-[var(--background-color)] p-2 rounded-[5px] text-[var(--text-color)] border border-solid border-[var(--text-color)]"
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button
                className="w-full md:w-24 h-10 md:h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[var(--accent-color)]"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <button
                className="w-full md:w-24 h-10 md:h-6 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[var(--accent-color)]"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
``;
