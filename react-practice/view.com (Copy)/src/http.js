import {
  db,
  auth,
  storage,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  convertTimestampToDate,
} from "./firebase"

// User API calls
export const userAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      // First try to create Firebase Auth user
      const authUser = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      const uid = authUser.user.uid

      const userProfile = {
        id: uid,
        email: userData.email,
        name: userData.name,
        phone: userData.phone || "",
        avatar:
          userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        createdAt: serverTimestamp(),
      }

      // Save user profile in Firestore using Auth UID
      const userDocRef = doc(db, "users", uid)
      await setDoc(userDocRef, userProfile)

      return { ...userProfile, uid }
    } catch (error) {
      console.error("Registration error:", error)
      throw new Error(error.message || "Registration failed")
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid

      // Get Firestore user profile
      const userDocRef = doc(db, "users", uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        throw new Error("User profile not found in Firestore")
      }

      return { ...userDoc.data(), uid }
    } catch (error) {
      console.error("Login error:", error)
      throw new Error(error.message || "Login failed")
    }
  },

  // Get user by ID
  getUser: async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        throw new Error("User not found")
      }

      return { id: userDoc.id, ...userDoc.data() }
    } catch (error) {
      console.error("Get user error:", error)
      throw new Error(error.message || "Failed to get user")
    }
  },

  // Update user profile
  updateUser: async (userId, userData) => {
    try {
      const userDocRef = doc(db, "users", userId)
      await updateDoc(userDocRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      })

      // Get updated user data
      const updatedUserDoc = await getDoc(userDocRef)
      return { id: updatedUserDoc.id, ...updatedUserDoc.data() }
    } catch (error) {
      console.error("Update user error:", error)
      throw new Error(error.message || "Failed to update user")
    }
  },
}


// Property API calls
export const propertyAPI = {
  // Get all properties
  getAllProperties: async () => {
    try {
      const propertiesRef = collection(db, "properties")
      const propertiesSnapshot = await getDocs(propertiesRef)
      return propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Get all properties error:", error)
      throw new Error(error.message || "Failed to get properties")
    }
  },

  // Get properties by listing type (rent, sell, buy)
  getPropertiesByType: async (listingType) => {
    try {
      const propertiesRef = collection(db, "properties")
      const q = query(propertiesRef, where("listingType", "==", listingType))
      const propertiesSnapshot = await getDocs(q)
      return propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Get properties by type error:", error)
      throw new Error(error.message || "Failed to get properties")
    }
  },

  // Get properties by user ID
  getUserProperties: async (userId) => {
    try {
      const propertiesRef = collection(db, "properties")
      const q = query(propertiesRef, where("userId", "==", userId))
      const propertiesSnapshot = await getDocs(q)
      return propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Get user properties error:", error)
      throw new Error(error.message || "Failed to get user properties")
    }
  },

  // Get property by ID
  getProperty: async (propertyId) => {
    try {
      const propertyDocRef = doc(db, "properties", propertyId)
      const propertyDoc = await getDoc(propertyDocRef)

      if (!propertyDoc.exists()) {
        throw new Error("Property not found")
      }

      return { id: propertyDoc.id, ...propertyDoc.data() }
    } catch (error) {
      console.error("Get property error:", error)
      throw new Error(error.message || "Failed to get property")
    }
  },

  // Add new property
  addProperty: async (propertyData) => {
    try {
      // Add timestamp
      const propertyWithTimestamp = {
        ...propertyData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const propertiesRef = collection(db, "properties")
      const docRef = await addDoc(propertiesRef, propertyWithTimestamp)
      return { id: docRef.id, ...propertyWithTimestamp }
    } catch (error) {
      console.error("Add property error:", error)
      throw new Error(error.message || "Failed to add property")
    }
  },

  // Update property
  updateProperty: async (propertyId, propertyData) => {
    try {
      const propertyDocRef = doc(db, "properties", propertyId)

      // Add updated timestamp
      const updatedData = {
        ...propertyData,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(propertyDocRef, updatedData)

      // Get updated property data
      const updatedPropertyDoc = await getDoc(propertyDocRef)
      return { id: updatedPropertyDoc.id, ...updatedPropertyDoc.data() }
    } catch (error) {
      console.error("Update property error:", error)
      throw new Error(error.message || "Failed to update property")
    }
  },

  // Delete property
  deleteProperty: async (propertyId) => {
    try {
      const propertyDocRef = doc(db, "properties", propertyId)
      await deleteDoc(propertyDocRef)
      return true
    } catch (error) {
      console.error("Delete property error:", error)
      throw new Error(error.message || "Failed to delete property")
    }
  },

  // Search properties
  searchProperties: async (params) => {
    try {
      const propertiesRef = collection(db, "properties")
      let q = query(propertiesRef)

      // Build query constraints
      const constraints = []

      if (params.country && params.country !== "Location (any)") {
        constraints.push(where("country", "==", params.country))
      }

      if (params.property && params.property !== "Property (any)") {
        constraints.push(where("type", "==", params.property))
      }

      if (params.listingType) {
        constraints.push(where("listingType", "==", params.listingType))
      }

      // Apply first constraint if any (Firestore limitation)
      if (constraints.length > 0) {
        q = query(propertiesRef, constraints[0])
      }

      const snapshot = await getDocs(q)
      let results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Apply additional filters in memory
      if (constraints.length > 1) {
        for (let i = 1; i < constraints.length; i++) {
          const constraint = constraints[i]
          results = results.filter((item) => {
            if (constraint.op === "==") {
              return item[constraint.field] === constraint.value
            }
            return true
          })
        }
      }

      // Filter by price range if specified
      if (params.price && params.price !== "Price range (any)") {
        const [minPrice, maxPrice] = params.price.split(" - ").map((price) => Number.parseInt(price))
        results = results.filter((property) => {
          const propertyPrice = Number.parseInt(property.price)
          return propertyPrice >= minPrice && propertyPrice <= maxPrice
        })
      }

      // Filter by date if specified
      if (params.date && params.date !== "Move-in Date (any)") {
        const selectedDate = Number.parseInt(params.date)
        results = results.filter((property) => {
          const propertyDate = Number.parseInt(property.date || "0")
          return propertyDate <= selectedDate
        })
      }

      // Filter out properties that are not available or are hidden
      results = results.filter(
        (property) => (property.status === "available" || !property.status) && property.visible !== false,
      )

      return results
    } catch (error) {
      console.error("Search properties error:", error)
      throw new Error(error.message || "Failed to search properties")
    }
  },

  // Upload property image
  uploadPropertyImage: async (file, path = "property-images") => {
    try {
      if (!file) return null

      const fileName = `${path}/${new Date().getTime()}_${file.name}`
      const storageRef = ref(storage, fileName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(`Upload is ${progress}% done`)
          },
          (error) => {
            // Error handling
            console.error("Upload error:", error)
            reject(error)
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          },
        )
      })
    } catch (error) {
      console.error("Image upload error:", error)
      throw new Error(error.message || "Failed to upload image")
    }
  },
}

// Inquiry API calls
export const inquiryAPI = {
  // Send an inquiry
  sendInquiry: async (inquiryData) => {
    try {
      const inquiryWithTimestamp = {
        ...inquiryData,
        date: serverTimestamp(),
        status: "pending",
      }

      const inquiriesRef = collection(db, "inquiries")
      const docRef = await addDoc(inquiriesRef, inquiryWithTimestamp)
      return { id: docRef.id, ...inquiryWithTimestamp }
    } catch (error) {
      console.error("Send inquiry error:", error)
      throw new Error(error.message || "Failed to send inquiry")
    }
  },

  // Get inquiries for a user (received)
  getReceivedInquiries: async (userId) => {
    try {
      const inquiriesRef = collection(db, "inquiries")
      const q = query(inquiriesRef, where("toUserId", "==", userId))
      const inquiriesSnapshot = await getDocs(q)

      return inquiriesSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          date: convertTimestampToDate(data.date),
        }
      })
    } catch (error) {
      console.error("Get received inquiries error:", error)
      throw new Error(error.message || "Failed to get inquiries")
    }
  },

  // Get inquiries from a user (sent)
  getSentInquiries: async (userId) => {
    try {
      const inquiriesRef = collection(db, "inquiries")
      const q = query(inquiriesRef, where("fromUserId", "==", userId))
      const inquiriesSnapshot = await getDocs(q)

      return inquiriesSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          date: convertTimestampToDate(data.date),
        }
      })
    } catch (error) {
      console.error("Get sent inquiries error:", error)
      throw new Error(error.message || "Failed to get inquiries")
    }
  },

  // Update inquiry status
  updateInquiryStatus: async (inquiryId, status) => {
    try {
      const inquiryDocRef = doc(db, "inquiries", inquiryId)
      await updateDoc(inquiryDocRef, {
        status,
        updatedAt: serverTimestamp(),
      })

      // Get updated inquiry data
      const updatedInquiryDoc = await getDoc(inquiryDocRef)
      const data = updatedInquiryDoc.data()

      return {
        id: updatedInquiryDoc.id,
        ...data,
        date: convertTimestampToDate(data.date),
      }
    } catch (error) {
      console.error("Update inquiry status error:", error)
      throw new Error(error.message || "Failed to update inquiry")
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
        throw new Error("Cannot send messages to yourself")
      }

      const messageWithTimestamp = {
        ...messageData,
        timestamp: serverTimestamp(),
        read: false,
      }

      const messagesRef = collection(db, "messages")
      const docRef = await addDoc(messagesRef, messageWithTimestamp)

      // Get the created message with server timestamp
      const messageDoc = await getDoc(docRef)
      const data = messageDoc.data()

      return {
        id: docRef.id,
        ...data,
        timestamp: convertTimestampToDate(data.timestamp),
      }
    } catch (error) {
      console.error("Send message error:", error)
      throw new Error(error.message || "Failed to send message")
    }
  },

  // Get conversation between two users
  getConversation: async (user1Id, user2Id) => {
    try {
      // Prevent self-conversations
      if (user1Id === user2Id) {
        return []
      }

      const messagesRef = collection(db, "messages")

      // Get messages sent from user1 to user2
      const q1 = query(messagesRef, where("fromUserId", "==", user1Id), where("toUserId", "==", user2Id))

      // Get messages sent from user2 to user1
      const q2 = query(messagesRef, where("fromUserId", "==", user2Id), where("toUserId", "==", user1Id))

      const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)])

      // Combine and convert timestamps
      const messages1 = snapshot1.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: convertTimestampToDate(data.timestamp),
        }
      })

      const messages2 = snapshot2.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: convertTimestampToDate(data.timestamp),
        }
      })

      // Combine and sort by timestamp
      const allMessages = [...messages1, ...messages2]
      return allMessages.sort((a, b) => a.timestamp - b.timestamp)
    } catch (error) {
      console.error("Get conversation error:", error)
      throw new Error(error.message || "Failed to get conversation")
    }
  },

  // Mark messages as read
  markAsRead: async (messageIds) => {
    try {
      if (!messageIds || messageIds.length === 0) {
        return { success: true }
      }

      const promises = messageIds.map((id) => {
        const messageDocRef = doc(db, "messages", id)
        return updateDoc(messageDocRef, {
          read: true,
          updatedAt: serverTimestamp(),
        })
      })

      await Promise.all(promises)
      return { success: true }
    } catch (error) {
      console.error("Mark as read error:", error)
      throw new Error(error.message || "Failed to mark messages as read")
    }
  },

  // Get all conversations for a user
  getUserConversations: async (userId) => {
    try {
      const messagesRef = collection(db, "messages")

      // Get messages sent by the user
      const q1 = query(messagesRef, where("fromUserId", "==", userId))

      // Get messages received by the user
      const q2 = query(messagesRef, where("toUserId", "==", userId))

      const [sentSnapshot, receivedSnapshot] = await Promise.all([getDocs(q1), getDocs(q2)])

      // Extract unique user IDs the current user has conversed with
      const conversationUserIds = new Set()

      sentSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        conversationUserIds.add(data.toUserId)
      })

      receivedSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        conversationUserIds.add(data.fromUserId)
      })

      // Convert sent and received messages
      const sentMessages = sentSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: convertTimestampToDate(data.timestamp),
        }
      })

      const receivedMessages = receivedSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: convertTimestampToDate(data.timestamp),
        }
      })

      // Get user details for each conversation
      const conversationPromises = Array.from(conversationUserIds).map(async (otherUserId) => {
        // Skip self-conversations
        if (otherUserId === userId) {
          return null
        }

        try {
          const userDetails = await userAPI.getUser(otherUserId)

          // Get the most recent message
          const allMessages = [
            ...sentMessages.filter((msg) => msg.toUserId === otherUserId),
            ...receivedMessages.filter((msg) => msg.fromUserId === otherUserId),
          ]

          const sortedMessages = allMessages.sort((a, b) => b.timestamp - a.timestamp)

          const lastMessage = sortedMessages[0] || null
          const unreadCount = receivedMessages.filter((msg) => msg.fromUserId === otherUserId && !msg.read).length

          return {
            userId: otherUserId,
            name: userDetails.name,
            avatar: userDetails.avatar,
            lastMessage,
            unreadCount,
          }
        } catch (err) {
          console.error(`Failed to get user details for ${otherUserId}:`, err)
          return null
        }
      })

      const results = await Promise.all(conversationPromises)
      // Filter out null values (self-conversations)
      return results.filter(Boolean)
    } catch (error) {
      console.error("Get conversations error:", error)
      throw new Error(error.message || "Failed to get conversations")
    }
  },
}

// Favorites API calls
export const favoriteAPI = {
  // Add property to favorites
  addFavorite: async (userId, propertyId) => {
    try {
      const favoriteData = {
        userId,
        propertyId,
        createdAt: serverTimestamp(),
      }

      const favoritesRef = collection(db, "favorites")
      const docRef = await addDoc(favoritesRef, favoriteData)
      return { id: docRef.id, ...favoriteData }
    } catch (error) {
      console.error("Add favorite error:", error)
      throw new Error(error.message || "Failed to add favorite")
    }
  },

  // Remove property from favorites
  removeFavorite: async (favoriteId) => {
    try {
      const favoriteDocRef = doc(db, "favorites", favoriteId)
      await deleteDoc(favoriteDocRef)
      return { success: true }
    } catch (error) {
      console.error("Remove favorite error:", error)
      throw new Error(error.message || "Failed to remove favorite")
    }
  },

  // Get user's favorite properties
  getUserFavorites: async (userId) => {
    try {
      const favoritesRef = collection(db, "favorites")
      const q = query(favoritesRef, where("userId", "==", userId))
      const favoritesSnapshot = await getDocs(q)

      // Get full property details for each favorite
      const propertyPromises = favoritesSnapshot.docs.map(async (favoriteDoc) => {
        const favorite = favoriteDoc.data()
        const property = await propertyAPI.getProperty(favorite.propertyId)
        return {
          ...property,
          favoriteId: favoriteDoc.id,
        }
      })

      return Promise.all(propertyPromises)
    } catch (error) {
      console.error("Get user favorites error:", error)
      throw new Error(error.message || "Failed to get favorites")
    }
  },

  // Check if a property is in user's favorites
  checkFavorite: async (userId, propertyId) => {
    try {
      const favoritesRef = collection(db, "favorites")
      const q = query(favoritesRef, where("userId", "==", userId), where("propertyId", "==", propertyId))

      const favoritesSnapshot = await getDocs(q)

      if (favoritesSnapshot.empty) {
        return null
      }

      const favoriteDoc = favoritesSnapshot.docs[0]
      return { id: favoriteDoc.id, ...favoriteDoc.data() }
    } catch (error) {
      console.error("Check favorite error:", error)
      throw new Error(error.message || "Failed to check favorite")
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
