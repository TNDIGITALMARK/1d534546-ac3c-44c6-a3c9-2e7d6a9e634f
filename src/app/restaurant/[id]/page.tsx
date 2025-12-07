"use client";

import { mockRestaurants, mockMenuItems } from "@/lib/data/mockRestaurants";
import { MenuItemCard } from "@/components/restaurant/menu-item-card";
import { BottomNavigation } from "@/components/restaurant/bottom-navigation";
import { ArrowLeft, Clock, MapPin, Star, Share2, Heart, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MenuItem, CartItem } from "@/lib/types/restaurant";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Restaurant not found
          </h2>
          <Link
            href="/"
            className="text-primary hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = mockMenuItems.filter((item) => item.restaurantId === restaurant.id);
  const categories = ["all", ...new Set(menuItems.map((item) => item.category))];

  const filteredMenuItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.menuItem.id === item.id
      );

      if (quantity === 0) {
        return prevCart.filter((cartItem) => cartItem.menuItem.id !== item.id);
      }

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity }
            : cartItem
        );
      }

      return [...prevCart, { menuItem: item, quantity }];
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="relative h-64 md:h-80">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-2xl">
              Currently Closed
            </span>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {restaurant.name}
          </h1>
          <p className="text-muted-foreground mb-3">
            {restaurant.cuisineType.join(", ")}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1 bg-success/10 text-success px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-sm">({restaurant.totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{restaurant.deliveryTime} mins</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{restaurant.distance} km away</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              {restaurant.address}, {restaurant.city}
            </span>
          </div>

          {/* Offers */}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Available Offers
                  </p>
                  {restaurant.offers.map((offer, index) => (
                    <p key={index} className="text-sm text-accent">
                      • {offer}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category === "all" ? "All Items" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Menu ({filteredMenuItems.length} items)
          </h2>
          {filteredMenuItems.length > 0 ? (
            <div className="space-y-3">
              {filteredMenuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No items in this category
            </p>
          )}
        </div>
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-50 md:bottom-0">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
              <p className="text-xl font-bold text-foreground">₹{cartTotal}</p>
            </div>
            <Link
              href="/checkout"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
