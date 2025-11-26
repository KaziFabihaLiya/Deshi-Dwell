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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-200">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10 ">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-secondary-700" />
          <span className="text-sm font-medium text-secondary-700">
            Back to Home
          </span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen pt-10 max-sm:pt-15">
        {/* Left Side - Sign Up */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
          <div className="w-full max-w-md max-sm:ml-5 max-sm:mb-5">
            <SignedOut>
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none p-0",
                    headerTitle: "",
                    headerSubtitle: "",
                    socialButtonsBlockButton:
                      "bg-secondary-50 border border-secondary-200 hover:bg-secondary-100 text-secondary-900 transition-all rounded-lg",
                    socialButtonsBlockButtonText: "font-medium text-sm",
                    formButtonPrimary:
                      "bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all",
                    footerActionLink:
                      "text-primary-600 hover:text-primary-700 font-medium",
                    formFieldLabel:
                      "text-secondary-700 font-medium text-sm mb-1.5",
                    formFieldInput:
                      "bg-secondary-50 border border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-primary-500 rounded-lg transition-all",
                    dividerLine: "bg-secondary-200",
                    dividerText: "text-secondary-500 text-sm",
                    identityPreviewText: "text-secondary-900",
                    formFieldInputShowPasswordButton:
                      "text-secondary-600 hover:text-secondary-900",
                    otpCodeFieldInput:
                      "bg-secondary-50 border border-secondary-200 text-secondary-900",
                  },
                }}
              />
            </SignedOut>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white/50 backdrop-blur-md order-1 lg:order-2">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-3 rounded-xl shadow">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-secondary-900">
                DeshiDwell
              </span>
            </div>

            {/* Welcome */}
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-3 leading-tight">
              Start Your Journey
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              Join thousands who found their perfect home with DeshiDwell.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-secondary-700 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-2xl shadow border border-secondary-100">
              <div className="text-center">
                <Building2 className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary-900">
                  500+
                </div>
                <div className="text-xs text-secondary-600">Properties</div>
              </div>

              <div className="text-center">
                <Star className="w-5 h-5 text-accent-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary-900">4.8</div>
                <div className="text-xs text-secondary-600">Rating</div>
              </div>

              <div className="text-center">
                <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary-900">5K+</div>
                <div className="text-xs text-secondary-600">Happy Users</div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-secondary-900 mb-1">
                    Trusted by thousands
                  </p>
                  <p className="text-xs text-secondary-600">
                    Join our growing community of renters, buyers & owners
                    across Dhaka.
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
