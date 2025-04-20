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
  const [startDate, setStartDate] = useState("Move-in Date (any)")

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
        console.error("Error fetching properties:", err)
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

  // Handle search button click - simplified to just fetch all properties
  const handleClick = useCallback(async () => {
    try {
      setLoading(true)

      // Just fetch all properties instead of searching
      const data = await propertyAPI.getAllProperties()

      // Filter visible properties
      const filteredData = data.filter(
        (property) => (property.status === "available" || !property.status) && property.visible !== false,
      )

      setHouses(filteredData)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to fetch properties")
      setLoading(false)
    }
  }, [])

  // Fetch properties by listing type
  const fetchPropertiesByType = useCallback(async (listingType) => {
    try {
      setLoading(true)
      setCurrentListingType(listingType)

      const data = await propertyAPI.getPropertiesByType(listingType)

      // Filter out properties that are not available or are hidden
      const filteredData = data.filter(
        (property) => (property.status === "available" || !property.status) && property.visible !== false,
      )

      setHouses(filteredData)
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
        startDate,
        setStartDate,
      }}
    >
      {children}
    </HouseContext.Provider>
  )
}

export default HouseContextProvider
