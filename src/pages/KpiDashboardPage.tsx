import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaDatabase,
  FaUsers,
  FaDownload,
  FaRecycle,
  FaLaptop,
  FaStopwatch,
  FaCog,
  FaLightbulb,
  FaStar,
  FaTrash,
} from 'react-icons/fa';

// Define the shape of a metric with monthly update fields
interface Metric {
  key: string;
  title: string;
  target: string;
  description: string;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  metrics: Metric[];
}

// A helper array of month abbreviations for the KPI forms
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * KpiDashboardPage replicates the Knowledge Management KPI dashboard. It features
 * a sidebar of categories and a content area that displays metrics for the
 * selected category. Each metric contains a simple form for entering monthly
 * update values along with a target indicator.
 */
const KpiDashboardPage: React.FC = () => {
  // Define the categories and associated metrics to mirror the original site
  const categories: Category[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <FaTachometerAlt />,
      metrics: [],
    },
    {
      id: 'creation',
      name: 'Creation & Retention',
      icon: <FaDatabase />,
      metrics: [
        {
          key: 'creationRate',
          title: 'Knowledge Asset Creation Rate',
          target: '15%',
          description:
            '(Total new knowledge assets created ÷ Total employees) × 100',
          icon: <FaDatabase />,
        },
        {
          key: 'retentionRate',
          title: 'Critical Knowledge Retention Rate',
          target: '90%',
          description:
            '(Number of knowledge assets from departing employees ÷ Number of departing employees with critical knowledge) × 100',
          icon: <FaUsers />,
        },
      ],
    },
    {
      id: 'sharing',
      name: 'Sharing & Participation',
      icon: <FaUsers />,
      metrics: [
        {
          key: 'participationRate',
          title: 'Employee Participation Rate in KM Activities',
          target: '70%',
          description:
            '(Employees engaged in KM activities ÷ Total employees) × 100',
          icon: <FaUsers />,
        },
        {
          key: 'collaborationIndex',
          title: 'Collaboration Index (Cross-Functional Knowledge Sharing)',
          target: '40%',
          description:
            '(Total cross-BU KM initiatives ÷ Total KM initiatives) × 100',
          icon: <FaUsers />,
        },
      ],
    },
    {
      id: 'access',
      name: 'Access & Utilization',
      icon: <FaDownload />,
      metrics: [
        {
          key: 'factPackDownloadRate',
          title: 'KM Fact Pack Download Rate',
          target: '60%',
          description:
            '(Total Fact Pack downloads ÷ Total employees) × 100',
          icon: <FaDownload />,
        },
        {
          key: 'assetDownloadRate',
          title: 'Knowledge Asset Download Rate',
          target: '20%',
          description:
            '(Total downloads of knowledge assets ÷ Total available knowledge assets) × 100',
          icon: <FaDownload />,
        },
        {
          key: 'reuseRate',
          title: 'Knowledge Reuse Rate',
          target: '25%',
          description:
            '(Number of times a knowledge asset is referenced or applied ÷ Total available knowledge assets) × 100',
          icon: <FaRecycle />,
        },
      ],
    },
    {
      id: 'adoption',
      name: 'System Adoption',
      icon: <FaLaptop />,
      metrics: [
        {
          key: 'platformAdoptionRate',
          title: 'KM Platform Adoption Rate',
          target: '80%',
          description:
            '(Number of active KM system users ÷ Total employees) × 100',
          icon: <FaLaptop />,
        },
        {
          key: 'responseTime',
          title: 'KM Response Time (Speed of Finding Knowledge)',
          target: '5 min',
          description: 'Average time (in minutes) taken to find a relevant knowledge asset',
          icon: <FaStopwatch />,
        },
      ],
    },
    {
      id: 'value',
      name: 'Business Value',
      icon: <FaCog />,
      metrics: [
        {
          key: 'processImprovementRate',
          title: 'KM-Driven Process Improvement Rate',
          target: '30%',
          description:
            '(Number of business processes improved due to KM insights ÷ Total KM initiatives) × 100',
          icon: <FaCog />,
        },
        {
          key: 'decisionMakingContribution',
          title: 'Knowledge Contribution to Decision-Making',
          target: '60%',
          description:
            '(Number of strategic decisions influenced by KM insights ÷ Total strategic decisions made) × 100',
          icon: <FaLightbulb />,
        },
      ],
    },
    {
      id: 'quality',
      name: 'Quality & Relevance',
      icon: <FaStar />,
      metrics: [
        {
          key: 'qualityIndex',
          title: 'Knowledge Asset Quality Index',
          target: '4/5',
          description: 'Average employee rating of knowledge assets on a scale of 1–5',
          icon: <FaStar />,
        },
        {
          key: 'removalRate',
          title: 'Outdated Knowledge Asset Removal Rate',
          target: '95%',
          description:
            '(Number of outdated assets removed ÷ Total knowledge assets) × 100',
          icon: <FaTrash />,
        },
      ],
    },
  ];

  // Track the current selected category ID
  const [selectedCategory, setSelectedCategory] = useState<string>('dashboard');

  /**
   * Render a metric card for the selected category. Each metric includes a
   * description, target value, and inputs for monthly data entry. The inputs are
   * uncontrolled—capturing the values is left as an exercise for the user.
   */
  const renderMetrics = (metrics: Metric[]) => {
    return metrics.map((metric) => (
      <div
        key={metric.key}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl text-purple-600">{metric.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800">{metric.title}</h4>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-purple-700">Target: {metric.target}</span>
        </div>
        {/* Monthly update inputs */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-2">
          {months.map((m) => (
            <div key={m} className="flex flex-col">
              <label className="text-xs text-gray-500" htmlFor={`${metric.key}-${m}`}>
                {m}
              </label>
              <input
                type="number"
                id={`${metric.key}-${m}`}
                name={`${metric.key}-${m}`}
                min="0"
                className="border border-gray-300 rounded-md p-1 text-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 flex items-center gap-3">
          <img src="/nnpc_ltd_logo.png" alt="NNPC logo" className="h-8" />
          <span className="font-semibold text-lg">KM Dashboard</span>
        </div>
        <ul className="mt-4 space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-r-full transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header section for the KPI page */}
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <div>
            <h2 className="text-2xl font-semibold">Knowledge Management Dashboard</h2>
            <p className="text-sm opacity-80">
              Track and monitor organizational KM performance across all key metrics
            </p>
          </div>
          <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-700">Custodian</div>
        </header>
        {/* Content area showing either summary boxes or metric forms */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {selectedCategory === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl text-purple-600">
                  {/* Icon placeholder */}
                  <FaTachometerAlt />
                </span>
                <h4 className="mt-2 font-semibold text-gray-700">Overall KM Health</h4>
                <p className="text-purple-700 font-bold text-2xl">--</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl text-purple-600">
                  <FaUsers />
                </span>
                <h4 className="mt-2 font-semibold text-gray-700">Employee Participation</h4>
                <p className="text-purple-700 font-bold text-2xl">--</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl text-purple-600">
                  <FaStopwatch />
                </span>
                <h4 className="mt-2 font-semibold text-gray-700">Avg Response Time</h4>
                <p className="text-purple-700 font-bold text-2xl">--</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-3xl text-purple-600">
                  <FaStar />
                </span>
                <h4 className="mt-2 font-semibold text-gray-700">Quality Index</h4>
                <p className="text-purple-700 font-bold text-2xl">--</p>
              </div>
            </div>
          )}
          {selectedCategory !== 'dashboard' && (
            <div className="space-y-6">
              {renderMetrics(
                categories.find((c) => c.id === selectedCategory)?.metrics ?? [],
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default KpiDashboardPage;