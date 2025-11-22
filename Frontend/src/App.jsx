// App.jsx
// Main application component: handles routing, layout, header, footer.
// Follows the project requirement: URL conventions must be maintained.

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';

// Importing local logo placed in /assets/
import logo from "./assets/logo.jpeg";

export default function App() {
  return (
    // BrowserRouter manages all application routes
    <BrowserRouter>

      {/* App Container with background gradient */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        
        {/* Top Navigation Header */}
        <header className="bg-violet-950 text-white px-6 py-5 shadow flex items-center justify-between">
          
          {/* Logo + Title section */}
          <div className="flex items-center gap-3">
            {/* Display project logo */}
            <img 
              src={logo} 
              alt="Logo" 
              className="w-20 h-15 object-contain drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold"></h1>
          </div>

          {/* Navigation Links */}
          <nav>
            {/* Dashboard link — must match test URL convention */}
            <Link to="/" className="font-semibold px-4 py-2 rounded hover:bg-violet-800">
              Dashboard
            </Link>
          </nav>
        </header>

        {/* Main content area where routed pages will render */}
        <main className="max-w-6xl mx-auto px-4 py-10">
          <Routes>
            {/* Dashboard route */}
            <Route path="/" element={<Dashboard />} />

            {/* Stats page — receives :code dynamically from URL */}
            <Route path="/code/:code" element={<Stats />} />
          </Routes>
        </main>

        {/* Footer section */}
        <footer className="text-center py-6 text-gray-500">
          &copy; {new Date().getFullYear()} TinyLink • Created by Dev.Krishna • Made with ❤️
        </footer>
      </div>
    </BrowserRouter>
  );
}
