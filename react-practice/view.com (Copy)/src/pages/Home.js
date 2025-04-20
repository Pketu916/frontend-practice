import { Link } from "react-router-dom"
import HouseList from "../components/HouseList"
// import { ImSearch } from "react-icons/im" // Search icon
// import house1 from "../assets/img/houses/house1.png"
// import house1 from "../../"
// import house2 from "../assets/img/houses/house2.png"
// import house3 from "../assets/img/houses/house3.png"

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-lg mb-8">
            Browse through thousands of homes, apartments, and properties to find your perfect match.
          </p>

          {/* Search Bar */}
          {/* <div className="relative flex justify-center items-center">
            <input
              type="text"
              placeholder="Search by location, price, type..."
              className="px-6 py-3 w-1/2 rounded-full text-black focus:outline-none"
            />
            <button className="absolute right-2 p-3 bg-indigo-700 text-white rounded-full hover:bg-indigo-800">
              <ImSearch size={20} />
            </button>
          </div> */}
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-20 ">
        <div className="max-w-[1500px] mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Featured Listings</h2>
          <p className="text-lg text-gray-600">Explore our most popular properties for sale and rent.</p>
        </div>
        <div>
          <HouseList propertyLength="3" listingType="rent"/>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 text-center my-32">
        <div className="max-w-[1500px] mx-auto">
          <h2 className=" text-3xl font-semibold mb-4">Start Your Property Journey Today</h2>
          <p className="text-lg mb-6">We help you find your perfect property to buy or rent. Get in touch with us!</p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-[1500px] mx-auto text-center">
          <p>&copy; 2025 Dream Lots. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white mx-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white mx-4">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white mx-4">
              Contact Us
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default Home
