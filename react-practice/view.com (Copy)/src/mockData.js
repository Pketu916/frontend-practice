// Mock data for the application
export const mockUsers = [
  {
    id: "1",
    email: "user1@example.com",
    password: "password123",
    name: "John Doe",
    phone: "123-456-7890",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    email: "user2@example.com",
    password: "password456",
    name: "Jane Smith",
    phone: "987-654-3210",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  // Add a test user that's easier to remember
  {
    id: "3",
    email: "test@test.com",
    password: "test123",
    name: "Test User",
    phone: "555-555-5555",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
]

export const mockProperties = [
  {
    id: "1",
    type: "House",
    name: "Luxury Villa",
    description: "Beautiful luxury villa with amazing views and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "United States",
    address: "7240C Argyle St. Lawndale, CA 90260",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "1700",
    date: "5",
    listingType: "rent",
    userId: "1",
    agent: {
      name: "John Doe",
      phone: "123-456-7890",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    visible: true,
    status: "available",
  },
  {
    id: "2",
    type: "House",
    name: "Modern Apartment",
    description: "Spacious modern apartment in the heart of the city.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "India",
    address: "798 Talbot St. Bridgewater, NJ 08807",
    bedrooms: "3",
    bathrooms: "2",
    surface: "1800 sq ft",
    year: "2018",
    price: "2500",
    date: "10",
    listingType: "rent",
    userId: "2",
    agent: {
      name: "Jane Smith",
      phone: "987-654-3210",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    visible: true,
    status: "available",
  },
  {
    id: "3",
    type: "House",
    name: "Cozy Cottage",
    description: "Charming cottage with beautiful garden and peaceful surroundings.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "United States",
    address: "2 Glen Creek St. Alexandria, VA 22304",
    bedrooms: "4",
    bathrooms: "2",
    surface: "2200 sq ft",
    year: "2015",
    price: "3000",
    date: "15",
    listingType: "sell",
    userId: "1",
    agent: {
      name: "John Doe",
      phone: "123-456-7890",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    visible: true,
    status: "available",
  },
  {
    id: "4",
    type: "Apartment",
    name: "Luxury Apartment",
    description: "High-end apartment with stunning city views and premium amenities.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "India",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "2",
    bathrooms: "2",
    surface: "1500 sq ft",
    year: "2020",
    price: "2200",
    date: "7",
    listingType: "rent",
    userId: "2",
    agent: {
      name: "Jane Smith",
      phone: "987-654-3210",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    visible: true,
    status: "available",
  },
  {
    id: "5",
    type: "Villa",
    name: "Beachfront Villa",
    description: "Stunning beachfront villa with private pool and direct beach access.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "5",
    bathrooms: "4",
    surface: "3800 sq ft",
    year: "2019",
    price: "5000",
    date: "3",
    listingType: "sell",
    userId: "1",
    agent: {
      name: "John Doe",
      phone: "123-456-7890",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    visible: true,
    status: "available",
  },
  {
    id: "6",
    type: "Condo",
    name: "Modern Condo",
    description: "Contemporary condo in a prime location with excellent amenities.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageLg:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    country: "India",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "3",
    bathrooms: "2",
    surface: "1800 sq ft",
    year: "2017",
    price: "2800",
    date: "12",
    listingType: "buy",
    userId: "2",
    agent: {
      name: "Jane Smith",
      phone: "987-654-3210",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    visible: true,
    status: "available",
  },
]

export const mockInquiries = []
export const mockMessages = []
export const mockFavorites = []

// Helper function to generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 8)
}
