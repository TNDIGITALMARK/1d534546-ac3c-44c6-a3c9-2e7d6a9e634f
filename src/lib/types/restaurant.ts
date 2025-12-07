// Restaurant App Data Types

export type CuisineType =
  | "North Indian"
  | "South Indian"
  | "Street Food"
  | "Sweets"
  | "Chinese"
  | "Continental"
  | "Bengali"
  | "Punjabi"
  | "Maharashtrian"
  | "Gujarati"
  | "Biryani"
  | "Fast Food"
  | "Beverages";

export type DietaryPreference = "vegetarian" | "vegan" | "jain" | "non-vegetarian" | "all";

export type OrderStatus = "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

export interface Restaurant {
  id: string;
  name: string;
  cuisineType: CuisineType[];
  rating: number;
  totalReviews: number;
  deliveryTime: number; // in minutes
  distance: number; // in kilometers
  imageUrl: string;
  priceForTwo: number;
  isOpen: boolean;
  offers?: string[];
  featured?: boolean;
  address: string;
  city: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dietaryType: DietaryPreference;
  isAvailable: boolean;
  isPopular?: boolean;
  customizationOptions?: CustomizationOption[];
}

export interface CustomizationOption {
  name: string;
  options: {
    label: string;
    price: number;
  }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations?: { [key: string]: string };
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  orderTime: Date;
  estimatedDeliveryTime?: Date;
  deliveryAddress: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    location?: { lat: number; lng: number };
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  favoriteRestaurants: string[];
  loyaltyPoints: number;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: Date;
  helpful: number;
}
