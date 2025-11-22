import React, { useState } from "react";
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function LinkForm({ onAdd }) {

  // Local states for input fields, loading state, and error messages
  const [originalUrl, setOriginalUrl] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation for empty fields
    if (!originalUrl || !code) {
      setError("Please fill both fields.");
      return;
    }

    setBusy(true);

    try {
      // Call parent function to add the shortened link
      await onAdd(originalUrl, code);

      // Reset fields after successful submit
      setOriginalUrl("");
      setCode("");
    } catch (err) {
      // Catch backend or validation errors
      setError(err?.message || "Could not create link");
    } finally {
      setBusy(false); // Stop loader state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass card-border rounded-2xl p-6 shadow-md">
      
      {/* Input section */}
      <div className="flex flex-col md:flex-row gap-4 items-center">

        {/* Original URL Input */}
        <label className="sr-only" htmlFor="originalUrl">Original URL</label>
        <input
          id="originalUrl"
          type="url"
          required
          placeholder="Paste long URL here"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="flex-1 min-w-0 py-3 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 transition"
        />

        {/* Short Code Input */}
        <label className="sr-only" htmlFor="code">Short code</label>
        <input
          id="code"
          required
          minLength={3}
          maxLength={30}
          placeholder="Short code (e.g., docs23)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-40 py-3 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-200 transition"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:brightness-105 transition disabled:opacity-60"
        >
          <SparklesIcon className="w-5 h-5" />
          {busy ? "Creating..." : "Shorten"}
        </button>
      </div>

      {/* Error message */}
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {/* Helpful tips */}
      <div className="mt-4 text-xs text-gray-500">
        Tips: Use a memorable short code. Codes are unique and make sharing simpler.
      </div>
    </form>
  );
}
