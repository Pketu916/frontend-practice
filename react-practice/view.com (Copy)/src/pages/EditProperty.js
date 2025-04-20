"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { propertyAPI } from "../http"
import { useAuth } from "../context/AuthContext"
import { ImSpinner2 } from "react-icons/im"
import { RiUploadCloud2Line } from "react-icons/ri"

const EditProperty = () => {
  const { propertyId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    imageLg: "",
    country: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    surface: "",
    year: "",
    price: "",
    listingType: "",
    status: "available", // Add status field with default
    visible: true, // Add visibility field with default
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imageLgFile, setImageLgFile] = useState(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    // Fetch property details
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true)
        console.log("Fetching property with ID:", propertyId)

        const property = await propertyAPI.getProperty(propertyId)
        console.log("Fetched property data:", property)

        // Check if the user is the owner of the property
        if (property.userId !== user.id) {
          setError("You don't have permission to edit this property")
          setLoading(false)
          return
        }

        // Set form data with property details
        setFormData({
          name: property.name || "",
          type: property.type || "",
          description: property.description || "",
          image: property.image || "",
          imageLg: property.imageLg || "",
          country: property.country || "",
          address: property.address || "",
          bedrooms: property.bedrooms || "",
          bathrooms: property.bathrooms || "",
          surface: property.surface || "",
          year: property.year || "",
          price: property.price || "",
          listingType: property.listingType || "",
          status: property.status || "available",
          visible: property.visible !== undefined ? property.visible : true,
        })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching property:", err)
        setError("Failed to fetch property details")
        setLoading(false)
      }
    }

    fetchPropertyDetails()
  }, [propertyId, user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Preview the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)

      // Store the file for upload
      setImageFile(file)
    }
  }

  const handleLargeImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Preview the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageLg: reader.result,
        }))
      }
      reader.readAsDataURL(file)

      // Store the file for upload
      setImageLgFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.description || !formData.country || !formData.address || !formData.price) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)
      setError(null)

      // Upload images if files are selected
      let imageUrl = formData.image
      let imageLgUrl = formData.imageLg

      if (imageFile) {
        imageUrl = await propertyAPI.uploadPropertyImage(imageFile)
      }

      if (imageLgFile) {
        imageLgUrl = await propertyAPI.uploadPropertyImage(imageLgFile, "property-images-large")
      } else if (imageUrl && !formData.imageLg) {
        // If no large image is provided, use the same as the main image
        imageLgUrl = imageUrl
      }

      // Prepare property data with updated image URLs
      const propertyData = {
        ...formData,
        image: imageUrl,
        imageLg: imageLgUrl,
      }

      // Update the property
      await propertyAPI.updateProperty(propertyId, propertyData)

      // Redirect to manage properties page
      navigate("/manage-property")
    } catch (err) {
      console.error("Error updating property:", err)
      setError("Failed to update property. Please try again.")
      setSaving(false)
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
    <div className="container mx-auto mt-10 px-4 max-w-3xl mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Property</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Property Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Property Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            >
              <option value="House">House</option>
              <option value="Apartament">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="listingType">
              Listing Type *
            </label>
            <select
              id="listingType"
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            >
              <option value="rent">For Rent</option>
              <option value="sell">For Sale</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
              Bedrooms *
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
              Bathrooms *
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Surface */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surface">
              Surface Area *
            </label>
            <input
              type="text"
              id="surface"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Year Built */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year Built
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Property Image *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input type="file" id="imageFile" accept="image/*" onChange={handleImageChange} className="hidden" />
              <label htmlFor="imageFile" className="flex flex-col items-center justify-center cursor-pointer">
                {formData.image ? (
                  <div className="relative w-full">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Property preview"
                      className="h-48 mx-auto object-cover rounded-md"
                    />
                    <div className="mt-2 text-sm text-gray-500">Click to change image</div>
                  </div>
                ) : (
                  <div className="py-8">
                    <RiUploadCloud2Line className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload property image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Large Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageLg">
              Large Property Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                id="imageLgFile"
                accept="image/*"
                onChange={handleLargeImageChange}
                className="hidden"
              />
              <label htmlFor="imageLgFile" className="flex flex-col items-center justify-center cursor-pointer">
                {formData.imageLg ? (
                  <div className="relative w-full">
                    <img
                      src={formData.imageLg || "/placeholder.svg"}
                      alt="Large property preview"
                      className="h-48 mx-auto object-cover rounded-md"
                    />
                    <div className="mt-2 text-sm text-gray-500">Click to change image</div>
                  </div>
                ) : (
                  <div className="py-8">
                    <RiUploadCloud2Line className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload large property image</p>
                    <p className="mt-2 text-sm text-gray-500">Click to upload large property image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            ></textarea>
          </div>
        </div>

        {/* Status and Visibility */}
        <div className="md:col-span-2 mt-4 border-t pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Listing Status</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="available"
                    checked={formData.status === "available"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-violet-700"
                  />
                  <span className="ml-2 text-gray-700">Available</span>
                </label>
                {formData.listingType === "rent" ? (
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="rented"
                      checked={formData.status === "rented"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Rented</span>
                  </label>
                ) : (
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="sold"
                      checked={formData.status === "sold"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Sold</span>
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Visibility</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="visible"
                    value="true"
                    checked={formData.visible === true}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.value === "true" })}
                    className="form-radio h-4 w-4 text-violet-700"
                  />
                  <span className="ml-2 text-gray-700">Visible</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="visible"
                    value="false"
                    checked={formData.visible === false}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.value === "true" })}
                    className="form-radio h-4 w-4 text-gray-600"
                  />
                  <span className="ml-2 text-gray-700">Hidden</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/manage-property")}
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-3 bg-violet-700 text-white rounded-md hover:bg-violet-800 transition ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving ? (
              <div className="flex items-center justify-center">
                <ImSpinner2 className="animate-spin mr-2" />
                <span>Saving Changes...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProperty
