"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuthContext, UserData } from "../utils/auth";
import { NEXT_PUBLIC_API } from "../utils/config";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
const { setAuth, setData} = useAuthContext()
  //  Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

    const cookieSetter = (data: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);

      Cookies.set("token", token, { expires: expirationDate });

      setData(data);
      setAuth(true);

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${NEXT_PUBLIC_API}/signup`, {
        email,
        password,
      });

      if (res.data.success) {
         cookieSetter(res.data.data, res.data.access_token);
        // Save email to sessionStorage
        // sessionStorage.setItem("userEmail", email);

        // Redirect to /multisiteconnect
        router.push("/multisiteconnect");
      } else {
         toast.error("Seems like you don't have an account in the platform.");
        // setMessage(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold mb-6 text-center">Sign Up</h1>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
