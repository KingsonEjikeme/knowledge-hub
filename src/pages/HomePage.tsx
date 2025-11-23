import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaFireAlt, FaClipboardList } from 'react-icons/fa';

/**
 * HomePage renders the landing page with three primary features: the KPI dashboard,
 * the knowledge risk heatmap, and the workshop checklist. The layout loosely
 * replicates the original HTML site using Tailwind CSS utility classes.
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <header className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 pb-16 rounded-b-3xl">
          <h1 className="text-3xl font-semibold mb-1">NNPC KM Resources - Team</h1>
          <p className="text-sm opacity-80">Select a feature to proceed.</p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full border border-white/40 text-xs backdrop-blur-sm">Knowledge Risk</span>
            <span className="px-3 py-1 rounded-full border border-white/40 text-xs backdrop-blur-sm">KPIs</span>
          </div>
          {/* Logo badge in the top-right */}
          <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
            {/* Use a relative path to the logo in the public folder */}
            <img src="/nnpc_ltd_logo.png" alt="NNPC logo" className="h-8 w-auto" />
          </div>
        </header>
        {/* Content */}
        <main className="p-6 space-y-4">
          <div className="bg-purple-50 text-purple-700 p-3 rounded-md text-center">
            <strong>Tip:</strong> Please select an item below to proceed.
          </div>
          <div className="grid grid-cols-1 gap-5">
            {/* KPI Dashboard card */}
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
                  <FaChartBar />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 flex flex-wrap items-center gap-2">
                    KM KPIs Dashboard
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 text-xs font-semibold">Analytics</span>
                  </h3>
                  <p className="text-gray-600 text-sm max-w-md">
                    Track submissions, reviews, reuse, and time-to-publish across directorates with export and drill-downs.
                  </p>
                </div>
              </div>
              <Link
                to="/kpi"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-2 rounded-full font-medium whitespace-nowrap"
              >
                Open
              </Link>
            </div>
            {/* Heatmap card */}
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
                  <FaFireAlt />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 flex flex-wrap items-center gap-2">
                    Knowledge Risk Heatmap
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs font-semibold">Priority Matrix</span>
                  </h3>
                  <p className="text-gray-600 text-sm max-w-md">
                    Analyze personnel data to identify critical knowledge risks by role seniority and time-to-vacancy, with exportable reports.
                  </p>
                </div>
              </div>
              <Link
                to="/heatmap"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-2 rounded-full font-medium whitespace-nowrap"
              >
                Open
              </Link>
            </div>
            {/* Workshop checklist card */}
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-yellow-500 w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
                  <FaClipboardList />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 flex flex-wrap items-center gap-2">
                    Knowledge Capture Workshop Checklist
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-pink-200 text-pink-800 text-xs font-semibold">Checklist</span>
                  </h3>
                  <p className="text-gray-600 text-sm max-w-md">
                    Knowledge Capture Workshop Checklist.
                  </p>
                </div>
              </div>
              <Link
                to="/workshop"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-2 rounded-full font-medium whitespace-nowrap"
              >
                Open
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;