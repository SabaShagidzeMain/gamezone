"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/utilities/supabase/supabaseClient";

// Create a UserContext to store user information globally
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession(); // Updated to use getSession
      if (session && session.user) {
        setUser(session.user);
      }
    };

    checkSession();
    // Optionally subscribe to changes in session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe(); // Clean up the subscription on unmount
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
