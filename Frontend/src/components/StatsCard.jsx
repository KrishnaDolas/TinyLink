import React from "react";

// Component to display detailed statistics about a single short link
export default function StatsCard({ link }) {
  // If no link data is provided, don't render anything
  if (!link) return null;

  return (
    <aside className="bg-white rounded-xl p-6 shadow-md">
      {/* Header: Shortcode + Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700">
            Stats: <span className="text-gray-900">{link.code}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Detailed usage information</p>
        </div>
      </div>

      {/* Stats List */}
      <dl className="mt-6 grid grid-cols-1 gap-4">
        
        {/* Original URL */}
        <div className="flex justify-between">
          <dt className="text-sm text-gray-600">Original URL</dt>
          <dd className="text-sm">
            <a
              href={link.originalUrl}
              className="text-indigo-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {link.originalUrl}
            </a>
          </dd>
        </div>

        {/* Total Clicks */}
        <div className="flex justify-between">
          <dt className="text-sm text-gray-600">Clicks</dt>
          <dd className="font-medium">{link.clicks ?? 0}</dd>
        </div>

        {/* Last Time the Link Was Clicked */}
        <div className="flex justify-between">
          <dt className="text-sm text-gray-600">Last Clicked</dt>
          <dd className="text-sm">
            {link.lastClicked
              ? new Date(link.lastClicked).toLocaleString()
              : "--"}
          </dd>
        </div>

        {/* When the Link Was Created */}
        <div className="flex justify-between">
          <dt className="text-sm text-gray-600">Created At</dt>
          <dd className="text-sm">
            {link.createdAt
              ? new Date(link.createdAt).toLocaleString()
              : "--"}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
