"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { propertyAPI } from "../http"
import { useAuth } from "../context/AuthContext"
import { BiBed, BiBath, BiArea, BiEdit, BiTrash } from "react-icons/bi"
import { ImSpinner2 } from "react-icons/im"

const ManageProperties = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // Fetch user's properties
  useEffect(() => {
    const fetchUserProperties = async () => {
      if (!user) return

      try {
        setLoading(true)
        const data = await propertyAPI.getUserProperties(user.id)
        setProperties(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch your properties")
        setLoading(false)
      }
    }

    fetchUserProperties()
  }, [user])

  // Handle property deletion
  const handleDelete = async (propertyId) => {
    try {
      setIsDeleting(true)
      await propertyAPI.deleteProperty(propertyId)

      // Update properties list
      setProperties(properties.filter((property) => property.id !== propertyId))
      setDeleteConfirm(null)
      setIsDeleting(false)
    } catch (err) {
      setError("Failed to delete property")
      setIsDeleting(false)
    }
  }

  // Navigate to add property page
  const handleAddProperty = () => {
    navigate("/add-property")
  }

  // Navigate to edit property page
  const handleEdit = (propertyId) => {
    navigate(`/edit-property/${propertyId}`)
  }

  // Handle property status change
  const handleStatusChange = async (propertyId, status) => {
    try {
      await propertyAPI.updateProperty(propertyId, { status })

      // Update properties list
      setProperties(properties.map((property) => (property.id === propertyId ? { ...property, status } : property)))
    } catch (err) {
      setError("Failed to update property status")
    }
  }

  // Handle property visibility toggle
  const handleVisibilityToggle = async (propertyId, visible) => {
    try {
      await propertyAPI.updateProperty(propertyId, { visible })

      // Update properties list
      setProperties(properties.map((property) => (property.id === propertyId ? { ...property, visible } : property)))
    } catch (err) {
      setError("Failed to update property visibility")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700" />
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
        <button
          onClick={handleAddProperty}
          className="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800 transition"
        >
          Add New Property
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {properties.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">You don't have any properties yet.</p>
          <button
            onClick={handleAddProperty}
            className="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800 transition"
          >
            Add Your First Property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      property.status === "sold"
                        ? "bg-red-500 text-white"
                        : property.status === "rented"
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {property.status === "sold" ? "SOLD" : property.status === "rented" ? "RENTED" : "AVAILABLE"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{property.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{property.address}</p>

                <div className="flex justify-between items-center mb-3">
                  <div className="text-violet-700 font-bold">${property.price}</div>
                  <div className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-sm">
                    {property.listingType === "rent" ? "For Rent" : "For Sale"}
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <BiBed className="mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BiBath className="mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BiArea className="mr-1" />
                    <span>{property.surface}</span>
                  </div>
                </div>

                {/* Status management */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => handleStatusChange(property.id, "available")}
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.status === "available" || !property.status
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    Available
                  </button>
                  <button
                    onClick={() => handleStatusChange(property.id, property.listingType === "rent" ? "rented" : "sold")}
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.status === (property.listingType === "rent" ? "rented" : "sold")
                        ? (property.listingType === "rent" ? "bg-blue-500" : "bg-red-500") + " text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-red-100"
                    }`}
                  >
                    {property.listingType === "rent" ? "Rented" : "Sold"}
                  </button>
                  <button
                    onClick={() => handleVisibilityToggle(property.id, property.visible === false ? true : false)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.visible === false
                        ? "bg-gray-400 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {property.visible === false ? "Hidden" : "Visible"}
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(property.id)}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    <BiEdit className="mr-1" />
                    Edit
                  </button>

                  {deleteConfirm === property.id ? (
                    <div className="flex">
                      <button
                        onClick={() => handleDelete(property.id)}
                        disabled={isDeleting}
                        className={`px-3 py-2 bg-red-500 text-white rounded-l hover:bg-red-600 transition ${
                          isDeleting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isDeleting ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-2 bg-gray-500 text-white rounded-r hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(property.id)}
                      className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <BiTrash className="mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageProperties

