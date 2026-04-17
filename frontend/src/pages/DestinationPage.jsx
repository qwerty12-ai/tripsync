import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Footer from "../components/Footer";

export default function DestinationPage() {
  const { destinationId } = useParams();

  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const fetchActivities = async () => {
    try {
      const res = await API.get(`/activities/${destinationId}`);
      setActivities(res.data);
    } catch (error) {
      alert("Failed to fetch activities.");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [destinationId]);

  const add = async () => {
    if (!name.trim()) {
      alert("Activity name required");
      return;
    }

    try {
      await API.post(`/activities/${destinationId}`, {
        activityName: name,
        time,
        notes,
      });

      setName("");
      setTime("");
      setNotes("");
      fetchActivities();
    } catch {
      alert("Failed to add activity.");
    }
  };

  const deleteActivity = async (id) => {
    try {
      await API.delete(`/activities/${id}`);
      fetchActivities();
    } catch {
      alert("Failed to delete activity.");
    }
  };

  const startEdit = (a) => {
    setEditingId(a.activityId);
    setEditName(a.activityName);
    setEditTime(a.time);
    setEditNotes(a.notes);
  };

  const saveEdit = async () => {
    try {
      await API.put(`/activities/${editingId}`, {
        activityName: editName,
        time: editTime,
        notes: editNotes,
      });
      setEditingId(null);
      fetchActivities();
    } catch {
      alert("Failed to update activity.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Activities</h1>
        <p className="text-gray-500">Plan what you'll do at this destination</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        <input
          placeholder="Activity"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-xl border flex-1 min-w-[180px]"
        />
        <input
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-3 rounded-xl border"
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-3 rounded-xl border flex-1 min-w-[200px]"
        />
        <button
          onClick={add}
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-6">
        {activities.length === 0 && (
          <p className="text-gray-400 text-center">
            No activities yet. Add something fun 🎯
          </p>
        )}

        {activities.map((a) => (
          <div
            key={a.activityId}
            className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition space-y-3"
          >
            {editingId === a.activityId ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                />
                <input
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="border p-3 w-full rounded-lg"
                />
                <input
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {a.activityName}
                  </h2>
                  <span className="text-sm text-gray-500">{a.time}</span>
                </div>

                <p className="text-sm text-gray-600">{a.notes}</p>

                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => startEdit(a)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteActivity(a.activityId)}
                    className="text-red-500"
                  >
                    Delete
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