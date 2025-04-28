export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount: number;
    image: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: string;
    specifications?: string[];
  };
  
  export type AcquisitionStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  export type Acquisition = {
    id: string;
    date: string;
    items: {
      id: string;
      title: string;
      price: number;
      quantity: number;
      image: string;
    }[];
    totalAmount: number;
    status: AcquisitionStatus;
    trackingNumber?: string;
    estimatedDelivery?: string;
  };
  
  export type UserInfo = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    preferences: UserPreferences;
  };
  
  export type Address = {
    id: string;
    label: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  
  export type PaymentMethod = {
    id: string;
    type: 'card' | 'paypal' | 'other';
    label: string;
    last4?: string;
    expiryDate?: string;
    isDefault: boolean;
  };
  
  export type UserPreferences = {
    notifications: {
      orderUpdates: boolean;
      promotions: boolean;
      newsletters: boolean;
    };
    privacy: {
      shareUsageData: boolean;
      saveSearchHistory: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };