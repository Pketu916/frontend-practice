"use client"

import { createContext, useState, useContext, useEffect } from "react"

const EventContext = createContext()

// Sample initial events data
const initialEvents = [
  {
    id: 1,
    title: "Interfaith Prayer Meeting",
    date: "2023-06-15",
    location: "Community Center, New York",
    category: "Religious",
    description: "A gathering for people of all faiths to pray and meditate together.",
  },
  {
    id: 2,
    title: "Charity Food Drive",
    date: "2023-06-20",
    location: "Downtown Park, Chicago",
    category: "Charity",
    description: "Help collect food donations for local shelters and families in need.",
  },
  {
    id: 3,
    title: "Community Picnic",
    date: "2023-07-05",
    location: "Riverside Park, Boston",
    category: "Social",
    description: "A fun day out with games, food, and activities for the whole family.",
  },
  {
    id: 4,
    title: "Meditation Workshop",
    date: "2023-07-12",
    location: "Wellness Center, San Francisco",
    category: "Religious",
    description: "Learn meditation techniques from different spiritual traditions.",
  },
  {
    id: 5,
    title: "Community Cleanup",
    date: "2023-07-18",
    location: "Beach Area, Los Angeles",
    category: "Charity",
    description: "Join us in cleaning up the beach and surrounding areas.",
  },
]

export const EventProvider = ({ children }) => {
  // Try to get events from localStorage, otherwise use initialEvents
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("communionHubEvents")
    return savedEvents ? JSON.parse(savedEvents) : initialEvents
  })

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("communionHubEvents", JSON.stringify(events))
  }, [events])

  const addEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: Date.now(), // Simple way to generate unique IDs
    }
    setEvents([...events, event])
  }

  return <EventContext.Provider value={{ events, addEvent }}>{children}</EventContext.Provider>
}

export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}

