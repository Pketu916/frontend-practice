"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { favoriteAPI } from "../http"
import { useAuth } from "../context/AuthContext"
import { ImSpinner2 } from "react-icons/im"
import House from "../components/House"
import { Link } from "react-router-dom"

const Favorites = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // Fetch user's favorite properties
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return

      try {
        setLoading(true)
        const data = await favoriteAPI.getUserFavorites(user.id)
        setFavorites(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch favorites")
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  // Handle toggle favorite
  const handleToggleFavorite = (propertyId, isFavorite) => {
    if (!isFavorite) {
      // Remove from favorites list
      setFavorites(favorites.filter((fav) => fav.id !== propertyId))
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
    <div className="container mx-auto mt-10 px-4 max-w-6xl mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Favorites</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {favorites.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">You don't have any favorite properties yet.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800 transition"
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <Link to={`/property/${property.id}`} key={property.id}>
              <House
                house={property}
                isFavorite={true}
                favoriteId={property.favoriteId}
                onToggleFavorite={handleToggleFavorite}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
