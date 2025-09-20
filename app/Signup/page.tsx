"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  //  Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
      const res = await axios.post("http://localhost:7002/api/signup", {
        email,
        password,
      });

      if (res.data.success) {
        // Save email to sessionStorage
        sessionStorage.setItem("userEmail", email);

        // Redirect to /multisiteconnect
        router.push("/multisiteconnect");
      } else {
        setMessage(res.data.message || "Something went wrong");
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
