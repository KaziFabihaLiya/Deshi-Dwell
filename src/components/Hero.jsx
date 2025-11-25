"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      title: "Find Your Perfect Home",
      subtitle: "Discover amazing rental properties across Dhaka",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      title: "Luxury Living Spaces",
      subtitle: "Experience comfort and elegance in prime locations",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      title: "Affordable & Comfortable",
      subtitle: "Quality accommodations that fit your budget",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Carousel Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
              {slides[currentSlide].subtitle}
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl animate-fade-in-delay-2">
              <div className="flex items-center flex-1 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Enter location (e.g., Gulshan, Banani)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <Link
                href={`/properties${
                  searchQuery ? `?search=${searchQuery}` : ""
                }`}
                className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  500+
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  Properties
                </div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  50+
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  Locations
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  1000+
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  Happy Tenants
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
}
