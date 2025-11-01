"use client";
import React, { useState } from "react";
import axios from "axios";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import toast from "react-hot-toast";

interface ForgotPasswordFlowProps {
  onBack: () => void;
  initialEmail?: string;
}

const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  onBack,
  initialEmail = "",
}) => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${NEXT_PUBLIC_API}/send-otp`, {
        email,
      });

      if (res.data.success) {
        toast.success("OTP sent to your email successfully");
        setStep("otp");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error?.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${NEXT_PUBLIC_API}/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        toast.success("OTP verified successfully");
        setStep("reset");
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${NEXT_PUBLIC_API}/reset-password`, {
        email,
        oldPassword: oldPassword || undefined,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully");
        // Go back to login
        onBack();
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16 space-y-6 bg-[#1A1A1A] border border-[#333] rounded-2xl z-50 relative">
      {/* Header */}
      <div className="w-full">
        <button
          onClick={onBack}
          className="text-white/70 hover:text-white text-sm transition-colors mb-4"
        >
          ← Back to Login
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Reset Password
        </h2>
        <p className="text-gray-400 text-sm">
          {step === "email" && "Enter your email address to receive an OTP"}
          {step === "otp" && "Enter the 6-digit OTP sent to your email"}
          {step === "reset" && "Enter your new password"}
        </p>
      </div>

      {/* Step 1: Email Input */}
      {step === "email" && (
        <div className="space-y-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base text-white font-medium">
              Email
            </label>
            <div className="relative flex items-center rounded-xl border border-[#333] bg-[#2c2d30] px-4 py-3 focus-within:border-white/30 transition-colors">
              <MdOutlineAccountCircle className="text-xl text-white/60 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-full bg-transparent outline-none text-white placeholder-white/40 text-sm sm:text-base ml-3"
                autoComplete="email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendOTP();
                  }
                }}
                autoFocus
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={loading || !email.trim()}
            className="w-full px-6 py-4 rounded-xl bg-[#F94CFF] hover:bg-[#ff55ff] text-white font-medium text-sm sm:text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* Step 2: OTP Verification */}
      {step === "otp" && (
        <div className="space-y-6">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base text-white font-medium">
              Enter OTP
            </label>
            <div className="relative flex items-center rounded-xl border border-[#333] bg-[#2c2d30] px-4 py-3 focus-within:border-white/30 transition-colors">
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                placeholder="000000"
                className="w-full h-full bg-transparent outline-none text-white placeholder-white/40 text-center text-2xl tracking-widest"
                autoComplete="one-time-code"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleVerifyOTP();
                  }
                }}
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-400">
              Check your email for the 6-digit OTP
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("email")}
              className="flex-1 px-6 py-4 rounded-xl bg-[#2c2d30] hover:bg-[#3c3d40] text-white font-medium text-sm sm:text-base transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="flex-1 px-6 py-4 rounded-xl bg-[#F94CFF] hover:bg-[#ff55ff] text-white font-medium text-sm sm:text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="text-sm text-[#F94CFF] hover:text-[#ff55ff] hover:underline transition-colors disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === "reset" && (
        <div className="space-y-6">
          {/* Old Password (Optional) */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base text-white font-medium">
              Old Password <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative flex items-center rounded-xl border border-[#333] bg-[#2c2d30] px-4 py-3 focus-within:border-white/30 transition-colors">
              <CiLock className="text-xl text-white/60 flex-shrink-0" />
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password (optional)"
                className="w-full h-full bg-transparent outline-none text-white placeholder-white/40 text-sm sm:text-base ml-3"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base text-white font-medium">
              New Password
            </label>
            <div className="relative flex items-center rounded-xl border border-[#333] bg-[#2c2d30] px-4 py-3 focus-within:border-white/30 transition-colors">
              <CiLock className="text-xl text-white/60 flex-shrink-0" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-full bg-transparent outline-none text-white placeholder-white/40 text-sm sm:text-base ml-3"
                autoComplete="new-password"
              />
            </div>
            <p className="text-xs text-gray-400">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm sm:text-base text-white font-medium">
              Confirm New Password
            </label>
            <div className="relative flex items-center rounded-xl border border-[#333] bg-[#2c2d30] px-4 py-3 focus-within:border-white/30 transition-colors">
              <CiLock className="text-xl text-white/60 flex-shrink-0" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full h-full bg-transparent outline-none text-white placeholder-white/40 text-sm sm:text-base ml-3"
                autoComplete="new-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("otp")}
              className="flex-1 px-6 py-4 rounded-xl bg-[#2c2d30] hover:bg-[#3c3d40] text-white font-medium text-sm sm:text-base transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleResetPassword}
              disabled={loading || !newPassword || !confirmPassword}
              className="flex-1 px-6 py-4 rounded-xl bg-[#F94CFF] hover:bg-[#ff55ff] text-white font-medium text-sm sm:text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordFlow;
