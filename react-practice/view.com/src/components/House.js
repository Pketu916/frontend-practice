"use client"

import React from "react"
import { BiBed, BiBath, BiArea } from "react-icons/bi"
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri"
import { useAuth } from "../context/AuthContext"
import { favoriteAPI } from "../http"

const House = ({ house, isFavorite = false, favoriteId = null, onToggleFavorite = null }) => {
  const { image, type, country, address, bedrooms, bathrooms, surface, price, id } = house
  const { user } = useAuth()

  const [favorite, setFavorite] = React.useState(isFavorite)
  const [favId, setFavId] = React.useState(favoriteId)

  // Toggle favorite status
  const toggleFavorite = async (e) => {
    e.preventDefault() // Prevent navigation to property details
    e.stopPropagation() // Prevent event bubbling

    if (!user) return // Do nothing if user is not logged in

    try {
      if (favorite) {
        // If it's already a favorite, remove it
        await favoriteAPI.removeFavorite(favId)
        setFavorite(false)
        setFavId(null)
      } else {
        // If it's not a favorite, add it
        const response = await favoriteAPI.addFavorite(user.id, id)
        setFavorite(true)
        setFavId(response.id)
      }

      // Call parent component's handler if provided
      if (onToggleFavorite) {
        onToggleFavorite(id, !favorite)
      }
    } catch (err) {
      console.error("Failed to update favorite status:", err)
    }
  }

  return (
    <div className="bg-white shadow-1 p-5 rounded-lg w-full max-w-[352px] cursor-pointer shadow-2xl transition">
      <div className="relative overflow-hidden">
        <img
          className="mb-4 h-[200px] w-full rounded-lg"
          src={image || "/placeholder.svg"}
          alt="house img"
        />
        {user && (
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
          >
            {favorite ? (
              <RiHeart3Fill className="text-xl text-red-500" />
            ) : (
              <RiHeart3Line className="text-xl text-gray-700" />
            )}
          </button>
        )}

        {/* Display status badge if exists */}
        {house.status === "sold" && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SOLD</div>
        )}
        {house.status === "rented" && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">RENTED</div>
        )}
      </div>
      <div className="flex gap-x-2 text-sm">
        <div className="bg-violet-500 rounded-full text-white px-3 inline-block">{type}</div>
        <div className="bg-violet-100 rounded-full text-violet-700 px-3 inline-block">{country}</div>
      </div>
      <div className="text-lg font-semibold text-gray-800 mt-2">{address}</div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600">
          <BiBed className="text-[20px] mr-1" />
          <div>{bedrooms}</div>
        </div>
        <div className="flex items-center text-gray-600">
          <BiBath className="text-[20px] mr-1" />
          <div>{bathrooms}</div>
        </div>
        <div className="flex items-center text-gray-600">
          <BiArea className="text-[20px] mr-1" />
          <div>{surface}</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-violet-600 mb-4">
        ${price}
        {house.listingType === "rent" && <span className="text-gray-500 text-sm"> /month</span>}
      </div>
    </div>
  )
}

export default House

