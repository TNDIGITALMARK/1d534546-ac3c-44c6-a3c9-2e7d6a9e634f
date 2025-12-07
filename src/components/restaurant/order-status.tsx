import { Order } from "@/lib/types/restaurant";
import { Check, Clock, Package, Truck } from "lucide-react";

interface OrderStatusProps {
  order: Order;
}

export function OrderStatus({ order }: OrderStatusProps) {
  const getStatusSteps = () => {
    const steps = [
      { key: "confirmed", label: "Order Confirmed", icon: Check },
      { key: "preparing", label: "Preparing", icon: Package },
      { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
      { key: "delivered", label: "Delivered", icon: Check },
    ];

    const statusIndex = steps.findIndex((step) => step.key === order.status);

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= statusIndex,
      isCurrent: index === statusIndex,
    }));
  };

  const statusSteps = getStatusSteps();

  const getStatusColor = () => {
    switch (order.status) {
      case "confirmed":
        return "text-primary";
      case "preparing":
        return "text-warning";
      case "out_for_delivery":
        return "text-accent";
      case "delivered":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {order.restaurantName}
          </h3>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
        </div>
        <div className={`font-semibold ${getStatusColor()}`}>
          {order.status.replace(/_/g, " ").toUpperCase()}
        </div>
      </div>

      {/* Status Steps */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    step.isCompleted
                      ? "bg-success text-success-foreground"
                      : step.isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 pt-2">
                  <p
                    className={`font-medium ${
                      step.isCompleted || step.isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.isCurrent && order.estimatedDeliveryTime && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" />
                      Arriving in{" "}
                      {Math.ceil(
                        (order.estimatedDeliveryTime.getTime() - Date.now()) /
                          60000
                      )}{" "}
                      mins
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Partner Info */}
      {order.deliveryPartner && order.status === "out_for_delivery" && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-3">
            Delivery Partner
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                {order.deliveryPartner.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.deliveryPartner.phone}
              </p>
            </div>
            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm">
              Call
            </button>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
        <div className="space-y-2">
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
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-semibold text-lg text-foreground">
            ₹{order.totalAmount}
          </span>
        </div>
      </div>
    </div>
  );
}
