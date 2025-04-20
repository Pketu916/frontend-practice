import { db, collection, doc, setDoc, addDoc, getDocs, serverTimestamp } from "./firebase"

// Sample data for initial setup
const sampleUsers = [
  {
    email: "user1@example.com",
    password: "password123",
    name: "John Doe",
    phone: "123-456-7890",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "user2@example.com",
    password: "password456",
    name: "Jane Smith",
    phone: "987-654-3210",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
]

const sampleProperties = [
  {
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
    status: "available",
    visible: true,
  },
  {
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
    status: "available",
    visible: true,
  },
  {
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
    status: "available",
    visible: true,
  },
  {
    type: "Apartament",
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
    status: "available",
    visible: true,
  },
  {
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
    status: "available",
    visible: true,
  },
  {
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
    listingType: "rent",
    status: "available",
    visible: true,
  },
]

// Function to initialize Firebase with sample data
export const initializeFirebase = async () => {
  try {
    console.log("Initializing Firebase with sample data...")

    // Create sample users
    const userIds = []

    // First check if users already exist to avoid authentication errors
    for (const userData of sampleUsers) {
      try {
        // Create a dummy user in Firestore first with a generated ID
        const userDocRef = doc(collection(db, "users"))
        const userId = userDocRef.id

        await setDoc(userDocRef, {
          id: userId,
          email: userData.email,
          name: userData.name,
          phone: userData.phone || "",
          avatar: userData.avatar,
          createdAt: serverTimestamp(),
        })

        userIds.push(userId)
        console.log(`Created user: ${userData.name} with ID: ${userId}`)
      } catch (error) {
        console.log(`Error creating user ${userData.email}: ${error.message}`)
      }
    }

    // Create sample properties
    for (let i = 0; i < sampleProperties.length; i++) {
      const propertyData = sampleProperties[i]
      const userId = userIds[i % userIds.length] // Alternate between users

      try {
        // Add agent info to property
        const propertyWithUser = {
          ...propertyData,
          userId: userId,
          agent: {
            name: sampleUsers[i % sampleUsers.length].name,
            phone: sampleUsers[i % sampleUsers.length].phone || "Not provided",
            image: sampleUsers[i % sampleUsers.length].avatar,
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }

        // Add property to Firestore
        const propertyRef = await addDoc(collection(db, "properties"), propertyWithUser)
        console.log(`Created property: ${propertyData.name} with ID: ${propertyRef.id}`)
      } catch (error) {
        console.error(`Error creating property ${propertyData.name}:`, error)
      }
    }

    console.log("Firebase initialization completed!")
    return true
  } catch (error) {
    console.error("Error initializing Firebase:", error)
    return false
  }
}

// Export a function to check if initialization is needed
export const checkInitializationNeeded = async () => {
  try {
    // Check if there are any properties in the database
    const propertiesSnapshot = await getDocs(collection(db, "properties"))
    return propertiesSnapshot.empty
  } catch (error) {
    console.error("Error checking initialization status:", error)
    return true // Assume initialization is needed if there's an error
  }
}
