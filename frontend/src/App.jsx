import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TripPage from "./pages/TripPage";
import DestinationPage from "./pages/DestinationPage";
import Navbar from "./components/Navbar";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    const syncAuth = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={userId ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/trip/:tripId"
          element={userId ? <TripPage /> : <Navigate to="/" />}
        />

        <Route
          path="/destination/:destinationId"
          element={userId ? <DestinationPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;