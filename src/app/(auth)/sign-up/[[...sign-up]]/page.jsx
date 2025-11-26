"use client";

import { SignUp, useUser, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        router.push("/"); // Replace with your desired redirect path, e.g., "/dashboard"
      }, 3000);
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center pl-90 py-5">
      <div className="w-full max-w-md flex flex-row justify-between items-center gap-20">
        <div className="text-left mb-8 text-black">
          <h1 className="text-3xl font-bold mb-2 text-nowrap">
            Sign Up Your Account
          </h1>
          <p className="text-secondary-600">
            Join <span className="text-[#214d21] font-bold">DeshiDwell</span>{" "}
            and find your perfect home
          </p>

          <hr />
        </div>

        <div className="rounded-2xl shadow-large p-8">
          <SignedOut>
            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-2xl font-bold text-secondary-900",
                  headerSubtitle: "text-secondary-600",
                  socialButtonsBlockButton:
                    "bg-white border-2 border-secondary-200 hover:bg-secondary-50 text-secondary-900",
                  socialButtonsBlockButtonText: "font-medium",
                  formButtonPrimary:
                    "bg-primary-600 hover:bg-primary-700 text-sm font-semibold",
                  footerActionLink: "text-primary-600 hover:text-primary-700",
                  identityPreviewText: "text-secondary-900",
                  formFieldLabel: "text-secondary-700 font-medium",
                  formFieldInput:
                    "border-secondary-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg",
                  dividerLine: "bg-secondary-200",
                  dividerText: "text-secondary-500",
                },
              }}
            />
          </SignedOut>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
