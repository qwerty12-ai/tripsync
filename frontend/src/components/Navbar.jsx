import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
            {
                role === "ADMIN" && (
                    <span className="text-xs bg-black text-white px-2 py-1 rounded">ADMIN</span>
                )
            }

            <h1
                onClick={() => navigate("/dashboard")}
                className="font-bold text-lg cursor-pointer flex items-center gap-2"
            >
                <img
                    src={logo}
                    alt="TripSync Logo"
                    className="h-10 rounded-md 50"
                />
            </h1>

            <button
                onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }}
                className="px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
            >
                Logout
            </button>

        </div>
    )
}