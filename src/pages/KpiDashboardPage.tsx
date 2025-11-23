import React, { useState, useEffect, useRef } from 'react';
import {
  MdHome,
  MdInventory_2,
  MdShare,
  MdMouse,
  MdBolt,
  MdTrackChanges,
  MdEmojiEvents,
  MdDns,
  MdVerified,
  MdGroups,
  MdShare as MdShareIcon,
  MdDownload,
  MdFileDownload,
  MdTrendingUp,
  MdAdsClick,
  MdSchedule,
  MdBolt as MdBoltIcon,
  MdMyLocation,
  MdMilitaryTech,
  MdTaskAlt,
  MdLock,
  MdLockOpen,
  MdClose,
  MdMenu,
  MdStorage
} from 'react-icons/md';
import Chart from 'chart.js/auto';

// Month labels
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Calculate average non-zero
function avgNonZero(values: number[]): number {
  const filtered = values.filter((v) => Number.isFinite(v) && v > 0);
  if (filtered.length === 0) return 0;
  return Math.min(100, filtered.reduce((a, b) => a + b, 0) / filtered.length);
}

// KPI data structures
interface KPIData {
  [key: string]: number[];
}

interface KPITargets {
  [key: string]: number;
}

interface MonthlyCardProps {
  title: string;
  dataKey: string;
  unit: string;
  icon: JSX.Element;
  description: string;
  isReverse?: boolean;
}

const KpiDashboardPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [custodianMode, setCustodianMode] = useState<boolean>(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState<boolean>(false);
  const [kpiTargets, setKpiTargets] = useState<KPITargets>({
    knowledgeAssetCreationRate: 15,
    criticalKnowledgeRetentionRate: 90,
    employeeParticipationRate: 70,
    collaborationIndex: 40,
    factPackDownloadRate: 60,
    assetDownloadRate: 20,
    knowledgeReuseRate: 25,
    platformAdoptionRate: 80,
    responseTime: 5,
    processImprovementRate: 30,
    decisionMakingContribution: 60,
    qualityIndex: 4,
    outdatedAssetRemovalRate: 95
  });
  const [monthlyKpiData, setMonthlyKpiData] = useState<KPIData>({
    knowledgeAssetCreationRate: Array(12).fill(0),
    criticalKnowledgeRetentionRate: Array(12).fill(0),
    employeeParticipationRate: Array(12).fill(0),
    collaborationIndex: Array(12).fill(0),
    factPackDownloadRate: Array(12).fill(0),
    assetDownloadRate: Array(12).fill(0),
    knowledgeReuseRate: Array(12).fill(0),
    platformAdoptionRate: Array(12).fill(0),
    responseTime: Array(12).fill(0),
    processImprovementRate: Array(12).fill(0),
    decisionMakingContribution: Array(12).fill(0),
    qualityIndex: Array(12).fill(0),
    outdatedAssetRemovalRate: Array(12).fill(0)
  });
  // Chart refs
  const dashboardChartRef = useRef<HTMLCanvasElement | null>(null);
  const creationChartRef = useRef<HTMLCanvasElement | null>(null);
  const sharingChartRef = useRef<HTMLCanvasElement | null>(null);
  const accessChartRef = useRef<HTMLCanvasElement | null>(null);
  const adoptionChartRef = useRef<HTMLCanvasElement | null>(null);
  const valueChartRef = useRef<HTMLCanvasElement | null>(null);
  const qualityChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstances = useRef<{ [key: string]: any }>({});
  // Navigation definition
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: <MdHome /> },
    { id: 'creation', label: 'Creation & Retention', icon: <MdInventory_2 /> },
    { id: 'sharing', label: 'Sharing & Participation', icon: <MdShare /> },
    { id: 'access', label: 'Access & Utilization', icon: <MdMouse /> },
    { id: 'adoption', label: 'System Adoption', icon: <MdBolt /> },
    { id: 'value', label: 'Business Value', icon: <MdTrackChanges /> },
    { id: 'quality', label: 'Quality & Relevance', icon: <MdEmojiEvents /> }
  ];
  // Data helpers
  const hasAnyData = (): boolean => {
    return Object.values(monthlyKpiData).some((arr) => arr.some((v) => v > 0));
  };
  const getCurrentValue = (key: string): number => {
    const data = monthlyKpiData[key];
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] > 0) return data[i];
    }
    return 0;
  };
  const getStatusClasses = (value: number, target: number, isReverse: boolean = false) => {
    if (value === 0) {
      return { text: 'text-gray-500', bg: 'bg-gray-100' };
    }
    if (isReverse) {
      if (value <= target) return { text: 'text-green-600', bg: 'bg-green-100' };
      if (value <= target * 1.2) return { text: 'text-yellow-600', bg: 'bg-yellow-100' };
      return { text: 'text-red-600', bg: 'bg-red-100' };
    }
    if (value >= target) return { text: 'text-green-600', bg: 'bg-green-100' };
    if (value >= target * 0.8) return { text: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'text-red-600', bg: 'bg-red-100' };
  };
  const safeParseFloat = (val: string): number => {
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 0;
  };
  const handleCustodianToggle = () => {
    if (custodianMode) {
      setCustodianMode(false);
    } else {
      setShowPasswordPrompt(true);
    }
  };
  const handlePasswordSubmit = () => {
    const input = (document.getElementById('custodianPasswordInput') as HTMLInputElement)?.value || '';
    if (input === 'NNPC_KM_2026') {
      setCustodianMode(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password. Please contact the system administrator.');
    }
  };
  const closePasswordPrompt = () => {
    setShowPasswordPrompt(false);
  };
  const buildLineChart = (
    ref: React.RefObject<HTMLCanvasElement>,
    datasets: any[],
    options: any = {}
  ) => {
    const ctx = ref.current;
    if (!ctx) return;
    const id = ref.current?.id || '';
    if (chartInstances.current[id]) {
      chartInstances.current[id].destroy();
    }
    chartInstances.current[id] = new Chart(ctx, {
      type: 'line',
      data: { labels: months, datasets },
      options: Object.assign(
        {
          responsive: true,
          plugins: { legend: { display: true }, tooltip: { mode: 'index', intersect: false } },
          scales: { y: { beginAtZero: true } }
        },
        options
      )
    });
  };
  useEffect(() => {
    if (!hasAnyData()) return;
    // Dashboard chart
    if (dashboardChartRef.current) {
      const creation = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.knowledgeAssetCreationRate[i],
          monthlyKpiData.criticalKnowledgeRetentionRate[i]
        ])
      );
      const sharing = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.employeeParticipationRate[i],
          monthlyKpiData.collaborationIndex[i]
        ])
      );
      const access = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.factPackDownloadRate[i],
          monthlyKpiData.assetDownloadRate[i],
          monthlyKpiData.knowledgeReuseRate[i]
        ])
      );
      const adoption = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.platformAdoptionRate[i],
          (5 - monthlyKpiData.responseTime[i]) * 20
        ])
      );
      const valueSeries = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.processImprovementRate[i],
          monthlyKpiData.decisionMakingContribution[i]
        ])
      );
      const quality = months.map((_, i) =>
        avgNonZero([
          monthlyKpiData.qualityIndex[i] * 20,
          monthlyKpiData.outdatedAssetRemovalRate[i]
        ])
      );
      buildLineChart(
        dashboardChartRef,
        [
          { label: 'Creation & Retention', data: creation, borderWidth: 2, tension: 0.35, fill: false },
          { label: 'Sharing & Participation', data: sharing, borderWidth: 2, tension: 0.35, fill: false },
          { label: 'Access & Utilization', data: access, borderWidth: 2, tension: 0.35, fill: false },
          { label: 'System Adoption', data: adoption, borderWidth: 2, tension: 0.35, fill: false },
          { label: 'Business Value', data: valueSeries, borderWidth: 2, tension: 0.35, fill: false },
          { label: 'Quality & Relevance', data: quality, borderWidth: 2, tension: 0.35, fill: false }
        ],
        { scales: { y: { beginAtZero: true, max: 100 } } }
      );
    }
    if (creationChartRef.current) {
      buildLineChart(
        creationChartRef,
        [
          {
            label: 'Asset Creation Rate %',
            data: monthlyKpiData.knowledgeAssetCreationRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Retention Rate %',
            data: monthlyKpiData.criticalKnowledgeRetentionRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          }
        ],
        { scales: { y: { beginAtZero: true, max: 100 } } }
      );
    }
    if (sharingChartRef.current) {
      buildLineChart(
        sharingChartRef,
        [
          {
            label: 'Participation Rate %',
            data: monthlyKpiData.employeeParticipationRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Collaboration Index %',
            data: monthlyKpiData.collaborationIndex,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          }
        ],
        { scales: { y: { beginAtZero: true, max: 100 } } }
      );
    }
    if (accessChartRef.current) {
      buildLineChart(
        accessChartRef,
        [
          {
            label: 'Fact Pack Downloads %',
            data: monthlyKpiData.factPackDownloadRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Asset Downloads %',
            data: monthlyKpiData.assetDownloadRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Knowledge Reuse %',
            data: monthlyKpiData.knowledgeReuseRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          }
        ],
        { scales: { y: { beginAtZero: true, max: 100 } } }
      );
    }
    if (adoptionChartRef.current) {
      buildLineChart(
        adoptionChartRef,
        [
          {
            label: 'Platform Adoption %',
            data: monthlyKpiData.platformAdoptionRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false,
            yAxisID: 'y'
          },
          {
            label: 'Response Time (min)',
            data: monthlyKpiData.responseTime,
            borderWidth: 2,
            tension: 0.35,
            fill: false,
            yAxisID: 'y1'
          }
        ],
        {
          scales: {
            y: { beginAtZero: true },
            y1: { beginAtZero: true, position: 'right' }
          }
        }
      );
    }
    if (valueChartRef.current) {
      buildLineChart(
        valueChartRef,
        [
          {
            label: 'Process Improvements %',
            data: monthlyKpiData.processImprovementRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Decision Support %',
            data: monthlyKpiData.decisionMakingContribution,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          }
        ],
        { scales: { y: { beginAtZero: true, max: 100 } } }
      );
    }
    if (qualityChartRef.current) {
      buildLineChart(
        qualityChartRef,
        [
          {
            label: 'Quality Index',
            data: monthlyKpiData.qualityIndex.map((v) => v * 20),
            borderWidth: 2,
            tension: 0.35,
            fill: false,
            yAxisID: 'y'
          },
          {
            label: 'Removal Rate %',
            data: monthlyKpiData.outdatedAssetRemovalRate,
            borderWidth: 2,
            tension: 0.35,
            fill: false,
            yAxisID: 'y1'
          }
        ],
        {
          scales: {
            y: { beginAtZero: true, max: 100 },
            y1: { beginAtZero: true, position: 'right', max: 100 }
          }
        }
      );
    }
  }, [monthlyKpiData]);
  // Toggle sidebar
  const toggleSidebar = (forceOpen?: boolean) => {
    if (forceOpen !== undefined) {
      setSidebarOpen(forceOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  // Monthly KPI card
  const MonthlyKPICard = ({ title, dataKey, unit, icon, description, isReverse }: MonthlyCardProps) => {
    const currentValue = getCurrentValue(dataKey);
    const target = kpiTargets[dataKey];
    const cls = getStatusClasses(currentValue, target, !!isReverse);
    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = safeParseFloat(e.target.value);
      setKpiTargets((prev) => ({ ...prev, [dataKey]: value }));
    };
    const handleMonthlyChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const value = safeParseFloat(e.target.value);
      setMonthlyKpiData((prev) => {
        const updated = { ...prev };
        updated[dataKey][idx] = value;
        return updated;
      });
    };
    return (
      <div className={`p-6 rounded-xl border-2 ${cls.bg} transition-all hover:shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <span className={`${cls.text} text-3xl`}>{icon}</span>
          <div className="text-right">
            <div className={`text-2xl font-bold ${cls.text}`}>
              {currentValue === 0 ? '--' : currentValue.toFixed(1)}
              {currentValue === 0 ? '' : unit}
            </div>
            <div className="text-sm text-gray-500 flex items-center space-x-2 justify-end mt-1">
              <span>
                Target: <span id={`tgt-${dataKey}`}>{target}</span>
                {unit}
              </span>
              {custodianMode && (
                <input
                  type="number"
                  step="0.1"
                  value={target}
                  onChange={handleTargetChange}
                  className="w-16 px-1 py-0 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  title="Edit target (Custodian only)"
                />
              )}
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Monthly Updates (2026):</h4>
          <div className="kpi-grid">
            {months.map((m, idx) => (
              <div key={m} className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">{m}</label>
                <input
                  type="number"
                  step="0.1"
                  value={monthlyKpiData[dataKey][idx] || ''}
                  onChange={(e) => handleMonthlyChange(idx, e)}
                  placeholder="0"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  // Hero block
  const HeroBlock = ({ grad, title, subtitle }: { grad: string; title: string; subtitle: string }) => (
    <div className={`bg-gradient-to-r ${grad} text-white p-8 rounded-xl`}>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="opacity-90">{subtitle}</p>
    </div>
  );
  // Has series
  const hasSeries = (keys: string[]) => {
    return keys.some((k) => monthlyKpiData[k].some((v) => v > 0));
  };
  const calcOverallHealth = (): number => {
    if (!hasAnyData()) return 0;
    const keys = [
      'knowledgeAssetCreationRate',
      'criticalKnowledgeRetentionRate',
      'employeeParticipationRate',
      'collaborationIndex',
      'factPackDownloadRate',
      'assetDownloadRate',
      'knowledgeReuseRate',
      'platformAdoptionRate',
      'processImprovementRate',
      'decisionMakingContribution',
      'qualityIndex',
      'outdatedAssetRemovalRate'
    ];
    const values = keys.map((k) => {
      if (k === 'qualityIndex') return getCurrentValue(k) * 20;
      return getCurrentValue(k);
    });
    return Math.round(values.reduce((a, b) => a + b, 0) / keys.length);
  };
  const HeaderTiles = () => {
    const overallHealth = calcOverallHealth();
    const currentEmployeeParticipation = getCurrentValue('employeeParticipationRate');
    const currentResponseTime = getCurrentValue('responseTime');
    const currentQualityIndex = getCurrentValue('qualityIndex');
    const tiles = [
      {
        icon: <MdTrackChanges />, color: 'text-green-600', title: 'Overall KM Health', value: hasAnyData() ? `${overallHealth}%` : '--'
      },
      {
        icon: <MdGroups />, color: 'text-blue-600', title: 'Employee Participation', value: currentEmployeeParticipation === 0 ? '--' : `${currentEmployeeParticipation.toFixed(1)}%`
      },
      {
        icon: <MdSchedule />, color: 'text-purple-600', title: 'Avg Response Time', value: currentResponseTime === 0 ? '--' : `${currentResponseTime.toFixed(1)}min`
      },
      {
        icon: <MdEmojiEvents />, color: 'text-orange-600', title: 'Quality Index', value: currentQualityIndex === 0 ? '--' : `${currentQualityIndex.toFixed(1)}/5`
      }
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="headerTiles">
        {tiles.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className={`${t.color} text-3xl`}>{t.icon}</span>
              <span className={`text-2xl font-bold ${t.color}`}>{t.value}</span>
            </div>
            <p className="text-gray-600 mt-2">{t.title}</p>
          </div>
        ))}
      </div>
    );
  };
  // Render page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Knowledge Management Dashboard</h1>
                  <p className="text-blue-100">
                    Track and monitor organizational KM performance across all key metrics - Year 2026
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {custodianMode && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <MdLockOpen className="mr-1" />
                      Custodian Mode
                    </span>
                  )}
                  <button
                    id="custodianToggle"
                    onClick={handleCustodianToggle}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      custodianMode ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    {custodianMode ? <MdLockOpen /> : <MdLock />}
                    <span>{custodianMode ? 'Exit' : 'Custodian'}</span>
                  </button>
                </div>
              </div>
            </div>
            {!hasAnyData() && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500 rounded-full p-2">
                    <MdStorage className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800">Ready for 2026 Data Entry</h3>
                    <p className="text-yellow-700">Start entering monthly KPI data to see performance analytics and trends.</p>
                  </div>
                </div>
              </div>
            )}
            <HeaderTiles />
            {hasAnyData() && (
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">2026 KM Performance Trends by Category</h3>
                  <canvas id="dashboardChart" ref={dashboardChartRef} height={400}></canvas>
                </div>
              </div>
            )}
          </div>
        );
      case 'creation':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-green-600 to-teal-600"
              title="Knowledge Creation & Retention"
              subtitle="Track how effectively knowledge is being generated, stored, and retained within NNPC Limited"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyKPICard
                title="Knowledge Asset Creation Rate"
                dataKey="knowledgeAssetCreationRate"
                unit="%"
                icon={<MdDns />}
                description="(Total new knowledge assets created ÷ Total employees) × 100"
              />
              <MonthlyKPICard
                title="Critical Knowledge Retention Rate"
                dataKey="criticalKnowledgeRetentionRate"
                unit="%"
                icon={<MdVerified />}
                description="(Number of knowledge assets from departing employees ÷ Number of departing employees with critical knowledge) × 100"
              />
            </div>
            {hasSeries(['knowledgeAssetCreationRate', 'criticalKnowledgeRetentionRate']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 Knowledge Creation & Retention Trends</h3>
                <canvas id="creationChart" ref={creationChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      case 'sharing':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-purple-600 to-pink-600"
              title="Knowledge Sharing & Employee Participation"
              subtitle="Ensuring employees actively engage in KM practices and share knowledge effectively"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyKPICard
                title="Employee Participation Rate in KM Activities"
                dataKey="employeeParticipationRate"
                unit="%"
                icon={<MdGroups />}
                description="(Employees engaged in KM activities ÷ Total employees) × 100"
              />
              <MonthlyKPICard
                title="Collaboration Index (Cross-Functional Knowledge Sharing)"
                dataKey="collaborationIndex"
                unit="%"
                icon={<MdShareIcon />}
                description="(Total cross-BU KM initiatives ÷ Total KM initiatives) × 100"
              />
            </div>
            {hasSeries(['employeeParticipationRate', 'collaborationIndex']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 Sharing & Participation Trends</h3>
                <canvas id="sharingChart" ref={sharingChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      case 'access':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-blue-600 to-cyan-600"
              title="Knowledge Access & Utilization"
              subtitle="Tracking how effectively employees access and use knowledge for decision-making and operational efficiency"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MonthlyKPICard
                title="KM Fact Pack Download Rate"
                dataKey="factPackDownloadRate"
                unit="%"
                icon={<MdDownload />}
                description="(Total Fact Pack downloads ÷ Total employees) × 100"
              />
              <MonthlyKPICard
                title="Knowledge Asset Download Rate"
                dataKey="assetDownloadRate"
                unit="%"
                icon={<MdFileDownload />}
                description="(Total downloads of knowledge assets ÷ Total available knowledge assets) × 100"
              />
              <MonthlyKPICard
                title="Knowledge Reuse Rate"
                dataKey="knowledgeReuseRate"
                unit="%"
                icon={<MdTrendingUp />}
                description="(Number of times a knowledge asset is referenced or applied ÷ Total available knowledge assets) × 100"
              />
            </div>
            {hasSeries(['factPackDownloadRate', 'assetDownloadRate', 'knowledgeReuseRate']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 Access & Utilization Trends</h3>
                <canvas id="accessChart" ref={accessChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      case 'adoption':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-orange-600 to-red-600"
              title="KM System Adoption & Efficiency"
              subtitle="Measuring the effectiveness of KM tools in driving knowledge accessibility and efficiency"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyKPICard
                title="KM Platform Adoption Rate"
                dataKey="platformAdoptionRate"
                unit="%"
                icon={<MdAdsClick />}
                description="(Number of active KM system users ÷ Total employees) × 100"
              />
              <MonthlyKPICard
                title="KM Response Time (Speed of Finding Knowledge)"
                dataKey="responseTime"
                unit=" min"
                icon={<MdSchedule />}
                description="Average time (in minutes) taken to find a relevant knowledge asset"
                isReverse
              />
            </div>
            {hasSeries(['platformAdoptionRate', 'responseTime']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 System Performance Trends</h3>
                <canvas id="adoptionChart" ref={adoptionChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      case 'value':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-teal-600 to-green-600"
              title="Knowledge Impact & Business Value"
              subtitle="Assessing how knowledge contributes to efficiency, innovation, and strategic decision-making"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyKPICard
                title="KM-Driven Process Improvement Rate"
                dataKey="processImprovementRate"
                unit="%"
                icon={<MdBoltIcon />}
                description="(Number of business processes improved due to KM insights ÷ Total KM initiatives) × 100"
              />
              <MonthlyKPICard
                title="Knowledge Contribution to Decision-Making"
                dataKey="decisionMakingContribution"
                unit="%"
                icon={<MdMyLocation />}
                description="(Number of strategic decisions influenced by KM insights ÷ Total strategic decisions made) × 100"
              />
            </div>
            {hasSeries(['processImprovementRate', 'decisionMakingContribution']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 Business Impact Trends</h3>
                <canvas id="valueChart" ref={valueChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      case 'quality':
        return (
          <div className="space-y-8">
            <HeroBlock
              grad="from-indigo-600 to-purple-600"
              title="Knowledge Quality & Relevance"
              subtitle="Ensuring knowledge assets remain accurate, useful, and aligned with business needs"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyKPICard
                title="Knowledge Asset Quality Index"
                dataKey="qualityIndex"
                unit="/5"
                icon={<MdMilitaryTech />}
                description="Average employee rating of knowledge assets on a scale of 1-5"
              />
              <MonthlyKPICard
                title="Outdated Knowledge Asset Removal Rate"
                dataKey="outdatedAssetRemovalRate"
                unit="%"
                icon={<MdTaskAlt />}
                description="(Number of outdated assets removed ÷ Total knowledge assets) × 100"
              />
            </div>
            {hasSeries(['qualityIndex', 'outdatedAssetRemovalRate']) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">2026 Quality Metrics Trends</h3>
                <canvas id="qualityChart" ref={qualityChartRef} height={300}></canvas>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  // Main return
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => toggleSidebar()}
          className="bg-white p-2 rounded-md shadow-lg border border-gray-200"
        >
          {sidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative z-40 bg-white border-r border-gray-200 w-64 h-screen sidebar-transition ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <img src="/nnpc_ltd_logo.png" alt="NNPC Limited Logo" />
              <h2 className="text-xl font-bold text-gray-800">KM Dashboard</h2>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1 px-3">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      if (window.innerWidth < 1024) toggleSidebar(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-gray-700">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium">Ready for</p>
                <p className="text-xs text-blue-500">Year 2026 Data</p>
              </div>
            </div>
          </div>
        </aside>
        {/* Overlay */}
        <div
          className={`lg:hidden fixed inset-0 ${sidebarOpen ? 'block' : 'hidden'} z-30 modal-bg`}
          onClick={() => toggleSidebar(false)}
        ></div>
        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-4 lg:p-8 pt-safe" id="mainContent">
            {renderPage()}
          </main>
        </div>
      </div>
      {/* Password modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 modal-bg">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <MdLock className="text-blue-600" />
              <h3 className="text-lg font-semibold">Custodian Access Required</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Enter the custodian password to access target modification controls.
            </p>
            <input
              id="custodianPasswordInput"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter password"
            />
            <div className="flex space-x-3">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Access
              </button>
              <button
                onClick={closePasswordPrompt}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KpiDashboardPage;