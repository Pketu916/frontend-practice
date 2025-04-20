"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { propertyAPI, inquiryAPI, favoriteAPI } from "../http"
import { useAuth } from "../context/AuthContext"
import { BiBed, BiBath, BiArea } from "react-icons/bi"
import { RiHeart3Line, RiHeart3Fill, RiMailLine, RiChat3Line } from "react-icons/ri"

const PropertyDetails = () => {
  const { houseID } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)
  const [inquiryMessage, setInquiryMessage] = useState("")
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquirySent, setInquirySent] = useState(false)
  const [sendingInquiry, setSendingInquiry] = useState(false)

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true)
        const data = await propertyAPI.getProperty(Number.parseInt(houseID))
        setProperty(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch property details")
        setLoading(false)
      }
    }

    fetchPropertyDetails()
  }, [houseID])

  // Check if property is in user's favorites
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && property) {
        try {
          const favorite = await favoriteAPI.checkFavorite(user.id, property.id)
          if (favorite) {
            setIsFavorite(true)
            setFavoriteId(favorite.id)
          }
        } catch (err) {
          console.error("Failed to check favorite status:", err)
        }
      }
    }

    checkFavoriteStatus()
  }, [user, property])

  // Toggle favorite status
  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    try {
      if (isFavorite) {
        await favoriteAPI.removeFavorite(favoriteId)
        setIsFavorite(false)
        setFavoriteId(null)
      } else {
        const response = await favoriteAPI.addFavorite(user.id, property.id)
        setIsFavorite(true)
        setFavoriteId(response.id)
      }
    } catch (err) {
      console.error("Failed to update favorite status:", err)
    }
  }

  // Send inquiry
  const sendInquiry = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate("/login")
      return
    }

    if (!inquiryMessage.trim()) {
      return
    }

    try {
      setSendingInquiry(true)

      await inquiryAPI.sendInquiry({
        propertyId: property.id,
        fromUserId: user.id,
        toUserId: property.userId,
        message: inquiryMessage,
      })

      setInquirySent(true)
      setInquiryMessage("")
      setSendingInquiry(false)

      // Hide form after 3 seconds
      setTimeout(() => {
        setShowInquiryForm(false)
        setInquirySent(false)
      }, 3000)
    } catch (err) {
      console.error("Failed to send inquiry:", err)
      setSendingInquiry(false)
    }
  }

  // Start chat with property owner
  const startChat = () => {
    if (!user) {
      navigate("/login")
      return
    }

    navigate(`/messages/${property.userId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-700"></div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="text-red-500 text-xl">{error || "Property not found!"}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-6xl">
      {/* Property Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{property.name}</h1>
          <p className="text-gray-600 mt-1">
            {property.address}, {property.country}
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          {property.status === "sold" && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">SOLD</span>
          )}
          {property.status === "rented" && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">RENTED</span>
          )}
          <span className="text-2xl font-bold text-violet-700">${property.price}</span>
          <span className="text-gray-500 ml-1">{property.listingType === "rent" ? "/month" : ""}</span>
        </div>
      </div>

      {/* Property Image */}
      <div className="relative">
        <img
          src={property.imageLg || property.image}
          alt={property.name}
          className="w-full h-[500px] object-cover rounded-lg"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          {isFavorite ? (
            <RiHeart3Fill className="text-2xl text-red-500" />
          ) : (
            <RiHeart3Line className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About this property</h2>
          <p className="text-gray-700 mb-6">{property.description}</p>

          <h3 className="text-xl font-semibold mb-3">Property Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <BiBed className="text-violet-700 text-xl mr-2" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <BiBath className="text-violet-700 text-xl mr-2" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <BiArea className="text-violet-700 text-xl mr-2" />
              <span>{property.surface}</span>
            </div>
            <div>
              <span className="font-semibold">Year Built:</span> {property.year}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {property.type}
            </div>
            <div>
              <span className="font-semibold">Status:</span> For {property.listingType === "rent" ? "Rent" : "Sale"}
            </div>
          </div>
        </div>

        {/* Agent/Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
          <div className="flex items-center mb-4">
            <img
              src={property.agent.image || "/placeholder.svg"}
              alt={property.agent.name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-semibold">{property.agent.name}</p>
              <p className="text-gray-600">{property.agent.phone}</p>
            </div>
          </div>

          {/* Don't show contact buttons if the user is the owner */}
          {(!user || user.id !== property.userId) && (
            <div className="space-y-3">
              <button
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className="w-full flex items-center justify-center bg-violet-700 text-white py-3 rounded-md hover:bg-violet-800 transition"
              >
                <RiMailLine className="mr-2" />
                Send Inquiry
              </button>
              <button
                onClick={startChat}
                className="w-full flex items-center justify-center border border-violet-700 text-violet-700 py-3 rounded-md hover:bg-violet-50 transition"
              >
                <RiChat3Line className="mr-2" />
                Start Chat
              </button>
            </div>
          )}

          {/* Inquiry Form */}
          {showInquiryForm && (
            <div className="mt-4">
              {inquirySent ? (
                <div className="bg-green-100 text-green-700 p-3 rounded-md">
                  Your inquiry has been sent successfully!
                </div>
              ) : (
                <form onSubmit={sendInquiry}>
                  <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="I'm interested in this property. Please provide more information."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 mb-3"
                    rows="4"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    disabled={sendingInquiry}
                    className={`w-full bg-violet-700 text-white py-2 rounded-md hover:bg-violet-800 transition ${
                      sendingInquiry ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {sendingInquiry ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
