"use client";
import { IUser, IUserIdentity, TRole } from "@/lib/data_types";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useCustomToast } from "../atoms/functions";
import { auth } from "@/lib/firebase/client";
interface AuthContextType {
  user: IUser | null;
  userIdentity: IUserIdentity | null | {};
  fetchUser: (uid: string) => void;
  role: TRole | "";
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userIdentity, setUserIdentity] = useState<IUserIdentity | {} | null>(
    {}
  );
  const { customToast } = useCustomToast();
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();
  const [role, setRole] = useState<TRole | "">("");
  useEffect(() => {
    if (user) {
      setRole(user.role);
    } else if (!user) {
      const pathrole = pathname.split("/")[1];
      setRole(
        pathrole === "admin"
          ? "admin"
          : pathrole === "student"
          ? "student"
          : pathrole === "lecture"
          ? "lecture"
          : ""
      );
    }
  }, [pathname, user]);
  const clearUser = () => {
    setUserIdentity(null);
    setUser(null);
    localStorage.removeItem("user");
  };
  const fetchUser = async (uid: string) => {
    await axios
      .get("/api/users", {
        params: {
          uid: uid,
        },
      })
      .then((res) => {
        const data = res.data;
        setUser(data);
        setUserIdentity({ uid: data.uid, email: data.email });
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        clearUser();
      });
  };
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUser | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, async (identity) => {
      if (identity) {
        if (identity.uid == localUser?.uid) {
          setUser(localUser);
          setUserIdentity({ uid: identity.uid, email: identity.email });
        } else {
          fetchUser(identity.uid);
        }
      } else {
        clearUser();
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const logout = async () => {
    customToast({
      func: async () => {
        clearUser();
        await auth.signOut();
      },
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        userIdentity,
        role,
        fetchUser,
        logout,
      }}
    >
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
