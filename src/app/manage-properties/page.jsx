"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Eye,
  Trash2,
  PlusCircle,
  MapPin,
  DollarSign,
  Home,
  AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageProperties() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Redirect if not authenticated
  if (isLoaded && !userId) {
    router.push("/sign-in");
    return null;
  }

  useEffect(() => {
    if (userId) {
      fetchUserProperties();
    }
  }, [userId]);

  const fetchUserProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`
      );
      const allProperties = await response.json();
      // Filter properties by current user
      const userProperties = allProperties.filter(
        (prop) => prop.userId === userId
      );
      setProperties(userProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProperties((prev) => prev.filter((prop) => prop._id !== id));
        toast.success("Property deleted successfully!");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("An error occurred");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Navbar />
      <Toaster position="top-center" />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-3">
                My Properties
              </h1>
              <p className="text-lg text-secondary-600">
                Manage all your property listings
              </p>
            </div>
            <Link
              href="/add-property"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 hover:shadow-medium transition-all duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add New Property</span>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">
                    Total Properties
                  </p>
                  <p className="text-3xl font-bold text-secondary-900">
                    {properties.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-secondary-900">
                    ৳
                    {properties
                      .reduce((sum, prop) => sum + prop.price, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Avg. Rent</p>
                  <p className="text-3xl font-bold text-secondary-900">
                    ৳
                    {properties.length > 0
                      ? Math.round(
                          properties.reduce(
                            (sum, prop) => sum + prop.price,
                            0
                          ) / properties.length
                        ).toLocaleString()
                      : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Properties List */}
          {loading ? (
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="animate-pulse p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-32 h-24 bg-secondary-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-secondary-200 rounded w-1/3" />
                      <div className="h-4 bg-secondary-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : properties.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50 border-b border-secondary-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                        Property
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                        Beds/Baths
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-100">
                    {properties.map((property) => (
                      <tr
                        key={property._id}
                        className="hover:bg-secondary-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={property.imageUrl}
                              alt={property.title}
                              className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <div className="font-semibold text-secondary-900">
                                {property.title}
                              </div>
                              <div className="text-sm text-secondary-600">
                                {property.shortDescription.substring(0, 40)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-secondary-700">
                            <MapPin className="w-4 h-4 mr-1 text-secondary-400" />
                            {property.location.split(",")[0]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                            {property.propertyType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-secondary-900">
                            ৳{property.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-secondary-500">
                            per month
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-secondary-700">
                            {property.bedrooms} BD / {property.bathrooms} BA
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/properties/${property._id}`}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(property._id)}
                              disabled={deleteLoading === property._id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deleteLoading === property._id ? (
                                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-secondary-100">
                {properties.map((property) => (
                  <div key={property._id} className="p-4">
                    <div className="flex space-x-4 mb-3">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-24 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 mb-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-sm text-secondary-600 mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location.split(",")[0]}
                        </div>
                        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                          {property.propertyType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                      <div>
                        <div className="font-semibold text-secondary-900">
                          ৳{property.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-secondary-500">
                          {property.bedrooms} BD / {property.bathrooms} BA
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/properties/${property._id}`}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property._id)}
                          disabled={deleteLoading === property._id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleteLoading === property._id ? (
                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                No Properties Yet
              </h3>
              <p className="text-secondary-600 mb-6">
                You havent listed any properties. Start by adding your first
                property.
              </p>
              <Link
                href="/add-property"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Your First Property</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
