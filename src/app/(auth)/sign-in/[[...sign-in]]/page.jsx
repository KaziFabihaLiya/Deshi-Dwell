"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import { Building2, ArrowLeft, Sparkles, Shield, Users } from "lucide-react";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Signed in successfully! Welcome back!", {
        duration: 3000,
        position: "top-center",
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
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
        {/* Left Side - Branding & Info */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
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
              Welcome Back!
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
              Sign in to continue your journey in finding the perfect home in
              Dhaka
            </p>

            {/* Features */}
            <div className="space-y-4 hidden lg:block">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Verified Properties
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Access hundreds of verified rental properties
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Secure Platform
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Your data is protected with top-tier security
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Trusted Community
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Join thousands of satisfied users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white/50 dark:bg-secondary-800/50 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-large p-8 border border-secondary-100 dark:border-secondary-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                  Sign In
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Enter your credentials to access your account
                </p>
              </div>

              <SignIn
                redirectUrl={false}
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
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

              <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
