import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await API.post("/users/login", null, {
        params: { email, password },
      });

      let role = "USER";

      if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
      ) {
        role = "ADMIN";
      }

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", role);

      window.dispatchEvent(new Event("storage"));

      showToast("Login successful 🚀");

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      showToast("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 relative">

      {toast && (
        <div className="absolute top-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          TripSync
        </h1>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Smart planning for modern travel.
        </p>

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">
            {errors.email}
          </p>
        )}

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-2">
            {errors.password}
          </p>
        )}

        <Button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center mt-4 text-gray-600">
          First time here?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}