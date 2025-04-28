import { Product, Acquisition, UserInfo } from './types';
import { generateId } from './utils';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'Immerse yourself in high-quality sound with these noise-cancelling wireless headphones. Perfect for music lovers and professionals alike.',
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.8,
    reviewCount: 356,
    inStock: true,
    category: 'Electronics',
    specifications: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Comfortable over-ear design'
    ]
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals, monitor your health, and stay connected with this advanced smart watch. Includes heart rate monitoring and GPS.',
    price: 179.95,
    originalPrice: 199.99,
    discount: 10,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.5,
    reviewCount: 223,
    inStock: true,
    category: 'Wearables',
    specifications: [
      'Heart rate monitor',
      'Built-in GPS',
      'Water resistant to 50m',
      '7-day battery life',
      'Sleep tracking'
    ]
  },
  {
    id: '3',
    title: 'Ergonomic Office Chair',
    description: 'Work in comfort with this ergonomic office chair designed to provide proper support for long working hours. Adjustable features for personalized comfort.',
    price: 299.00,
    discount: 0,
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    category: 'Furniture',
    specifications: [
      'Adjustable height and armrests',
      'Lumbar support',
      'Breathable mesh back',
      '360° swivel',
      'Durable construction'
    ]
  },
  {
    id: '4',
    title: 'Ultra HD Smart TV',
    description: 'Experience stunning picture quality and seamless streaming with this Ultra HD Smart TV. Access your favorite content with built-in streaming apps.',
    price: 749.99,
    originalPrice: 899.99,
    discount: 17,
    image: 'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.6,
    reviewCount: 412,
    inStock: false,
    category: 'Electronics',
    specifications: [
      '65-inch 4K display',
      'HDR technology',
      'Smart TV functionality',
      'Multiple HDMI ports',
      'Voice control compatible'
    ]
  },
  {
    id: '5',
    title: 'Premium Coffee Maker',
    description: 'Brew barista-quality coffee at home with this premium coffee maker. Features programmable settings and a built-in grinder for the freshest coffee.',
    price: 149.95,
    discount: 0,
    image: 'https://images.pexels.com/photos/4350204/pexels-photo-4350204.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.4,
    reviewCount: 178,
    inStock: true,
    category: 'Kitchen Appliances',
    specifications: [
      'Built-in grinder',
      'Programmable brewing',
      '12-cup capacity',
      'Keep-warm function',
      'Auto shut-off'
    ]
  },
  {
    id: '6',
    title: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this waterproof, portable Bluetooth speaker. Delivers rich sound in a compact, durable design.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: 'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&h=650',
    rating: 4.3,
    reviewCount: 245,
    inStock: true,
    category: 'Electronics',
    specifications: [
      'Waterproof (IPX7)',
      '12-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Compact design'
    ]
  }
];

export const mockConversation = [
  {
    id: generateId(),
    sender: 'system',
    text: "Hello! I'm your AI shopping concierge. How can I help you find the perfect product today?",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: generateId(),
    sender: 'user',
    text: "I'm looking for wireless headphones with good noise cancellation for travel.",
    timestamp: new Date(Date.now() - 3600000 * 1.9).toISOString()
  },
  {
    id: generateId(),
    sender: 'system',
    text: "Great choice for travel! I'll help you find the perfect noise-cancelling headphones. Do you have any preference for over-ear or in-ear styles? And is there a specific budget range you're considering?",
    timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString()
  },
  {
    id: generateId(),
    sender: 'user',
    text: "I prefer over-ear and my budget is around $300.",
    timestamp: new Date(Date.now() - 3600000 * 1.7).toISOString()
  },
  {
    id: generateId(),
    sender: 'system',
    text: "Perfect! Based on your preferences, I've found several excellent options. The Premium Wireless Headphones offer exceptional noise cancellation and are currently on sale for $249.99, down from $299.99. They feature 30-hour battery life and comfortable over-ear design, making them ideal for long flights. Would you like more details on these or shall I show you some alternatives?",
    timestamp: new Date(Date.now() - 3600000 * 1.6).toISOString()
  }
];

export const mockAcquisitions: Acquisition[] = [
  {
    id: '1',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    items: [
      {
        id: '1',
        title: 'Premium Wireless Headphones',
        price: 249.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650'
      }
    ],
    totalAmount: 249.99,
    status: 'shipped',
    trackingNumber: 'TRK12345678',
    estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString()
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    items: [
      {
        id: '3',
        title: 'Ergonomic Office Chair',
        price: 299.00,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&h=650'
      },
      {
        id: '6',
        title: 'Portable Bluetooth Speaker',
        price: 89.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&h=650'
      }
    ],
    totalAmount: 478.98,
    status: 'delivered',
    trackingNumber: 'TRK87654321'
  }
];

export const mockUserInfo: UserInfo = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&h=100',
  addresses: [
    {
      id: '1',
      label: 'Home',
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11201',
      country: 'United States',
      isDefault: true
    },
    {
      id: '2',
      label: 'Work',
      line1: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      label: 'Personal Card',
      last4: '4242',
      expiryDate: '05/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      label: 'PayPal',
      isDefault: false
    }
  ],
  preferences: {
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletters: false
    },
    privacy: {
      shareUsageData: true,
      saveSearchHistory: true
    },
    theme: 'system'
  }
};