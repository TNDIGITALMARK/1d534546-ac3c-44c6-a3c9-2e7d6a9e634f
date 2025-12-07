"use client";

import { Home, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Discover" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bottom-nav md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
