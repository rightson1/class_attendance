"use client";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { IAdmin, IUserIdentity } from "@/lib/data_types";
import { useCustomToast } from "../atoms/functions";
import { auth } from "@/lib/firebase/client";
interface AuthContextType {
  admin: IAdmin | null;
  adminIdentity: IUserIdentity | null | {};
  fetchAdmin: (uid: string) => void;
  logout: () => void;
}
const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [adminIdentity, setAdminIdentity] = useState<IUserIdentity | {} | null>(
    {}
  );
  const { customToast } = useCustomToast();
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = () => {
    setAdminIdentity(null);
    setAdmin(null);
    localStorage.removeItem("user");
  };
  const fetchAdmin = async (uid: string) => {
    await axios
      .get("/api/admin", {
        params: {
          uid: uid,
        },
      })
      .then((res) => {
        const data = res.data;
        setAdmin(data);
        setAdminIdentity({ uid: data.uid, email: data.email });
        localStorage.setItem("admin", JSON.stringify(data));
      })
      .catch((err) => {
        clearUser();
      });
  };
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IAdmin | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, async (identity) => {
      if (identity) {
        if (identity.uid == localUser?.uid) {
          setAdmin(localUser);
          setAdminIdentity({ uid: identity.uid, email: identity.email });
        } else {
          fetchAdmin(identity.uid);
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
        router.push("/admin/login");
      },
    });
  };
  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        adminIdentity,
        fetchAdmin,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("Admin Auth must be used within an AuthProvider");
  }
  return context;
};
