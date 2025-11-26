"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function PropertyDetails() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProperty(data);
      } else {
        console.error("Property not found");
      }
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Navbar />
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-1/4 mb-8" />
              <div className="h-96 bg-secondary-200 rounded-2xl mb-8" />
              <div className="space-y-4">
                <div className="h-6 bg-secondary-200 rounded w-3/4" />
                <div className="h-4 bg-secondary-200 rounded w-full" />
                <div className="h-4 bg-secondary-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Navbar />
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">
              Property Not Found
            </h1>
            <button
              onClick={() => router.push("/properties")}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Properties</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-large">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-secondary-900">
                  {property.propertyType}
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-secondary-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="flex items-center text-secondary-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    Listed on{" "}
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                  Description
                </h2>
                <p className="text-secondary-700 leading-relaxed whitespace-pre-line">
                  {property.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <Bed className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-secondary-900">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-secondary-600">Bedrooms</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <Bath className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-secondary-900">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-secondary-600">Bathrooms</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <Home className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-secondary-900">
                      {property.propertyType}
                    </div>
                    <div className="text-sm text-secondary-600">Type</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-secondary-900">
                      {property.location.split(",")[0]}
                    </div>
                    <div className="text-sm text-secondary-600">Area</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-secondary-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Price Card */}
                <div className="bg-white rounded-2xl p-6 shadow-large border-2 border-primary-100">
                  <div className="text-center mb-6">
                    <div className="text-sm text-secondary-600 mb-2">
                      Monthly Rent
                    </div>
                    <div className="text-4xl font-bold text-primary-600">
                      ৳{property.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-medium">
                      Contact Owner
                    </button>
                    <button className="w-full py-3 bg-secondary-100 text-secondary-700 rounded-xl font-semibold hover:bg-secondary-200 transition-all duration-200">
                      Schedule Visit
                    </button>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-secondary-700">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm text-secondary-500">Phone</div>
                        <div className="font-medium">+880 1712-345678</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-secondary-700">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm text-secondary-500">Email</div>
                        <div className="font-medium text-sm">
                          info@deshidwell.com
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                  <h3 className="font-semibold text-secondary-900 mb-3">
                    Quick Info
                  </h3>
                  <div className="space-y-2 text-sm text-secondary-700">
                    <div className="flex justify-between">
                      <span>Property ID:</span>
                      <span className="font-medium">
                        #{property._id.slice(-6)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
