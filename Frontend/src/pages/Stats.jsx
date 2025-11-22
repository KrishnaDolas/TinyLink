import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StatsCard from "../components/StatsCard";

// API base URL
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Stats() {
  // Read the dynamic short code from the URL
  const { code } = useParams();

  // Store the link data fetched from backend
  const [link, setLink] = useState(null);

  // Track loading & error states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch stats for this specific short code
  useEffect(() => {
    let mounted = true; // Prevent state update after component unmount

    axios
      .get(`${API}/api/links/${code}`)
      .then((res) => mounted && setLink(res.data))
      .catch(() => mounted && setError("Stats not found"))
      .finally(() => mounted && setLoading(false));

    // Cleanup
    return () => (mounted = false);
  }, [code]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back to dashboard link */}
      <Link
        to="/"
        className="text-indigo-600 underline text-sm mb-4 inline-block"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Loading state */}
      {loading && <div className="text-lg pt-8">Loading stats...</div>}

      {/* Error state */}
      {error && <div className="text-red-700 pt-8">{error}</div>}

      {/* Stats content */}
      {!loading && link && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left section: preview card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700">Preview</h3>
              <div className="mt-3">
                <a
                  href={link.originalUrl}
                  className="text-indigo-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.originalUrl}
                </a>
              </div>
            </div>
          </div>

          {/* Right section: stats card (reusable component) */}
          <div>
            <StatsCard link={link} />
          </div>
        </div>
      )}
    </div>
  );
}
