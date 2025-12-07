import { MenuItem } from "@/lib/types/restaurant";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem, quantity: number) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart?.(item, newQuantity);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart?.(item, newQuantity);
    }
  };

  const getDietaryIcon = () => {
    if (item.dietaryType === "vegetarian" || item.dietaryType === "vegan" || item.dietaryType === "jain") {
      return (
        <div className="w-4 h-4 border-2 border-success flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-success" />
        </div>
      );
    }
    return (
      <div className="w-4 h-4 border-2 border-destructive flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-destructive" />
      </div>
    );
  };

  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-start gap-2 mb-2">
          {getDietaryIcon()}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-foreground">{item.name}</h4>
              {item.isPopular && (
                <span className="badge-primary text-xs ml-2">Popular</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
            <p className="font-semibold text-foreground mt-2">₹{item.price}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.isAvailable ? "Add" : "Unavailable"}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleRemove}
                className="w-8 h-8 rounded-lg border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-foreground min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="w-8 h-8 rounded-lg border-2 border-primary bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
