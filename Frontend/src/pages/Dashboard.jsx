import React, { useEffect, useState } from "react";
import axios from "axios";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";

// API base URL from environment variables (fallback for local dev)
const API = import.meta.env.VITE_API_URL || "https://tinylink-3yn8.onrender.com";

export default function Dashboard() {
  // Store all shortened links
  const [links, setLinks] = useState([]);

  // Track loading state for initial fetch
  const [loading, setLoading] = useState(true);

  // Store error messages (fetch/add/delete)
  const [error, setError] = useState("");

  // Fetch all links on first load
  useEffect(() => {
    let mounted = true; // prevents state update after unmount

    axios
      .get(`${API}/api/links`)
      .then(res => {
        if (mounted) setLinks(res.data || []);
      })
      .catch(() => setError("Error loading links"))
      .finally(() => mounted && setLoading(false));

    // Cleanup to avoid memory leaks
    return () => (mounted = false);
  }, []);

  // Add a new shortened link
  const handleAdd = async (originalUrl, code) => {
    setError("");

    try {
      const res = await axios.post(`${API}/api/links`, { originalUrl, code });

      // Prepend the new link to UI list
      setLinks(prev => [res.data, ...prev]);
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err.message ||
        "Failed to add";

      setError(message);
      throw new Error(message); // allows LinkForm to show error
    }
  };

  // Delete a link by code
  const handleDelete = async (code) => {
    setError("");

    try {
      await axios.delete(`${API}/api/links/${code}`);

      // Remove from UI
      setLinks(prev => prev.filter(l => l.code !== code));
    } catch {
      setError("Could not delete");
    }
  };

  return (
    <section>
      {/* Page header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-indigo-800">
            Effortlessly shorten, manage, and track your URLs.
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl">
            Fast, friendly, and privacy-minded link shortening for your projects.
          </p>
        </div>

        {/* Placeholder user info (can be replaced with real auth) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-gray-600">
            Your account: <strong>guest</strong>
          </div>
        </div>
      </header>

      {/* Add new link form */}
      <LinkForm onAdd={handleAdd} />

      {/* Display errors */}
      {error && (
        <div className="mt-4 p-3 rounded bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {/* Show loading or table */}
      {loading ? (
        <div className="mt-8 text-center text-lg animate-pulse">
          Loading links...
        </div>
      ) : (
        <LinkTable links={links} onDelete={handleDelete} />
      )}

      {/* Floating scroll-to-top button for mobile */}
      <button
        title="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed bottom-6 right-6 md:hidden bg-indigo-600 text-white rounded-full p-3 shadow-lg z-50 hover:scale-105 transition"
      >
        +
      </button>
    </section>
  );
}
