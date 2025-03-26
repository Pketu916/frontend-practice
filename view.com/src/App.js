import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Rent from "./pages/Rent"
import Sell from "./pages/Sell"
import Buy from "./pages/Buy"
import PropertyDetails from "./components/PropertyDetails"
import Signup from "./components/Signup"
import Login from "./components/Login"
import ManageProperties from "./pages/ManageProperties"
import AddProperty from "./pages/AddProperty"
import EditProperty from "./pages/EditProperty"
import Messages from "./pages/Messages"
import Inquiries from "./pages/Inquiries"
import Favorites from "./pages/Favorites"

function App() {
  return (
    <div className=" mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/property/:houseID" element={<PropertyDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-property" element={<ManageProperties />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:propertyId" element={<EditProperty />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:userId" element={<Messages />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

