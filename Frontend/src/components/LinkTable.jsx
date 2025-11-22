import React from "react";
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

// Utility function to copy text to clipboard
function copyToClipboard(text) {
  // Modern browser clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

export default function LinkTable({ links, onDelete }) {
  return (
    <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

      {/* Empty State */}
      {links.length === 0 ? (
        <div className="col-span-full p-8 text-center text-gray-400 glass rounded-xl">
          No links yet — create your first shortened URL
        </div>
      ) : (
        links.map(link => (
          <article
            key={link.code}
            className="glass card-border rounded-xl p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Header: Shortcode + Delete + Stats */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700">{link.code}</h3>
                  <p className="mt-1 text-sm text-gray-500">Short link</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Analytics Page */}
                  <Link
                    to={`/code/${link.code}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Stats
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(link.code)}
                    aria-label={`Delete ${link.code}`}
                    className="p-1 rounded hover:bg-red-50"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              {/* URL + Copy Button */}
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 truncate-multi underline"
                  title={link.originalUrl}
                >
                  {link.originalUrl}
                </a>

                {/* Copy short URL */}
                <button
                  onClick={() =>
                    copyToClipboard(window.location.origin + "/" + link.code)
                  }
                  className="ml-auto inline-flex items-center gap-2 text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  title="Copy short URL"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            {/* Footer section: Clicks + Last Access Time */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>
                Clicks:{" "}
                <span className="font-medium text-gray-800">
                  {link.clicks ?? 0}
                </span>
              </div>

              <div>
                Last:{" "}
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "--"}
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
