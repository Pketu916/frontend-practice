import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Events from "./pages/Events"
import Header from "./components/Header"
import { EventProvider } from "./context/EventContext"

function App() {
  return (
    <Router>
      <EventProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-4 text-center">
            <p>© {new Date().getFullYear()} CommunionHub. All rights reserved.</p>
          </footer>
        </div>
      </EventProvider>
    </Router>
  )
}

export default App

