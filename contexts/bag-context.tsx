"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type BagItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type BagContextType = {
  items: BagItem[];
  addItem: (item: Omit<BagItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBag: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const BagProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize bag from localStorage
  useEffect(() => {
    setMounted(true);
    const storedItems = localStorage.getItem("bagItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("bagItems", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<BagItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        toast("Added to your bag", {
          description: `${newItem.title} quantity increased.`,
        });
        return updatedItems;
      } else {
        toast("Added to your bag", {
          description: `${newItem.title} has been added.`,
        });
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        toast("Removed from your bag", {
          description: `${itemToRemove.title} has been removed.`,
        });
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBag = () => {
    setItems([]);
    toast("Bag cleared", {
      description: "All items have been removed from your bag.",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <BagContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  const context = useContext(BagContext);
  if (context === undefined) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};
