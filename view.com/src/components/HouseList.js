"use client"

import { useContext, useEffect } from "react"
import { HouseContext } from "./HouseContext"
import House from "./House"
import { Link } from "react-router-dom"
import { ImSpinner2 } from "react-icons/im"

const HouseList = ({ listingType }) => {
  const { houses, loading, error, fetchPropertiesByType } = useContext(HouseContext)

  // Fetch properties by listing type when component mounts
  useEffect(() => {
    fetchPropertiesByType(listingType)
  }, [listingType, fetchPropertiesByType])

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700" />
      </div>
    )
  }

  // Show error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  // Filter out properties that are not available or hidden
  const availableHouses = houses.filter(
    (house) => (house.status === "available" || !house.status) && house.visible !== false,
  )

  // Show message if no properties found
  if (availableHouses.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center h-[300px]">
        <p className="text-gray-500 text-xl mb-4">No properties found!</p>
        <p className="text-gray-400">Try adjusting your search criteria</p>
      </div>
    )
  }


  return (
    <section className='mb-20'>
      <div className="max-w-[1500px]  mx-auto">
        <div className='flex flex-wrap justify-between gap-y-8'>
          {availableHouses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;