import React, { useMemo, useState } from 'react';
import {
  FaFileCsv,
  FaFileExport,
  FaTable,
  FaUsers,
  FaFireAlt,
} from 'react-icons/fa';

// Define the shape of a personnel record for the heatmap dataset
interface PersonnelRecord {
  designation: string;
  retirementDate: string; // in ISO or human readable format
  discipline: string;
  gradeLevel: string;
  idNo: number;
  location: string;
  area: string;
  qualification: string;
  sbu: string;
  sex: 'M' | 'F';
  roleGroup: 'Leadership' | 'Technical Expert' | 'Specialist';
  riskCategory: 'critical' | 'high' | 'medium' | 'low';
}

// Sample dataset derived from the original page (5 records)
const initialData: PersonnelRecord[] = [
  {
    designation: 'CHIEF, CORP LAW & BOARD MATTERS - LGL',
    retirementDate: '2026-09-14',
    discipline: 'Leadership',
    gradeLevel: 'M3',
    idNo: 19683,
    location: 'Abuja',
    area: 'GCEO, Legal',
    qualification: 'B.L 1989, FSLC 1977, LL.B 1989, WASC 1983',
    sbu: 'CHQ',
    sex: 'M',
    roleGroup: 'Leadership',
    riskCategory: 'critical',
  },
  {
    designation: 'MD, NNPC FOUNDATION',
    retirementDate: '2026-12-24',
    discipline: 'Leadership',
    gradeLevel: 'M3',
    idNo: 15805,
    location: 'Abuja',
    area: 'Foundation',
    qualification: 'B.L 1988, LL.B 1987',
    sbu: 'CHQ',
    sex: 'M',
    roleGroup: 'Leadership',
    riskCategory: 'high',
  },
  {
    designation: 'MGR, PETROLEUM ENGINEERING',
    retirementDate: '2026-03-14',
    discipline: 'Reservoir Engineering',
    gradeLevel: 'M5',
    idNo: 20145,
    location: 'Port Harcourt',
    area: 'Engineering',
    qualification: 'B.ENG PETROLEUM ENGINEERING 1992, M.SC RESERVOIR ENGINEERING',
    sbu: 'NEPL',
    sex: 'F',
    roleGroup: 'Technical Expert',
    riskCategory: 'critical',
  },
  {
    designation: 'DM, OPERATIONS & MAINTENANCE',
    retirementDate: '2026-08-19',
    discipline: 'Maintenance Engineering',
    gradeLevel: 'M6',
    idNo: 21234,
    location: 'Warri',
    area: 'Operations',
    qualification: 'HND MECHANICAL ENGINEERING 1994',
    sbu: 'NEPL',
    sex: 'M',
    roleGroup: 'Specialist',
    riskCategory: 'medium',
  },
  {
    designation: 'LEAD PRODUCTION OPERATOR',
    retirementDate: '2027-01-09',
    discipline: 'Production Operations',
    gradeLevel: 'SS1',
    idNo: 22345,
    location: 'Lagos',
    area: 'Production',
    qualification: 'HND CHEMICAL ENGINEERING 2005',
    sbu: 'KRPC',
    sex: 'F',
    roleGroup: 'Specialist',
    riskCategory: 'low',
  },
];

/**
 * HeatmapPage implements a simplified knowledge risk heatmap analytics dashboard.
 * It includes summary statistics, simple filtering and searching, risk breakdowns,
 * a risk matrix view, and a table of personnel records. The implementation is
 * intentionally declarative to favour readability over micro-optimisation.
 */
const HeatmapPage: React.FC = () => {
  // State for search and filters
  const [search, setSearch] = useState('');
  const [filterSbu, setFilterSbu] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSex, setFilterSex] = useState('All');
  const [quickFilter, setQuickFilter] = useState('None');

  // Derive lists of unique values for filters from the dataset
  const sbus = useMemo(() => {
    const all = Array.from(new Set(initialData.map((d) => d.sbu)));
    return ['All', ...all];
  }, []);
  const grades = useMemo(() => {
    const all = Array.from(new Set(initialData.map((d) => d.gradeLevel)));
    return ['All', ...all];
  }, []);
  const locations = useMemo(() => {
    const all = Array.from(new Set(initialData.map((d) => d.location)));
    return ['All', ...all];
  }, []);
  const sexes = ['All', 'M', 'F'];

  /**
   * Apply the selected filters and search term to the dataset. Quick filters
   * override other selections to focus on a specific slice of the data.
   */
  const filteredData = useMemo(() => {
    let data = initialData;

    // Apply quick filters
    if (quickFilter === 'Leadership') {
      data = data.filter((d) => d.roleGroup === 'Leadership');
    } else if (quickFilter === 'Female') {
      data = data.filter((d) => d.sex === 'F');
    } else if (quickFilter === 'Retiring2026') {
      data = data.filter((d) => d.retirementDate.startsWith('2026'));
    } else if (quickFilter === 'Critical') {
      data = data.filter((d) => d.riskCategory === 'critical');
    } else if (quickFilter === 'Moderate') {
      data = data.filter((d) => d.riskCategory === 'medium' || d.riskCategory === 'high');
    } else if (quickFilter === 'Low') {
      data = data.filter((d) => d.riskCategory === 'low');
    }

    // Apply general filters
    if (filterSbu !== 'All') {
      data = data.filter((d) => d.sbu === filterSbu);
    }
    if (filterGrade !== 'All') {
      data = data.filter((d) => d.gradeLevel === filterGrade);
    }
    if (filterLocation !== 'All') {
      data = data.filter((d) => d.location === filterLocation);
    }
    if (filterSex !== 'All') {
      data = data.filter((d) => d.sex === filterSex);
    }
    // Apply search across multiple fields (case-insensitive)
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      data = data.filter((d) =>
        Object.values(d).some((value) =>
          String(value).toLowerCase().includes(term),
        ),
      );
    }
    return data;
  }, [search, filterSbu, filterGrade, filterLocation, filterSex, quickFilter]);

  // Summary statistics for the filtered dataset
  const totalRecords = filteredData.length;
  const dataColumns = 13;
  const completeness = '100.0%';
  const uniqueSbus = new Set(filteredData.map((d) => d.sbu)).size;
  // Additional counts for quick filter boxes
  const countLeadership = filteredData.filter((d) => d.roleGroup === 'Leadership').length;
  const countCritical = filteredData.filter((d) => d.riskCategory === 'critical').length;
  const countModerate = filteredData.filter((d) => d.riskCategory === 'medium' || d.riskCategory === 'high').length;
  const countLow = filteredData.filter((d) => d.riskCategory === 'low').length;
  const countRetiring2026 = filteredData.filter((d) => d.retirementDate.startsWith('2026')).length;
  const countFemale = filteredData.filter((d) => d.sex === 'F').length;

  // Compute risk distribution by SBU
  const riskBySbu = useMemo(() => {
    const result: Record<string, { critical: number; high: number; medium: number; low: number; total: number }> = {};
    filteredData.forEach((d) => {
      if (!result[d.sbu]) {
        result[d.sbu] = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
      }
      result[d.sbu][d.riskCategory]++;
      result[d.sbu].total++;
    });
    return result;
  }, [filteredData]);

  // Compute personnel distribution by grade level
  const distributionByGrade = useMemo(() => {
    const result: Record<string, number> = {};
    filteredData.forEach((d) => {
      result[d.gradeLevel] = (result[d.gradeLevel] || 0) + 1;
    });
    return result;
  }, [filteredData]);

  // Build the risk matrix structure
  const riskMatrix = useMemo(() => {
    const matrix: Record<
      'Leadership' | 'Technical Expert' | 'Specialist',
      Record<'critical' | 'high' | 'medium' | 'low', PersonnelRecord[]>
    > = {
      Leadership: { critical: [], high: [], medium: [], low: [] },
      'Technical Expert': { critical: [], high: [], medium: [], low: [] },
      Specialist: { critical: [], high: [], medium: [], low: [] },
    };
    filteredData.forEach((d) => {
      matrix[d.roleGroup][d.riskCategory].push(d);
    });
    return matrix;
  }, [filteredData]);

  /**
   * Export the currently filtered dataset to CSV. Generates a temporary Blob and
   * triggers a download in the browser. Only the visible rows are exported.
   */
  const exportCsv = () => {
    const header = [
      'Designation',
      'RetirementDate',
      'Discipline',
      'GradeLevel',
      'ID',
      'Location',
      'Area',
      'Qualification',
      'SBU',
      'Sex',
      'RoleGroup',
      'RiskCategory',
    ];
    const rows = filteredData.map((d) => [
      d.designation,
      d.retirementDate,
      d.discipline,
      d.gradeLevel,
      d.idNo.toString(),
      d.location,
      d.area,
      d.qualification,
      d.sbu,
      d.sex,
      d.roleGroup,
      d.riskCategory,
    ]);
    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'km-risk-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold">NNPC Comprehensive Knowledge Risk Heatmap</h1>
            <p className="text-sm opacity-80">
              Complete Personnel Data Analysis &amp; Knowledge Capture Priority Matrix
            </p>
          </div>
          <div className="bg-white rounded-md p-2">
            <img src="/nnpc_ltd_logo.png" alt="NNPC logo" className="h-8" />
          </div>
        </div>
      </header>
      <main className="p-6 space-y-8">
        {/* Dataset overview */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Complete Dataset Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-purple-50 rounded-lg p-3">
              <span className="text-3xl font-bold text-purple-700">{totalRecords}</span>
              <span className="text-sm text-gray-600 text-center">Total Personnel Records</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg p-3">
              <span className="text-3xl font-bold text-purple-700">{dataColumns}</span>
              <span className="text-sm text-gray-600 text-center">Data Columns Captured</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg p-3">
              <span className="text-3xl font-bold text-purple-700">{completeness}</span>
              <span className="text-sm text-gray-600 text-center">Average Data Completeness</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg p-3">
              <span className="text-3xl font-bold text-purple-700">{uniqueSbus}</span>
              <span className="text-sm text-gray-600 text-center">Strategic Business Units</span>
            </div>
          </div>
          {/* Export buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              <FaFileCsv /> Export Filtered Data
            </button>
            <button
              onClick={() => alert('Export Risk Report feature not implemented in this clone.')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              <FaFileExport /> Export Risk Report
            </button>
            <button
              onClick={() => alert('Data structure view not implemented in this clone.')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              <FaTable /> View Data Structure
            </button>
          </div>
        </section>
        {/* Filters and quick filters */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600">Filter by SBU</label>
              <select
                value={filterSbu}
                onChange={(e) => setFilterSbu(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                {sbus.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Filter by GRADE LEVEL</label>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Filter by LOCATION</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Filter by SEX</label>
              <select
                value={filterSex}
                onChange={(e) => setFilterSex(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                {sexes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Quick Filters</label>
              <select
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="None">No Quick Filter</option>
                <option value="Leadership">Leadership Positions</option>
                <option value="Critical">Critical Risk (&lt; 6 months)</option>
                <option value="Moderate">Moderate Risk (6–12 months)</option>
                <option value="Low">Lower Risk (&gt; 12 months)</option>
                <option value="Retiring2026">Retiring in 2026</option>
                <option value="Female">Female Personnel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Search All Fields</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Search across designation, qualifications, location..."
              />
            </div>
          </div>
        </section>
        {/* Quick summary boxes */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #f53844 0%, #e01f5b 100%)' }}
          >
            <div className="text-3xl font-bold">{countLeadership}</div>
            <div className="text-sm">Leadership Positions</div>
          </div>
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #f85032 0%, #e73827 100%)' }}
          >
            <div className="text-3xl font-bold">{countCritical}</div>
            <div className="text-sm">Critical Risk (&lt; 6 months)</div>
          </div>
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)' }}
          >
            <div className="text-3xl font-bold">{countModerate}</div>
            <div className="text-sm">Moderate Risk (6–12 months)</div>
          </div>
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }}
          >
            <div className="text-3xl font-bold">{countLow}</div>
            <div className="text-sm">Lower Risk (&gt; 12 months)</div>
          </div>
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' }}
          >
            <div className="text-3xl font-bold">{countRetiring2026}</div>
            <div className="text-sm">Retiring in 2026</div>
          </div>
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ background: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' }}
          >
            <div className="text-3xl font-bold">{countFemale}</div>
            <div className="text-sm">Female Personnel</div>
          </div>
        </section>
        {/* Risk distribution analysis */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-700">Comprehensive Risk Distribution Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk distribution by SBU */}
            <div>
              <h4 className="font-medium text-gray-600 mb-2">Risk Distribution by SBU</h4>
              <div className="space-y-2">
                {Object.entries(riskBySbu).map(([sbu, counts]) => (
                  <div
                    key={sbu}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span className="font-medium text-gray-700">
                      {sbu} ({counts.total})
                    </span>
                    <div className="flex gap-1 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-red-500 text-white">
                        Critical: {counts.critical}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white">
                        High: {counts.high}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-gray-800">
                        Medium: {counts.medium}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500 text-white">
                        Low: {counts.low}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Personnel by grade level */}
            <div>
              <h4 className="font-medium text-gray-600 mb-2">Personnel by Grade Level</h4>
              <div className="space-y-2">
                {Object.entries(distributionByGrade).map(([grade, count]) => (
                  <div
                    key={grade}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span className="font-medium text-gray-700">{grade}</span>
                    <span className="text-purple-700 font-semibold">
                      {count} ({((count / totalRecords) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Risk matrix */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4 overflow-x-auto">
          <h3 className="font-semibold text-gray-700">Knowledge Risk Matrix</h3>
          <div className="min-w-max">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-2 text-left"></th>
                  <th className="px-2 py-2 text-center font-semibold">&lt; 6 months</th>
                  <th className="px-2 py-2 text-center font-semibold">6–12 months</th>
                  <th className="px-2 py-2 text-center font-semibold">&gt; 12 months</th>
                </tr>
              </thead>
              <tbody>
                {(['Leadership', 'Technical Expert', 'Specialist'] as const).map((role) => (
                  <tr key={role} className="border-b">
                    <td className="px-2 py-3 font-medium text-gray-700">{role}</td>
                    {/* Critical (<6 months) */}
                    <td className="px-2 py-2 align-top">
                      {riskMatrix[role].critical.length > 0 ? (
                        <div className="p-2 rounded-md bg-red-100 text-red-800">
                          <div className="font-bold text-xs mb-1">
                            {riskMatrix[role].critical.length} positions
                          </div>
                          {riskMatrix[role].critical.map((d) => (
                            <div key={d.idNo} className="text-xs">
                              {d.designation}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-xs text-gray-500">No positions</div>
                      )}
                    </td>
                    {/* High/Medium (6-12 months) */}
                    <td className="px-2 py-2 align-top">
                      {riskMatrix[role].high.length + riskMatrix[role].medium.length > 0 ? (
                        <div className="p-2 rounded-md bg-yellow-100 text-yellow-800">
                          <div className="font-bold text-xs mb-1">
                            {riskMatrix[role].high.length + riskMatrix[role].medium.length} positions
                          </div>
                          {[...riskMatrix[role].high, ...riskMatrix[role].medium].map((d) => (
                            <div key={d.idNo} className="text-xs">
                              {d.designation}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-xs text-gray-500">No positions</div>
                      )}
                    </td>
                    {/* Low (>12 months) */}
                    <td className="px-2 py-2 align-top">
                      {riskMatrix[role].low.length > 0 ? (
                        <div className="p-2 rounded-md bg-green-100 text-green-800">
                          <div className="font-bold text-xs mb-1">
                            {riskMatrix[role].low.length} positions
                          </div>
                          {riskMatrix[role].low.map((d) => (
                            <div key={d.idNo} className="text-xs">
                              {d.designation}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-xs text-gray-500">No positions</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Complete personnel database table */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm overflow-auto">
          <h3 className="font-semibold text-gray-700 mb-4">
            Complete Personnel Database - {filteredData.length} Records
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-max text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-2 text-left">Designation</th>
                  <th className="p-2 text-left">Date Due For Retirem.</th>
                  <th className="p-2 text-left">Discipline</th>
                  <th className="p-2 text-left">Grade Level</th>
                  <th className="p-2 text-left">ID No</th>
                  <th className="p-2 text-left">Location</th>
                  <th className="p-2 text-left">Area</th>
                  <th className="p-2 text-left">Qualification</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((d) => (
                  <tr key={d.idNo} className="border-b hover:bg-purple-50">
                    <td className="p-2 whitespace-nowrap">{d.designation}</td>
                    <td className="p-2 whitespace-nowrap">{new Date(d.retirementDate).toLocaleDateString('en-GB')}</td>
                    <td className="p-2 whitespace-nowrap">{d.discipline}</td>
                    <td className="p-2 whitespace-nowrap">{d.gradeLevel}</td>
                    <td className="p-2 whitespace-nowrap">{d.idNo}</td>
                    <td className="p-2 whitespace-nowrap">{d.location}</td>
                    <td className="p-2 whitespace-nowrap">{d.area}</td>
                    <td className="p-2 whitespace-nowrap">{d.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeatmapPage;