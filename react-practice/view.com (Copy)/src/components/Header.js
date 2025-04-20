"use client"
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { RiHeartLine, RiMailLine, RiChat3Line, RiHome4Line } from "react-icons/ri"

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="py-6 mb-12 border-b sticky top-0 bg-slate-300 z-10  ">
      <div className="max-w-[1500px] mx-auto flex justify-between items-center font-bold text-gray-800">
        {/* Logo and Navigation Links */}
        <div className="flex justify-between items-center gap-6">
          {/* Logo */}
          <NavLink to="/">
            <p className="text-violet-700 hover:text-violet-800 text-3xl font-bold transition">HOME.COM</p>
          </NavLink>

          {/* Navigation Links */}
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-4 py-3 bg-violet-500 text-white rounded-lg"
                : "px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-4 py-3 bg-violet-500 text-white rounded-lg"
                : "px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            }
            to="/rent"
          >
            Rent
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-4 py-3 bg-violet-500 text-white rounded-lg"
                : "px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            }
            to="/buy"
          >
            Buy
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-4 py-3 bg-violet-500 text-white rounded-lg"
                : "px-4 py-3 hover:bg-violet-300 hover:text-white rounded-lg"
            }
            to="/sell"
          >
            Sell
          </NavLink>
        </div>

        {/* Authentication Links */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Menu */}
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 bg-violet-500 text-white rounded-full"
                    : "p-2 text-gray-600 hover:bg-violet-100 rounded-full"
                }
                title="Favorites"
              >
                <RiHeartLine className="text-xl" />
              </NavLink>

              <NavLink
                to="/inquiries"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 bg-violet-500 text-white rounded-full"
                    : "p-2 text-gray-600 hover:bg-violet-100 rounded-full"
                }
                title="Inquiries"
              >
                <RiMailLine className="text-xl" />
              </NavLink>

              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 bg-violet-500 text-white rounded-full"
                    : "p-2 text-gray-600 hover:bg-violet-100 rounded-full"
                }
                title="Messages"
              >
                <RiChat3Line className="text-xl" />
              </NavLink>

              <NavLink
                to="/manage-property"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 bg-violet-500 text-white rounded-full"
                    : "p-2 text-gray-600 hover:bg-violet-100 rounded-full"
                }
                title="Manage Properties"
              >
                <RiHome4Line className="text-xl" />
              </NavLink>

              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm font-medium hidden md:block">{user.name}</span>
                <button
                  onClick={logout}
                  className="border-2 bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Login and Signup buttons */}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "border-2 bg-violet-500 text-white px-4 py-2 rounded-lg"
                    : "border-2 text-violet-800 px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-white transition"
                }
                to="/login"
              >
                Log in
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-violet-800 text-white px-4 py-2 rounded-lg"
                    : "bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition"
                }
                to="/signup"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
