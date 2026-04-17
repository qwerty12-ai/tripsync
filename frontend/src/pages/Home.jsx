import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex flex-col justify-center items-center text-center px-6">

      <div className="absolute top-6 left-6 text-xl font-bold tracking-wide">
        <img
          src={logo}
          alt="TripSync Logo"
          className="h-10 rounded-md 50"
        />
      </div>

      <div className="mb-4 px-4 py-1 rounded-full bg-black text-white text-xs tracking-widest">
        SMART TRAVEL PLANNER
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent">
        Plan Smarter. <br />
        Travel Better
      </h1>
      <p className="text-gray-600 max-w-lg mb-8 text-base sm:text-lg">
        TripSync is an intelligent travel planning platform that streamlines destinations, schedules activities, and enables effortless trip collaboration in one seamless experience.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-md"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="border border-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition-all duration-200"
        >
          Get Started
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-semibold text-lg mb-2">📍 Destinations</h2>
          <p className="text-gray-500 text-sm">
            Add and manage places you want to visit.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-semibold text-lg mb-2">🗓 Activities</h2>
          <p className="text-gray-500 text-sm">
            Plan your schedule with detailed activities.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-semibold text-lg mb-2">🔗 Share Trips</h2>
          <p className="text-gray-500 text-sm">
            Generate shareable links and collaborate easily.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}