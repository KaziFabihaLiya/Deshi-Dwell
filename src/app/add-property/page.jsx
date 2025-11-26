"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProperty() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    location: "",
    bedrooms: "1",
    bathrooms: "1",
    propertyType: "Apartment",
    imageUrl: "",
    amenities: "",
  });

  // Redirect if not authenticated
  if (isLoaded && !userId) {
    router.push("/sign-in");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert amenities string to array
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const propertyData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        amenities: amenitiesArray,
        userId: userId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Property added successfully!");
        setTimeout(() => {
          router.push(`/properties/${data._id}`);
        }, 1500);
      } else {
        toast.error("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Navbar />
      <Toaster position="top-center" />

      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-3">
              Add New Property
            </h1>
            <p className="text-lg text-secondary-600">
              Fill in the details to list your property
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6 flex items-center">
                <Home className="w-6 h-6 mr-2 text-primary-600" />
                Basic Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Modern 3BR Apartment in Gulshan"
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Brief one-line description (max 100 characters)"
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-secondary-500 mt-1">
                    {formData.shortDescription.length}/100 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Detailed description of the property..."
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-primary-600" />
                Property Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Gulshan 2, Dhaka"
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Monthly Rent (৳) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g., 45000"
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Bed className="w-4 h-4 inline mr-1" />
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Bedroom{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Bath className="w-4 h-4 inline mr-1" />
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Bathroom{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Home className="w-4 h-4 inline mr-1" />
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Room">Room</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="e.g., WiFi, AC, Parking, Security, Gym"
                  className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-secondary-500 mt-1">
                  Separate each amenity with a comma
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 bg-secondary-200 text-secondary-700 rounded-xl font-semibold hover:bg-secondary-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 hover:shadow-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Add Property</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
