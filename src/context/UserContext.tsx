"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/utilities/supabase/supabase";

// Define types for the user and context value
interface User {
  id: string;
  email?: string; // Make email optional to match Supabase User type
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Create a UserContext to store user information globally
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true); // Set loading to true when starting to check session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Handle error if there's an issue with fetching session
      if (error) {
        setError(error.message);
        setIsLoading(false); // Set loading to false if there's an error
        return;
      }

      // Safely check if session and user are available
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || undefined, // email is optional
        };
        setUser(user);
      } else {
        setUser(null); // Clear user if session is not available
      }
      setIsLoading(false); // Set loading to false after session check
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoading(true); // Set loading to true while updating state
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || undefined, // email is optional
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Set loading to false after state change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user from state on logout
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOut, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
