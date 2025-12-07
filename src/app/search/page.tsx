"use client";

import { BottomNavigation } from "@/components/restaurant/bottom-navigation";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { mockRestaurants } from "@/lib/data/mockRestaurants";
import { Search, Filter, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";
import { CuisineType, DietaryPreference } from "@/lib/types/restaurant";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | "all">("all");
  const [selectedDiet, setSelectedDiet] = useState<DietaryPreference | "all">("all");
  const [sortBy, setSortBy] = useState<"rating" | "deliveryTime" | "distance">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const cuisineTypes: (CuisineType | "all")[] = [
    "all",
    "North Indian",
    "South Indian",
    "Street Food",
    "Biryani",
    "Sweets",
    "Chinese",
    "Bengali",
    "Gujarati",
  ];

  const dietaryOptions: (DietaryPreference | "all")[] = [
    "all",
    "vegetarian",
    "non-vegetarian",
    "vegan",
    "jain",
  ];

  const popularSearches = [
    "Biryani",
    "Pizza",
    "Dosa",
    "Burger",
    "Thali",
    "Sweets",
    "Chinese",
    "Momos",
  ];

  const recentSearches = ["Mumbai Spice Corner", "South Indian", "Biryani"];

  let filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesCuisine =
      selectedCuisine === "all" ||
      restaurant.cuisineType.includes(selectedCuisine);
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineType.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCuisine && matchesSearch;
  });

  // Sort restaurants
  filteredRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "deliveryTime") return a.deliveryTime - b.deliveryTime;
    if (sortBy === "distance") return a.distance - b.distance;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Search */}
      <header className="bg-gradient-saffron text-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Search</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters & Sort</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            {/* Cuisine Filter */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">Cuisine Type</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {cuisineTypes.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                      selectedCuisine === cuisine
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cuisine === "all" ? "All" : cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">Sort By</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "rating"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  Rating
                </button>
                <button
                  onClick={() => setSortBy("deliveryTime")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "deliveryTime"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  Delivery Time
                </button>
                <button
                  onClick={() => setSortBy("distance")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "distance"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  Distance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results or Suggestions */}
        {searchQuery === "" ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-lg font-bold text-foreground">
                    Recent Searches
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Searches */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Popular Searches
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </section>

            {/* All Restaurants */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                All Restaurants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </section>
          </>
        ) : (
          // Search Results
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              {filteredRestaurants.length} Results for "{searchQuery}"
            </h2>
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Results Found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try searching for something else
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
