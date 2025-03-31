import { Link } from "react-router-dom"
import { Users, Calendar, Heart } from "lucide-react"

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting People Across Faiths & Interests</h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Join a community that celebrates diversity and fosters meaningful connections through shared experiences.
            </p>
            <Link to="/events" className="btn btn-primary bg-white text-indigo-700 hover:bg-gray-100 text-lg">
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to CommunionHub</h2>
            <p className="text-xl text-gray-600">
              Connecting people of all faiths through events and community support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals and build meaningful relationships across different faiths and
                backgrounds.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Discover Events</h3>
              <p className="text-gray-600">
                Find and participate in a variety of events, from religious gatherings to social meetups and charity
                drives.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support Each Other</h3>
              <p className="text-gray-600">
                Offer and receive support within a caring community that values compassion and understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover events, connect with others, and be part of something meaningful.
            </p>
            <Link to="/events" className="btn btn-primary text-lg">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

