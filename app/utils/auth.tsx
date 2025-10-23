"use client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { errorHandler } from "./helpers";
import { NEXT_PUBLIC_API } from "./config";

interface AuthContextType {
  data: UserData | null;
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Provide a default value for the context
const defaultAuthContext: AuthContextType = {
  data: null,
  auth: false,
  setAuth: () => {},
  setData: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export interface UserData {
  dp: string;
  username: string;
  _id: string;
  email: string;
  isAuthenticated: boolean;
  name:string;
  user:{
    _id: string;
    username: string;
    email: string;
    dp: string;
    id:string;
    name:string;
  }
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();
  // const [loading, setLoading] = useState(false);

  const deleteToken = () => {
    Cookies.remove("authToken");
    router.push("/auth");
  };
  // console.log("auth running");
  const sendTokenAndVerify = async () => {
  
    try {
      // setLoading(true);
      const res = await axios.get(
        `${NEXT_PUBLIC_API}/verifyToken`, { withCredentials: true}
      
      );
  
      if (res.data.success) {
        setAuth(true);
        setData(res.data.data);
        // router.push("/webapp");
      } else {
        deleteToken();
      }
    } catch (error: unknown) {

      errorHandler(error);

      // setLoading(false);
      deleteToken();
    }
  };

  // useEffect(() => {
  //   sendTokenAndVerify();
  // }, []);
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API}/verifyToken`, { withCredentials: true });
      if (res.data.success) {
        setAuth(true);
        setData(res.data.data);
      
        router.push("/webapp");
      } else {
        Cookies.remove("authToken");
      }
    } catch {
      Cookies.remove("authToken");
    }
  };
  checkAuth();
}, []);

  const contextValue = useMemo(
    () => ({
      data,
      auth,
      setAuth,
      setData,
    }),
    [data, auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {/* )} */}
    </AuthContext.Provider>
  );
};
