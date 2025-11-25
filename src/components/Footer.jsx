"use client";

import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: "About Us", href: "/#about" },
      { name: "Our Team", href: "/#team" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    Properties: [
      { name: "Browse All", href: "/properties" },
      { name: "Add Property", href: "/add-property" },
      { name: "Manage Properties", href: "/manage-properties" },
      { name: "Pricing", href: "/pricing" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/#contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Terms of Service", href: "/terms" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">DeshiDwell</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted platform for finding the perfect rental accommodation
              in Dhaka. We connect tenants with quality properties across the
              city.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <a
                  href="mailto:info@deshidwell.com"
                  className="hover:text-white transition-colors"
                >
                  info@deshidwell.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <a
                  href="tel:+8801712345678"
                  className="hover:text-white transition-colors"
                >
                  +880 1712-345678
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <span className="text-sm">
                  House 123, Road 45
                  <br />
                  Gulshan 2, Dhaka 1212
                </span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-white font-semibold text-lg mb-3">
              Subscribe to our Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Get the latest properties and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © {currentYear} DeshiDwell. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Made with ❤️ in Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
