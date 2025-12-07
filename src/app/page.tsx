"use client";

import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { BottomNavigation } from "@/components/restaurant/bottom-navigation";
import { mockRestaurants } from "@/lib/data/mockRestaurants";
import { MapPin, Search, SlidersHorizontal, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { CuisineType } from "@/lib/types/restaurant";

export default function HomePage() {
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const cuisineTypes: (CuisineType | "all")[] = [
    "all",
    "North Indian",
    "South Indian",
    "Street Food",
    "Biryani",
    "Sweets",
    "Chinese",
  ];

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
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

  const featuredRestaurants = mockRestaurants.filter((r) => r.featured);
  const topRated = [...mockRestaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-gradient-saffron text-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-90">Delivering to</p>
                <p className="font-semibold">Whitefield, Bangalore</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Cuisine Filter */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                  selectedCuisine === cuisine
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cuisine === "all" ? "All Cuisines" : cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {searchQuery === "" && selectedCuisine === "all" && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Featured Restaurants
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </section>
        )}

        {/* Top Rated Section */}
        {searchQuery === "" && selectedCuisine === "all" && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-success fill-success" />
              <h2 className="text-xl font-bold text-foreground">Top Rated</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRated.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </section>
        )}

        {/* All Restaurants / Filtered Results */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            {searchQuery || selectedCuisine !== "all"
              ? `${filteredRestaurants.length} Restaurants Found`
              : "All Restaurants Near You"}
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No restaurants found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCuisine("all");
                }}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}
