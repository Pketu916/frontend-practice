"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { inquiryAPI, propertyAPI } from "../http"
import { useAuth } from "../context/AuthContext"
import { ImSpinner2 } from "react-icons/im"
import { RiMailLine, RiChat3Line, RiCheckLine, RiCloseLine } from "react-icons/ri"

const Inquiries = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("received")
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [properties, setProperties] = useState({})
  const [processingId, setProcessingId] = useState(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // Fetch inquiries based on active tab
  useEffect(() => {
    const fetchInquiries = async () => {
      if (!user) return

      try {
        setLoading(true)

        let data
        if (activeTab === "received") {
          data = await inquiryAPI.getReceivedInquiries(user.id)
        } else {
          data = await inquiryAPI.getSentInquiries(user.id)
        }

        setInquiries(data)

        // Fetch property details for each inquiry
        const propertyIds = [...new Set(data.map((inquiry) => inquiry.propertyId))]
        const propertyDetails = {}

        await Promise.all(
          propertyIds.map(async (id) => {
            try {
              const property = await propertyAPI.getProperty(id)
              propertyDetails[id] = property
            } catch (err) {
              console.error(`Failed to fetch property ${id}:`, err)
            }
          }),
        )

        setProperties(propertyDetails)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch inquiries")
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [user, activeTab])

  // Handle inquiry status update
  const handleStatusUpdate = async (inquiryId, status) => {
    try {
      setProcessingId(inquiryId)
      await inquiryAPI.updateInquiryStatus(inquiryId, status)

      // Update local state
      setInquiries(inquiries.map((inquiry) => (inquiry.id === inquiryId ? { ...inquiry, status } : inquiry)))

      setProcessingId(null)
    } catch (err) {
      console.error("Failed to update inquiry status:", err)
      setProcessingId(null)
    }
  }

  // Start chat with user
  const startChat = (userId) => {
    navigate(`/messages/${userId}`)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700" />
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-6xl mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inquiries</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 font-medium ${
            activeTab === "received"
              ? "border-b-2 border-violet-700 text-violet-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Received Inquiries
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 font-medium ${
            activeTab === "sent" ? "border-b-2 border-violet-700 text-violet-700" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sent Inquiries
        </button>
      </div>

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600">
            {activeTab === "received"
              ? "You haven't received any inquiries yet."
              : "You haven't sent any inquiries yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => {
            const property = properties[inquiry.propertyId]

            return (
              <div key={inquiry.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {property ? property.name : "Property Not Found"}
                      </h2>
                      <p className="text-gray-600 text-sm">{property ? property.address : ""}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          inquiry.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : inquiry.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded mb-4">
                    <p className="text-gray-700">{inquiry.message}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{formatDate(inquiry.date)}</div>

                    <div className="flex space-x-2">
                      {activeTab === "received" && inquiry.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(inquiry.id, "accepted")}
                            disabled={processingId === inquiry.id}
                            className={`flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
                              processingId === inquiry.id ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                          >
                            <RiCheckLine className="mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(inquiry.id, "rejected")}
                            disabled={processingId === inquiry.id}
                            className={`flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${
                              processingId === inquiry.id ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                          >
                            <RiCloseLine className="mr-1" />
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => startChat(activeTab === "received" ? inquiry.fromUserId : inquiry.toUserId)}
                        className="flex items-center px-3 py-2 bg-violet-700 text-white rounded hover:bg-violet-800 transition"
                      >
                        <RiChat3Line className="mr-1" />
                        Chat
                      </button>

                      {property && (
                        <button
                          onClick={() => navigate(`/property/${property.id}`)}
                          className="flex items-center px-3 py-2 border border-violet-700 text-violet-700 rounded hover:bg-violet-50 transition"
                        >
                          <RiMailLine className="mr-1" />
                          View Property
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Inquiries
