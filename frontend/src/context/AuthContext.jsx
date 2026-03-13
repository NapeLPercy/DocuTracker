import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "docutracker_user";

function getStoredAuth() {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return { user: null, token: null };

  try {
    return JSON.parse(stored);
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth();

  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
  };

  const logout = () => {
    /* setUser(null);
    setToken(null);
    sessionStorage.removeItem(STORAGE_KEY);*/
    sessionStorage.clear();
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
