"use client"

import { useState, useEffect, createContext, useCallback } from "react"
import { propertyAPI } from "../http"

export const HouseContext = createContext()

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([])
  const [country, setCountry] = useState("Location (any)")
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState("Property (any)")
  const [properties, setProperties] = useState([])

  const [price, setPrice] = useState("Price range (any)")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentListingType, setCurrentListingType] = useState(null)

  // Fetch all properties on component mount
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true)
        const data = await propertyAPI.getAllProperties()
        setHouses(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch properties")
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  // Extract countries and property types from houses data
  useEffect(() => {
    if (houses.length > 0) {
      // Extract countries
      const allCountries = houses.map((house) => house.country)
      const uniqueCountries = ["Location (any)", ...new Set(allCountries)]
      setCountries(uniqueCountries)

      // Extract property types
      const allProperties = houses.map((house) => house.type)
      const uniqueProperties = ["Property (any)", ...new Set(allProperties)]
      setProperties(uniqueProperties)
    }
  }, [houses])

  // Handle search button click - simplified search logic
  const handleClick = useCallback(async () => {
    try {
      setLoading(true)

      // Build query parameters
      const queryParams = {}

      // Only add parameters that are not set to "any"
      if (country !== "Location (any)") {
        queryParams.country = country
      }

      if (property !== "Property (any)") {
        queryParams.type = property
      }

      if (currentListingType) {
        queryParams.listingType = currentListingType
      }

      if (price !== "Price range (any)") {
        const [min, max] = price.split(" - ").map((p) => Number.parseInt(p))
        queryParams.minPrice = min
        queryParams.maxPrice = max
      }

      console.log("Search parameters:", queryParams)

      // Direct API call to ensure fresh data
      let endpoint = "/properties"
      const queryString = Object.entries(queryParams)
        .filter(([key, value]) => key !== "minPrice" && key !== "maxPrice")
        .map(([key, value]) => `${key}=${value}`)
        .join("&")

      if (queryString) {
        endpoint += `?${queryString}`
      }

      console.log("Fetching from:", endpoint)

      const response = await fetch(`http://localhost:3001${endpoint}`)
      let results = await response.json()

      // Filter out properties that are not available or are hidden
      results = results.filter(
        (property) => (property.status === "available" || !property.status) && property.visible !== false,
      )

      // Filter by price if specified
      if (queryParams.minPrice && queryParams.maxPrice) {
        results = results.filter((house) => {
          const housePrice = Number.parseInt(house.price)
          return housePrice >= queryParams.minPrice && housePrice <= queryParams.maxPrice
        })
      }

      setHouses(results)
      setLoading(false)
    } catch (err) {
      console.error("Search error:", err)
      setError("Search failed")
      setLoading(false)
    }
  }, [country, property, price, currentListingType])

  // Fetch properties by listing type
  const fetchPropertiesByType = useCallback(async (listingType) => {
    try {
      setLoading(true)
      setCurrentListingType(listingType)

      // Direct API call to ensure fresh data
      const response = await fetch(`http://localhost:3001/properties?listingType=${listingType}`)
      let data = await response.json()

      // Filter out properties that are not available or are hidden
      data = data.filter(
        (property) => (property.status === "available" || !property.status) && property.visible !== false,
      )

      setHouses(data)
      setLoading(false)
    } catch (err) {
      console.error(`Failed to fetch ${listingType} properties:`, err)
      setError(`Failed to fetch ${listingType} properties`)
      setLoading(false)
    }
  }, [])

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        error,
        handleClick,
        fetchPropertiesByType,
        currentListingType,
      }}
    >
      {children}
    </HouseContext.Provider>
  )
}

export default HouseContextProvider

