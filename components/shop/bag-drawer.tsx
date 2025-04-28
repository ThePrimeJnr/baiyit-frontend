"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, AlertTriangle } from "lucide-react";
import { useBag } from "@/contexts/bag-context";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function BagDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useBag();
  const router = useRouter();

  // Close drawer with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Your Bag</h2>
                {totalItems > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping with our AI concierge to find perfect items
                    for you.
                  </p>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/concierge");
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-20 h-20 rounded-lg bg-background overflow-hidden relative flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium truncate">{item.title}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-1 text-muted-foreground">
                          {formatCurrency(item.price)}
                        </div>

                        <div className="mt-2 flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-md"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center mx-1">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-md"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                  <span>Shipping & taxes</span>
                  <span>Calculated at next step</span>
                </div>

                <Button
                  className="w-full glass-button"
                  size="lg"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/bag");
                  }}
                >
                  Proceed to Thanks
                </Button>

                <div className="flex items-center justify-center mt-4 gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    This is a demo app. No actual purchases will be made.
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
