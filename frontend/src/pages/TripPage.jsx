import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function TripPage() {
    const { tripId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");

  const fetchDestinations = async () => {
    try {
      const res = await API.get(`/destinations/${tripId}`);
      setDestinations(res.data);
    } catch (error) {
      alert("Failed to fetch destinations. Please try again.");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [tripId]);

  const add = async () => {
    if (!name || !date) {
      alert("All fields required");
      return;
    }
    try {
      await API.post(`/destinations/${tripId}`, {
        locationName: name,
        date,
      });
      setName("");
      setDate("");
      fetchDestinations();
    } catch (error) {
      alert("Failed to add destination. Please try again.");
    }
  };

  const saveEdit = async () => {
    try {
      await API.put(`/destinations/${editingId}`, {
        locationName: editName,
        date: editDate,
      });
      setEditingId(null);
      fetchDestinations();
    } catch (error) {
      alert("Failed to update destination.");
    }
  };

  const startEdit = (d) => {
    setEditingId(d.destinationId);
    setEditName(d.locationName);
    setEditDate(d.date);
  };

  const shareTrip = async () => {
    try {
      const res = await API.post(`/share/${tripId}`, null, {
        params: { email },
      });
      alert(`Share Link: ${res.data}`);
    } catch {
      alert("Error sending link.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Trip Details</h1>

        <p className="text-gray-500">
          Manage your destinations and plan ahead
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        <input
          placeholder="Location"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-xl border flex-1 min-w-[200px]"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 rounded-xl border"
        />
        <button
          onClick={add}
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Add
        </button>
      </div>

      <div className="grid gap-6">
        {destinations.length === 0 && (
          <p className="text-gray-400 text-center">
            No destinations yet. Add your first stop 📍
          </p>
        )}

        {destinations.map((d) => (
          <div
            key={d.destinationId}
            className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition space-y-3"
          >
            {editingId === d.destinationId ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                />

                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                />

                <div className="flex gap-3">
                  <button
                    onClick={saveEdit}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() =>
                    navigate(`/destination/${d.destinationId}`)
                  }
                  className="cursor-pointer"
                >
                  <h2 className="text-lg font-semibold">
                    {d.locationName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {d.date}
                  </p>
                </div>

                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => startEdit(d)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}