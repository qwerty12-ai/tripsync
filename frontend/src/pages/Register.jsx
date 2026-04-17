import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
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

    if (!user.name.trim()) newErrors.name = "Name is required";

    if (!user.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (user.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const register = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await API.post("/users/register", user);
      showToast("Account created successfully 🎉");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      showToast("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 relative">
      {toast && (
        <div className="absolute top-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Create your space. Plan journeys your way.
        </p>

        <Input
          placeholder="Name"
          type="text"
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name}</p>
        )}

        <Input
          placeholder="Email"
          type="email"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email}</p>
        )}

        <Input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />
        {errors.password && (
          <p className="text-red-500 text-xs mb-2">{errors.password}</p>
        )}

        <Button onClick={register} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}