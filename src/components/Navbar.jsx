"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X, Home, Building2, PlusCircle, Settings } from "lucide-react";

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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DeshiDwell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-800 hover:bg-white/20"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-800 hover:bg-white/20"
                }`}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              {/* Dropdown Menu for Logged In Users */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/add-property"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Property</span>
                </Link>
                <Link
                  href="/manage-properties"
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-gray-800 hover:bg-white/20"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-500",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2 border border-gray-100">
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <SignedOut>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    href="/add-property"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Property</span>
                  </Link>
                  <Link
                    href="/manage-properties"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
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

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const suggestions = [
//     {
//       name: "Toronto, Canada",
//       description: "For sights like CN Tower",
//       icon: "/assets/loft-apartment.jpg",
//     },
//     {
//       name: "Bangkok, Thailand",
//       description: "For its bustling nightlife",
//       icon: "/assets/eco-lodge.png",
//     },
//     {
//       name: "London, United Kingdom",
//       description: "For its stunning architecture",
//       icon: "/assets/family-suite.jpg",
//     },
//     {
//       name: "New York City, NY",
//       description: "For its top-notch dining",
//       icon: "/assets/flat-image.jpg",
//     },
//   ];

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo Section */}
//           <div className="shrink-0">
//             <Link href="/">
//               <Image
//                 src="/assets/logo.png"
//                 alt="DeshiDwell Logo"
//                 width={120}
//                 height={40}
//                 className="cursor-pointer"
//               />
//             </Link>
//           </div>

//           <div className="flex flex-col">
//             {/* Navigation Links - Hidden on mobile */}
//             <nav className="hidden lg:flex items-center space-x-12 py-2">
//               {[
//                 { href: "#header", label: "HOME" },
//                 { href: "#review", label: "REVIEWS" },
//                 { href: "#about", label: "ABOUT" },
//               ].map(({ href, label }) => (
//                 <Link
//                   key={label}
//                   href={href}
//                   className="relative group text-gray-700 font-semibold tracking-wide text-sm
//                           hover:text-primary transition-all duration-300 ease-out
//                           transform hover:scale-110 hover:-translate-y-0.5"
//                 >
//                   {label}
//                   <span
//                     className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-primary to-secondary
//                                scale-x-0 origin-left transition-transform duration-300 ease-out
//                                group-hover:scale-x-100"
//                   ></span>
//                 </Link>
//               ))}
//             </nav>
//             {/* Search Bar - Hidden on mobile */}
//             <div
//               className="hidden xl:flex items-center bg-white rounded-full border-2 border-gray-200
//                           shadow-md hover:shadow-xl transition-all duration-300 p-2 gap-1"
//             >
//               {/* Where */}
//               <div className="relative px-5 py-3 hover:bg-gray-50 rounded-full transition-colors duration-200 cursor-pointer">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
//                   Where
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Search destinations"
//                   className="bg-transparent outline-none text-sm w-36 font-medium placeholder:text-gray-400"
//                   onFocus={() => setShowSuggestions(true)}
//                   onBlur={() =>
//                     setTimeout(() => setShowSuggestions(false), 200)
//                   }
//                 />
//                 {showSuggestions && (
//                   <div
//                     className="absolute top-full left-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl
//                               border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300"
//                   >
//                     <div className="p-5">
//                       <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
//                         Suggested destinations
//                       </p>
//                       {suggestions.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5
//                                  rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] group"
//                         >
//                           <div
//                             className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden shadow-sm
//                                       group-hover:shadow-md transition-shadow"
//                           >
//                             <Image
//                               src={item.icon}
//                               alt={item.name}
//                               width={48}
//                               height={48}
//                               className="object-cover"
//                             />
//                           </div>
//                           <div>
//                             <p className="font-bold text-sm text-gray-800 group-hover:text-primary transition-colors">
//                               {item.name}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-0.5">
//                               {item.description}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="w-px h-10 bg-gray-200"></div>

//               {/* Check in */}
//               <div className="px-5 py-3 hover:bg-gray-50 rounded-full transition-colors duration-200 cursor-pointer">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
//                   Check in
//                 </label>
//                 <input
//                   type="date"
//                   className="bg-transparent outline-none text-sm w-32 font-medium cursor-pointer"
//                 />
//               </div>

//               <div className="w-px h-10 bg-gray-200"></div>

//               {/* Check out */}
//               <div className="px-5 py-3 hover:bg-gray-50 rounded-full transition-colors duration-200 cursor-pointer">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
//                   Check out
//                 </label>
//                 <input
//                   type="date"
//                   className="bg-transparent outline-none text-sm w-32 font-medium cursor-pointer"
//                 />
//               </div>

//               <div className="w-px h-10 bg-gray-200"></div>

//               {/* Who */}
//               <div className="px-5 py-3 hover:bg-gray-50 rounded-full transition-colors duration-200 cursor-pointer">
//                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
//                   Guests
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Add guests"
//                   className="bg-transparent outline-none text-sm w-28 font-medium placeholder:text-gray-400"
//                 />
//               </div>

//               {/* Search Button */}
//               <button
//                 className="bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 ml-2
//                              hover:scale-110 hover:shadow-lg active:scale-95
//                              transition-all duration-300 ease-out group"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2.5}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* User Section */}
//           <div className="flex items-center gap-4">
//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden btn btn-ghost btn-circle relative z-50"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Toggle mobile menu"
//             >
//               <div
//                 className={`hamburger-line origin-center transition-transform duration-300 ease-in-out ${
//                   mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
//                 } w-6 h-0.5 bg-gray-700 mb-1 rounded-full`}
//               ></div>
//               <div
//                 className={`hamburger-line transition-opacity duration-300 ease-in-out ${
//                   mobileMenuOpen ? "opacity-0" : "opacity-100"
//                 } w-6 h-0.5 bg-gray-700 mb-1 rounded-full`}
//               ></div>
//               <div
//                 className={`hamburger-line origin-center transition-transform duration-300 ease-in-out ${
//                   mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
//                 } w-6 h-0.5 bg-gray-700 rounded-full`}
//               ></div>
//             </button>

//             {/* User Menu */}
//             <div className="relative dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 cursor-pointer hover:shadow-md transition-shadow duration-300"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//                 {/* <UserButton afterSignOutUrl="/" /> */}
//               </div>
//               <ul
//                 tabIndex={0}
//                 className={`dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 absolute right-0 transition-all duration-300 ease-in-out transform origin-top ${
//                   showDropdown
//                     ? "opacity-100 visible translate-y-0"
//                     : "opacity-0 invisible -translate-y-3"
//                 }`}
//                 onBlur={() =>
//                   setTimeout(() => {
//                     setShowDropdown(false);
//                   }, 200)
//                 }
//               >
//                 <li>
//                   <Link href="/signup" className="hover:text-primary">
//                     Sign up
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/login" className="hover:text-primary">
//                     Log in
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/reserve" className="hover:text-primary">
//                     Reserve
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/book" className="hover:text-primary">
//                     Book Now
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Sliding Panel */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
//           mobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <nav className="flex flex-col space-y-6 p-6 mt-16 font-semibold tracking-wide">
//           {[
//             { href: "#header", label: "HOME" },
//             { href: "#review", label: "REVIEWS" },
//             { href: "#about", label: "ABOUT" },
//           ].map(({ href, label }) => (
//             <Link
//               key={label}
//               href={href}
//               className="text-gray-700 hover:text-primary transition-colors duration-300 ease-in-out"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }
