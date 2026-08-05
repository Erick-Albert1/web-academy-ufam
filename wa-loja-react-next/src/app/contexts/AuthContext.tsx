"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only available client-side, so the initial session hydration must happen inside an effect.
      setEmail(storedUser);
    }
  }, []);

  function login(email: string) {
    setEmail(email);
    localStorage.setItem("user", email);
    router.push("/");
  }

  function logout() {
    setEmail(null);
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
