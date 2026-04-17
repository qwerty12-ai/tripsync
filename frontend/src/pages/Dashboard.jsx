import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState("");

  const [shareLink, setShareLink] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchTrips = async () => {
    try {
      const res = await API.get(`/trips/user/${userId}`);
      setTrips(res.data);
    } catch {
      showToast("Failed to fetch trips");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [userId]);

  const addTrip = async () => {
    if (!title.trim()) return showToast("Trip name required");

    try {
      setCreating(true);

      await API.post(`/trips/${userId}`, {
        title,
        startDate,
        endDate,
      });

      setTitle("");
      setStartDate("");
      setEndDate("");

      showToast("Trip created ✈️");
      fetchTrips();
    } catch {
      showToast("Failed to create trip");
    } finally {
      setCreating(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await API.delete(`/trips/${id}`);
      showToast("Trip deleted");
      fetchTrips();
    } catch {
      showToast("Delete failed");
    }
  };

  const startEdit = (t) => {
    setEditingId(t.tripId);
    setEditTitle(t.title);
    setEditStartDate(t.startDate);
    setEditEndDate(t.endDate);
  };

  const saveEdit = async () => {
    try {
      await API.put(`/trips/${editingId}`, {
        title: editTitle,
        startDate: editStartDate,
        endDate: editEndDate,
      });

      setEditingId(null);
      showToast("Trip updated");
      fetchTrips();
    } catch {
      showToast("Update failed");
    }
  };

  // SHARE LINK GENERATION
  const generateShareLink = async (tripId) => {
    try {
      const res = await API.post(`/share/${tripId}`, null, {
        params: { email: "demo@user.com" },
      });

      setShareLink(res.data);
      showToast("Link generated");
    } catch {
      showToast("Failed to generate link");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    showToast("Link copied");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareLink)}`, "_blank");
  };

  const shareGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=Trip Share&body=${encodeURIComponent(shareLink)}`,
      "_blank"
    );
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto relative">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Your Trips</h1>
        <p className="text-gray-500">Plan. Organize. Experience.</p>
      </div>

      {/* CREATE TRIP */}
      <div className="flex flex-wrap gap-4 mb-10">
        <input
          placeholder="Where are you going?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 min-w-[200px] p-3 rounded-xl border"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 rounded-xl border"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 rounded-xl border"
        />

        <button
          onClick={addTrip}
          disabled={creating}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {creating ? "Creating..." : "Add"}
        </button>
      </div>

      {/* SHARE SECTION */}
      {shareLink && (
        <div className="mb-10 p-4 border rounded-xl bg-gray-50 space-y-2">
          <p className="text-sm font-semibold">Share Link</p>

          <input
            value={shareLink}
            readOnly
            className="w-full p-2 border rounded"
          />

          <div className="flex gap-3 flex-wrap">
            <button onClick={copyLink} className="text-sm px-3 py-1 bg-black text-white rounded">
              Copy
            </button>

            <button onClick={shareWhatsApp} className="text-sm px-3 py-1 bg-green-600 text-white rounded">
              WhatsApp
            </button>

            <button onClick={shareGmail} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">
              Gmail
            </button>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {trips.length === 0 && (
        <p className="text-gray-400 text-center">No trips yet ✈️</p>
      )}

      {/* TRIPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {trips.map((t) => (
          <div key={t.tripId} className="p-6 bg-white rounded-2xl shadow space-y-3">

            {editingId === t.tripId ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 w-full rounded"
                />

                <input
                  type="date"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                  className="border p-2 w-full rounded"
                />

                <input
                  type="date"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                  className="border p-2 w-full rounded"
                />

                <div className="flex gap-2">
                  <button onClick={saveEdit} className="bg-black text-white px-3 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-gray-500">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigate(`/trip/${t.tripId}`)}
                  className="cursor-pointer"
                >
                  <h2 className="font-semibold">{t.title}</h2>
                  <p className="text-sm text-gray-500">
                    {t.startDate} → {t.endDate}
                  </p>
                </div>

                <div className="flex gap-3 text-sm">
                  <button onClick={() => startEdit(t)} className="text-blue-600">
                    Edit
                  </button>

                  <button onClick={() => deleteTrip(t.tripId)} className="text-red-500">
                    Delete
                  </button>

                  <button
                    onClick={() => generateShareLink(t.tripId)}
                    className="text-green-600"
                  >
                    Share
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