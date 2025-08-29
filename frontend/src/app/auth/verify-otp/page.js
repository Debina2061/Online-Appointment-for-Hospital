"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/v1/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // OTP verified, redirect to reset password
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/v1/api/auth/forget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeLeft(60);
        setCanResend(false);
        setError("");
        alert("New OTP sent to your email!");
      }
    } catch (error) {
      console.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Info Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <HeartIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  D-code Hospital
                </h1>
                <p className="text-blue-100 text-sm">Secure Verification</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white leading-tight">
                Verify Your Identity
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Enter the 6-digit verification code we sent to your email to
                continue with password reset.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">
                    Secure verification process
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">
                    Code expires in 60 seconds
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <KeyIcon className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">
                    One-time verification code
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm italic">
                &quot;Your security is our priority&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - OTP Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  D-code Hospital
                </h1>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-blue-600">{email}</span>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength="6"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 font-mono"
                  placeholder="000000"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {timeLeft > 0
                      ? `Code expires in ${timeLeft}s`
                      : "Code expired"}
                  </p>
                  {otp.length === 6 && (
                    <div className="text-green-600 text-sm">✓ Complete</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Verify Code
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>

              <div className="text-center space-y-3">
                {canResend ? (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Resend verification code
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">
                    Didn&apos;t receive the code? Resend in {timeLeft}s
                  </p>
                )}

                <div>
                  <Link
                    href="/auth/login"
                    className="text-sm text-gray-600 hover:text-gray-500 transition-colors"
                  >
                    ← Back to login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
