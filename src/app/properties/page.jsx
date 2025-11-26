"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  DollarSign,
  ChevronDown,
} from "lucide-react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`
      );
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = searchQuery
      ? property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesLocation = filters.location
      ? property.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesType = filters.propertyType
      ? property.propertyType === filters.propertyType
      : true;

    const matchesMinPrice = filters.minPrice
      ? property.price >= Number(filters.minPrice)
      : true;

    const matchesMaxPrice = filters.maxPrice
      ? property.price <= Number(filters.maxPrice)
      : true;

    const matchesBedrooms = filters.bedrooms
      ? property.bedrooms >= Number(filters.bedrooms)
      : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesBedrooms
    );
  });

  const handleReset = () => {
    setFilters({
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-3">
              Explore Properties
            </h1>
            <p className="text-lg text-secondary-600">
              Find your perfect rental accommodation in Dhaka
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-secondary-200 animate-slide-down">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Gulshan"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      setFilters({ ...filters, propertyType: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Room">Room</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Min Price (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Max Price (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="150000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                      setFilters({ ...filters, bedrooms: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div className="md:col-span-3 lg:col-span-5 flex justify-end">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 text-sm text-secondary-600 hover:text-secondary-900 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-secondary-600">
              Showing{" "}
              <span className="font-semibold text-secondary-900">
                {filteredProperties.length}
              </span>{" "}
              properties
            </p>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="h-56 bg-secondary-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-secondary-200 rounded w-3/4" />
                    <div className="h-4 bg-secondary-200 rounded w-1/2" />
                    <div className="h-4 bg-secondary-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Link
                  key={property._id}
                  href={`/properties/${property._id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-secondary-900">
                      {property.propertyType}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {property.title}
                    </h3>

                    <div className="flex items-center text-secondary-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                      {property.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                      <div className="flex items-center space-x-4 text-sm text-secondary-600">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ৳{property.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-secondary-500">
                          per month
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                No properties found
              </h3>
              <p className="text-secondary-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
