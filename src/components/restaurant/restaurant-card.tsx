import { Restaurant } from "@/lib/types/restaurant";
import { Clock, MapPin, Star, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="food-card group cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="restaurant-image object-cover"
          />
          {restaurant.featured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Closed</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {restaurant.cuisineType.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold text-sm">{restaurant.rating}</span>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance} km</span>
            </div>
            <div className="flex items-center gap-1">
              <span>₹{restaurant.priceForTwo} for two</span>
            </div>
          </div>

          {/* Offers */}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <Tag className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-accent font-medium line-clamp-1">
                {restaurant.offers[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
