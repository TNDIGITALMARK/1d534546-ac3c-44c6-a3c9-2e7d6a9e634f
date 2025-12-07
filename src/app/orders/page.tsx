"use client";

import { BottomNavigation } from "@/components/restaurant/bottom-navigation";
import { OrderStatus } from "@/components/restaurant/order-status";
import { mockOrders } from "@/lib/data/mockRestaurants";
import { Package, History } from "lucide-react";
import { useState } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeOrders = mockOrders.filter(
    (order) =>
      order.status === "confirmed" ||
      order.status === "preparing" ||
      order.status === "out_for_delivery"
  );

  const orderHistory = mockOrders.filter(
    (order) => order.status === "delivered" || order.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-gradient-saffron text-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 pb-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === "active"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              <span>Active Orders ({activeOrders.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 pb-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <History className="w-4 h-4" />
              <span>Order History ({orderHistory.length})</span>
            </div>
          </button>
        </div>

        {/* Active Orders */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <OrderStatus key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Active Orders
                </h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any active orders right now
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Explore Restaurants
                </a>
              </div>
            )}
          </div>
        )}

        {/* Order History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {orderHistory.length > 0 ? (
              orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {order.restaurantName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.orderTime.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {order.orderTime.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "delivered"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {order.status === "delivered" ? "Delivered" : "Cancelled"}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">
                          {item.menuItem.name} x {item.quantity}
                        </span>
                        <span className="text-muted-foreground">
                          ₹{item.menuItem.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-semibold text-lg text-foreground">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm">
                      Reorder
                    </button>
                    <button className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm">
                      Help
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Order History
                </h3>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Ordering
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
