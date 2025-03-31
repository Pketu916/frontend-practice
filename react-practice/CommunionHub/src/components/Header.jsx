"use client"

import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-600"
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-xl font-bold text-indigo-600">CommunionHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className={`${isActive("/")} transition-colors duration-200`}>
            Home
          </Link>
          <Link to="/events" className={`${isActive("/events")} transition-colors duration-200`}>
            Events
          </Link>
          <Link to="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col space-y-4">
            <Link to="/" className={`${isActive("/")} block py-2`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/events" className={`${isActive("/events")} block py-2`} onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-indigo-600 block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

