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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-500 ">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10 ">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 bg-white/80  backdrop-blur-sm rounded-lg hover:bg-white  transition-all shadow-soft"
        >
          <ArrowLeft className="w-4 h-4 text-secondary-700 " />
          <span className="text-sm font-medium text-secondary-700 ">
            Back to Home
          </span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding & Info */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 max-sm:mt-20">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-3 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-secondary-900 ">
                DeshiDwell
              </span>
            </div>

            {/* Welcome Text */}
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 max-sm:mb-2">
              Welcome Back!
            </h1>
            <p className="text-lg text-secondary-600  mb-8">
              Sign in to continue your journey in finding the perfect home in
              Dhaka
            </p>

            {/* Features */}
            <div className="space-y-4 hidden lg:block">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-600 " />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900  mb-1">
                    Verified Properties
                  </h3>
                  <p className="text-sm text-secondary-600 ">
                    Access hundreds of verified rental properties
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent-100  rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900  mb-1">
                    Secure Platform
                  </h3>
                  <p className="text-sm text-secondary-600 ">
                    Your data is protected with top-tier security
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-100  rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-secondary-600 " />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900  mb-1">
                    Trusted Community
                  </h3>
                  <p className="text-sm text-secondary-600 ">
                    Join thousands of satisfied users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white/50 max-sm:ml-5">
          <div className="w-full max-w-md">
            <SignIn
              redirectUrl={false}
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none p-0",
                  headerTitle: "",
                  headerSubtitle: "",
                  socialButtonsBlockButton:
                    "bg-secondary-50 border border-secondary-200  hover:bg-secondary-100    text-secondary-900  transition-all",
                  socialButtonsBlockButtonText: "font-medium text-sm",
                  formButtonPrimary:
                    "bg-primary-600 hover:bg-primary-700   text-white font-semibold rounded-lg transition-all",
                  footerActionLink:
                    "text-primary-600  hover:text-primary-700   font-medium",
                  formFieldLabel:
                    "text-secondary-700  font-medium text-sm mb-1.5",
                  formFieldInput:
                    "bg-secondary-50  border-secondary-200  text-secondary-900  focus:border-primary-500  focus:ring-primary-500  rounded-lg transition-all",
                  dividerLine: "bg-secondary-200 ",
                  dividerText: "text-secondary-500 text-sm",
                  identityPreviewText: "text-secondary-900 ",
                  formFieldInputShowPasswordButton:
                    "text-secondary-600 hover:text-secondary-900 ",
                  otpCodeFieldInput:
                    "bg-secondary-50 border-secondary-200  text-secondary-900 ",
                },
              }}
            />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
