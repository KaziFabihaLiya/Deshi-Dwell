"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Building2,
  Shield,
  Users,
  TrendingUp,
  MapPin,
  Home,
  Sparkles,
  CheckCircle2,
  Star,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";


export default function LandingPage() {
  // Features Data
  const features = [
    {
      icon: Building2,
      title: "Wide Selection",
      description:
        "Browse through hundreds of verified properties across Dhaka's prime locations.",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description:
        "All properties are verified for authenticity and quality by our expert team.",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description:
        "Join thousands of satisfied tenants and property owners in our platform.",
      color: "from-accent-500 to-accent-600",
    },
    {
      icon: TrendingUp,
      title: "Best Deals",
      description:
        "Find competitive prices and exclusive deals on premium rental properties.",
      color: "from-primary-600 to-accent-500",
    },
  ];

  // Popular Locations
  const popularLocations = [
    {
      name: "Gulshan",
      properties: 120,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
      priceRange: "৳35,000 - ৳150,000",
    },
    {
      name: "Banani",
      properties: 85,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      priceRange: "৳30,000 - ৳100,000",
    },
    {
      name: "Dhanmondi",
      properties: 95,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
      priceRange: "৳25,000 - ৳85,000",
    },
    {
      name: "Uttara",
      properties: 110,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
      priceRange: "৳20,000 - ৳95,000",
    },
  ];

  // Property Types
  const propertyTypes = [
    { icon: Home, name: "Apartments", count: 250 },
    { icon: Building2, name: "Houses", count: 120 },
    { icon: Sparkles, name: "Studios", count: 80 },
    { icon: MapPin, name: "Rooms", count: 150 },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "DeshiDwell made finding my apartment so easy! The process was smooth and the property was exactly as described. Highly recommend!",
    },
    {
      name: "Fatima Khan",
      role: "Business Owner",
      image: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      text: "As a property owner, listing on DeshiDwell was seamless. I found reliable tenants within a week. Great platform!",
    },
    {
      name: "Rahul Das",
      role: "University Student",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      text: "Found an affordable room near my university. The customer support was excellent and very helpful throughout.",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Why Choose DeshiDwell?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We provide the best rental experience with verified properties and
              trusted service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-secondary-100 hover:border-transparent"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Popular Locations Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Popular Locations
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Explore properties in Dhaka`s most sought-after neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location, index) => (
              <Link
                key={index}
                href={`/properties?location=${location.name}`}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-large transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <h3 className="text-2xl font-bold">{location.name}</h3>
                  </div>
                  <p className="text-sm text-gray-200 mb-1">
                    {location.properties}+ Properties
                  </p>
                  <p className="text-sm font-semibold text-primary-300">
                    {location.priceRange}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Property Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Browse by Property Type
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Find exactly what you`re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Link
                  key={index}
                  href={`/properties?type=${type.name}`}
                  className="group p-8 bg-gradient-to-br from-secondary-50 to-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-secondary-100 hover:border-primary-200"
                >
                  <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-700 group-hover:scale-110 transition-all duration-300 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2 text-center">
                    {type.name}
                  </h3>
                  <p className="text-secondary-600 text-center text-sm">
                    {type.count}+ available
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Trusted by thousands of happy tenants and property owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 ring-2 ring-primary-500"
                  />
                  <div>
                    <h4 className="font-semibold text-secondary-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-500 text-accent-500"
                    />
                  ))}
                </div>
                <p className="text-secondary-700 leading-relaxed italic">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Join DeshiDwell today and discover amazing rental properties
              across Dhaka
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/properties"
                className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-large hover:scale-105 transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-primary-100">+880 1712-345678</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-primary-100">info@deshidwell.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-primary-100">Gulshan 2, Dhaka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
