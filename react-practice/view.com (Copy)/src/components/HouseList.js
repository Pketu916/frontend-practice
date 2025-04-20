"use client"

import { useContext, useEffect } from "react"
import { HouseContext } from "./HouseContext"
import House from "./House"
import { Link } from "react-router-dom"
import { ImSpinner2 } from "react-icons/im"

const HouseList = ({ listingType, propertyLength }) => {
  const { houses, loading, error, fetchPropertiesByType } = useContext(HouseContext)

  useEffect(() => {
    if (listingType) {
      fetchPropertiesByType(listingType)
    } else {
      // Always fetch all if no listing type
      fetchPropertiesByType("all")
    }
  }, [listingType, fetchPropertiesByType])
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  const availableHouses = houses
    .filter(
      (house) => (house.status === "available" || !house.status) && house.visible !== false
    )
    .slice(0, propertyLength || houses.length) // Limit to propertyLength only if it's defined

  if (availableHouses.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center h-[300px]">
        <p className="text-gray-500 text-xl mb-4">No properties found!</p>
        <p className="text-gray-400">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <section className="mb-20">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-wrap justify-between gap-y-8">
          {availableHouses.map((house, index) => (
            <Link to={`/property/${house.id}`} key={index}>
              <House house={house} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HouseList
