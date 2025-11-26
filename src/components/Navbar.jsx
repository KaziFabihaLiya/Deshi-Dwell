"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X, Home, Building2, PlusCircle, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "About", href: "/#about", icon: null },
    { name: "Contact", href: "/#contact", icon: null },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft dark:bg-secondary-900/95"
          : "bg-white dark:bg-secondary-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-all duration-200">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-secondary-900 dark:text-white">
              DeshiDwell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            <SignedOut>
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 hover:shadow-medium transition-all duration-200"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <Link
                  href="/add-property"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 hover:shadow-medium transition-all duration-200"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Property</span>
                </Link>
                <Link
                  href="/manage-properties"
                  className="p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800 transition-all duration-200"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full ring-2 ring-primary-500",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-secondary-700 dark:text-secondary-300" />
              ) : (
                <Menu className="w-6 h-6 text-secondary-700 dark:text-secondary-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white dark:bg-secondary-900 rounded-lg shadow-large mt-2 border border-secondary-200 dark:border-secondary-700">
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <SignedOut>
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors font-medium text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary-600 text-white rounded-lg font-medium text-center hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 space-y-2">
                  <Link
                    href="/add-property"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Property</span>
                  </Link>
                  <Link
                    href="/manage-properties"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Properties</span>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
