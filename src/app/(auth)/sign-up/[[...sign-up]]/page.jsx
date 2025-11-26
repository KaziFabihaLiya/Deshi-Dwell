"use client";

import { SignUp, useUser, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import {
  Building2,
  ArrowLeft,
  CheckCircle,
  Star,
  TrendingUp,
  Heart,
} from "lucide-react";

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Signed up successfully! Welcome to DeshiDwell!", {
        duration: 3000,
        position: "top-center",
      });

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#5f6f5f", "#e98439", "#4d5a4d"],
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [isSignedIn, router]);

  const benefits = [
    "Browse 500+ verified properties",
    "Save your favorite listings",
    "Get instant property updates",
    "Direct contact with owners",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br  dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-secondary-700 transition-all shadow-soft"
        >
          <ArrowLeft className="w-4 h-4 text-secondary-700 dark:text-secondary-300" />
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Back to Home
          </span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Sign Up Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
          <div className="w-full max-w-md">
              <SignedOut>
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none p-0",
                      headerTitle: "",
                      headerSubtitle: "",
                      socialButtonsBlockButton:
                        "bg-secondary-50 dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600 text-secondary-900 dark:text-white transition-all",
                      socialButtonsBlockButtonText: "font-medium text-sm",
                      formButtonPrimary:
                        "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg transition-all",
                      footerActionLink:
                        "text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium",
                      formFieldLabel:
                        "text-secondary-700 dark:text-secondary-300 font-medium text-sm mb-1.5",
                      formFieldInput:
                        "bg-secondary-50 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600 text-secondary-900 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-lg transition-all",
                      dividerLine: "bg-secondary-200 dark:bg-secondary-600",
                      dividerText:
                        "text-secondary-500 dark:text-secondary-400 text-sm",
                      identityPreviewText: "text-secondary-900 dark:text-white",
                      formFieldInputShowPasswordButton:
                        "text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white",
                      otpCodeFieldInput:
                        "bg-secondary-50 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600 text-secondary-900 dark:text-white",
                    },
                  }}
                />
              </SignedOut>

              <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
          </div>
        </div>

        {/* Right Side - Benefits & Branding */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white/50 dark:bg-secondary-800/50 backdrop-blur-sm order-1 lg:order-2">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-3 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-secondary-900 dark:text-white">
                DeshiDwell
              </span>
            </div>

            {/* Welcome Text */}
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              Start Your Journey
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
              Join thousands of users who found their perfect home through
              DeshiDwell
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700 dark:text-secondary-300 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-soft border border-secondary-100 dark:border-secondary-700">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                  500+
                </div>
                <div className="text-xs text-secondary-600 dark:text-secondary-400">
                  Properties
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                  4.8
                </div>
                <div className="text-xs text-secondary-600 dark:text-secondary-400">
                  Rating
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                  5K+
                </div>
                <div className="text-xs text-secondary-600 dark:text-secondary-400">
                  Happy Users
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white mb-1">
                    Trusted by thousands
                  </p>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400">
                    Join our growing community of property seekers and owners
                    across Dhaka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
