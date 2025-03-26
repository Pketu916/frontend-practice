import axios from "axios"

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// User API calls
export const userAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      // Check if user already exists
      const existingUsers = await api.get(`/users?email=${userData.email}`)
      if (existingUsers.data.length > 0) {
        throw new Error("User already exists")
      }

      const response = await api.post("/users", userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}&password=${password}`)
      if (response.data.length === 0) {
        throw new Error("Invalid credentials")
      }
      return response.data[0]
    } catch (error) {
      throw error
    }
  },

  // Get user by ID
  getUser: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update user profile
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Property API calls
export const propertyAPI = {
    // Get all properties
    getAllProperties: async () => {
      try {
        console.log("API call: Getting all properties")
        const response = await api.get("/properties")
        console.log("API response:", response.data)
        return response.data
      } catch (error) {
        console.error("Failed to get properties:", error)
        throw error
      }
    },

  // Get properties by listing type (rent, sell, buy)
  getPropertiesByType: async (listingType) => {
    try {
      const response = await api.get(`/properties?listingType=${listingType}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get properties by user ID
  getUserProperties: async (userId) => {
    try {
      const response = await api.get(`/properties?userId=${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

   // Get property by ID
   getProperty: async (propertyId) => {
    try {
      console.log("API call: Getting property with ID:", propertyId)
      const response = await api.get(`/properties/${propertyId}`)
      console.log("API response:", response.data)
      return response.data
    } catch (error) {
      console.error(`Failed to get property ${propertyId}:`, error)
      throw error
    }
  },

  // Add new property
  addProperty: async (propertyData) => {
    try {
      const response = await api.post("/properties", propertyData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update property
  updateProperty: async (propertyId, propertyData) => {
    try {
      console.log("API call: Updating property with ID:", propertyId)
      console.log("Update data:", propertyData)
      const response = await api.patch(`/properties/${propertyId}`, propertyData)
      console.log("Update response:", response.data)
      return response.data
    } catch (error) {
      console.error(`Failed to update property ${propertyId}:`, error)
      throw error
    }
  },
    // Create a new property
    createProperty: async (propertyData) => {
      try {
        console.log("API call: Creating property")
        console.log("Create data:", propertyData)
        const response = await api.post("/properties", propertyData)
        console.log("Create response:", response.data)
        return response.data
      } catch (error) {
        console.error("Failed to create property:", error)
        throw error
      }
    },

  // Delete property
  deleteProperty: async (propertyId) => {
    try {
      console.log("API call: Deleting property with ID:", propertyId)
      await api.delete(`/properties/${propertyId}`)
      console.log("Property deleted successfully")
      return true
    } catch (error) {
      console.error(`Failed to delete property ${propertyId}:`, error)
      throw error
    }
  },

  // Search properties
  searchProperties: async (params) => {
    try {
      let queryString = ""

      if (params.country && params.country !== "Location (any)") {
        queryString += `country=${params.country}&`
      }

      if (params.property && params.property !== "Property (any)") {
        queryString += `type=${params.property}&`
      }

      if (params.listingType) {
        queryString += `listingType=${params.listingType}&`
      }

      // Remove trailing & if exists
      queryString = queryString.endsWith("&") ? queryString.slice(0, -1) : queryString

      const response = await api.get(`/properties?${queryString}`)

      // Filter by price range if specified
      let filteredData = response.data

      if (params.price && params.price !== "Price range (any)") {
        const [minPrice, maxPrice] = params.price.split(" - ").map((price) => Number.parseInt(price))
        filteredData = filteredData.filter((property) => {
          const propertyPrice = Number.parseInt(property.price)
          return propertyPrice >= minPrice && propertyPrice <= maxPrice
        })
      }

      return filteredData
    } catch (error) {
      throw error
    }
  },
}

// Inquiry API calls
export const inquiryAPI = {
  // Send an inquiry
  sendInquiry: async (inquiryData) => {
    try {
      const response = await api.post("/inquiries", {
        ...inquiryData,
        date: new Date().toISOString(),
        status: "pending",
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get inquiries for a user (received)
  getReceivedInquiries: async (userId) => {
    try {
      const response = await api.get(`/inquiries?toUserId=${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get inquiries from a user (sent)
  getSentInquiries: async (userId) => {
    try {
      const response = await api.get(`/inquiries?fromUserId=${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update inquiry status
  updateInquiryStatus: async (inquiryId, status) => {
    try {
      const response = await api.patch(`/inquiries/${inquiryId}`, { status })
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Message API calls
export const messageAPI = {
  // Send a message
  sendMessage: async (messageData) => {
    try {
      // Check if this is a self-message
      if (messageData.fromUserId === messageData.toUserId) {
        throw new Error("Cannot send messages to yourself");
      }
      
      const response = await api.post('/messages', {
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false
      });
      return response.data; // Return the created message with ID
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  },

  // Get conversation between two users
  getConversation: async (user1Id, user2Id) => {
    try {
      // Prevent self-conversations
      if (user1Id === user2Id) {
        return [];
      }
      
      const response = await api.get(`/messages?fromUserId=${user1Id}&toUserId=${user2Id}`);
      const response2 = await api.get(`/messages?fromUserId=${user2Id}&toUserId=${user1Id}`);
      
      // Combine and sort by timestamp
      const allMessages = [...response.data, ...response2.data];
      return allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } catch (error) {
      console.error("Get conversation error:", error);
      throw error;
    }
  },

// Mark messages as read
markAsRead: async (messageIds) => {
  try {
    if (!messageIds || messageIds.length === 0) {
      return { success: true };
    }
    
    const promises = messageIds.map(id => 
      api.patch(`/messages/${id}`, { read: true })
    );
    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error("Mark as read error:", error);
    throw error;
  }
},

  // Get all conversations for a user
 // Get all conversations for a user
 getUserConversations: async (userId) => {
  try {
    // Get messages sent by the user
    const sentMessages = await api.get(`/messages?fromUserId=${userId}`);
    // Get messages received by the user
    const receivedMessages = await api.get(`/messages?toUserId=${userId}`);
    
    // Extract unique user IDs the current user has conversed with
    const conversationUserIds = new Set();
    
    sentMessages.data.forEach(msg => conversationUserIds.add(msg.toUserId));
    receivedMessages.data.forEach(msg => conversationUserIds.add(msg.fromUserId));
    
    // Get user details for each conversation
    const conversationPromises = Array.from(conversationUserIds).map(async (otherUserId) => {
      // Skip self-conversations
      if (otherUserId === userId) {
        return null;
      }
      
      try {
        const userDetails = await userAPI.getUser(otherUserId);
        
        // Get the most recent message
        const allMessages = [
          ...sentMessages.data.filter(msg => msg.toUserId === otherUserId),
          ...receivedMessages.data.filter(msg => msg.fromUserId === otherUserId)
        ];
        
        const sortedMessages = allMessages.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        const lastMessage = sortedMessages[0] || null;
        const unreadCount = receivedMessages.data.filter(
          msg => msg.fromUserId === otherUserId && !msg.read
        ).length;
        
        return {
          userId: otherUserId,
          name: userDetails.name,
          avatar: userDetails.avatar,
          lastMessage,
          unreadCount
        };
      } catch (err) {
        console.error(`Failed to get user details for ${otherUserId}:`, err);
        return null;
      }
    });
    
    const results = await Promise.all(conversationPromises);
    // Filter out null values (self-conversations)
    return results.filter(Boolean);
  } catch (error) {
    console.error("Get conversations error:", error);
    throw error;
  }
}
};


// Favorites API calls
export const favoriteAPI = {
  // Add property to favorites
  addFavorite: async (userId, propertyId) => {
    try {
      const response = await api.post("/favorites", { userId, propertyId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Remove property from favorites
  removeFavorite: async (favoriteId) => {
    try {
      await api.delete(`/favorites/${favoriteId}`)
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Get user's favorite properties
  getUserFavorites: async (userId) => {
    try {
      const response = await api.get(`/favorites?userId=${userId}`)

      // Get full property details for each favorite
      const propertyPromises = response.data.map(async (favorite) => {
        const property = await propertyAPI.getProperty(favorite.propertyId)
        return {
          ...property,
          favoriteId: favorite.id,
        }
      })

      return Promise.all(propertyPromises)
    } catch (error) {
      throw error
    }
  },

  // Check if a property is in user's favorites
  checkFavorite: async (userId, propertyId) => {
    try {
      const response = await api.get(`/favorites?userId=${userId}&propertyId=${propertyId}`)
      return response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      throw error
    }
  },
}

export default {
  userAPI,
  propertyAPI,
  inquiryAPI,
  messageAPI,
  favoriteAPI,
}

