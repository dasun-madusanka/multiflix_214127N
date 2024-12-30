import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "expo-router";

interface User {
  name: string;
  token: string;
  username: string;
  email: string;
  favourites: number[]; 
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addFavourite: (movieId: number) => void;
  removeFavourite: (movieId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.push("SignIn");
  };

  const addFavourite = (movieId: number) => {
    if (user) {
      setUser({ ...user, favourites: [...user.favourites, movieId] });
    }
  };

  const removeFavourite = (movieId: number) => {
    if (user) {
      setUser({
        ...user,
        favourites: user.favourites.filter((id) => id !== movieId),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addFavourite, removeFavourite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
