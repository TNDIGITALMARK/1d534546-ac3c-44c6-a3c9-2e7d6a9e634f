"use client";

import { BottomNavigation } from "@/components/restaurant/bottom-navigation";
import {
  User,
  MapPin,
  Heart,
  CreditCard,
  Gift,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Star,
} from "lucide-react";

export default function ProfilePage() {
  const userProfile = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    loyaltyPoints: 450,
  };

  const savedAddresses = [
    {
      id: "1",
      type: "home" as const,
      addressLine1: "Flat 204, Skyline Apartments",
      city: "Whitefield, Bangalore",
      isDefault: true,
    },
    {
      id: "2",
      type: "work" as const,
      addressLine1: "Tech Park, Tower B, 5th Floor",
      city: "Electronic City, Bangalore",
      isDefault: false,
    },
  ];

  const favoriteRestaurants = [
    { id: "1", name: "Mumbai Spice Corner", orders: 12 },
    { id: "2", name: "Bangalore South Indian Express", orders: 8 },
    { id: "3", name: "Delhi North Indian Palace", orders: 5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-saffron text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-sm opacity-90">{userProfile.email}</p>
              <p className="text-sm opacity-90">{userProfile.phone}</p>
            </div>
          </div>

          {/* Loyalty Points */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-90">Loyalty Points</p>
                <p className="text-xl font-bold">{userProfile.loyaltyPoints}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-primary rounded-lg font-medium text-sm hover:bg-white/90 transition-colors">
              Redeem
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Favorite Restaurants */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Favorite Restaurants
          </h2>
          <div className="space-y-2">
            {favoriteRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {restaurant.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {restaurant.orders} orders
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Saved Addresses */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Saved Addresses
          </h2>
          <div className="space-y-2">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded uppercase">
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="text-xs font-semibold px-2 py-1 bg-success/10 text-success rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <button className="text-primary text-sm font-medium hover:underline">
                    Edit
                  </button>
                </div>
                <p className="text-sm text-foreground">{address.addressLine1}</p>
                <p className="text-sm text-muted-foreground">{address.city}</p>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-primary font-medium hover:bg-muted transition-colors">
              + Add New Address
            </button>
          </div>
        </section>

        {/* Account Settings */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Account Settings
          </h2>
          <div className="space-y-2">
            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  Payment Methods
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  Notifications
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">My Reviews</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full bg-card border border-destructive/30 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-destructive" />
                <span className="font-medium text-destructive">Logout</span>
              </div>
            </button>
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}
