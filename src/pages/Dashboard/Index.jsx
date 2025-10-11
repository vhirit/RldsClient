

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const BankVerificationDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Verification Statistics
  const [stats, setStats] = useState({
    totalApplications: 1247,
    pendingVerification: 89,
    approvedToday: 34,
    rejectedToday: 12,
    inProgress: 45,
    highRisk: 23
  });

  // Document Type Distribution
  const documentTypeData = [
    { name: "Passport", value: 45 },
    { name: "Driver License", value: 30 },
    { name: "National ID", value: 15 },
    { name: "Utility Bill", value: 8 },
    { name: "Bank Statement", value: 2 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Monthly Verification Trend
  const monthlyTrendData = [
    { month: 'Jan', applications: 120, approved: 95, rejected: 25 },
    { month: 'Feb', applications: 150, approved: 120, rejected: 30 },
    { month: 'Mar', applications: 180, approved: 145, rejected: 35 },
    { month: 'Apr', applications: 200, approved: 160, rejected: 40 },
    { month: 'May', applications: 220, approved: 180, rejected: 40 },
    { month: 'Jun', applications: 240, approved: 200, rejected: 40 }
  ];

  // Risk Level Distribution
  const riskLevelData = [
    { name: 'Low Risk', value: 65 },
    { name: 'Medium Risk', value: 25 },
    { name: 'High Risk', value: 10 }
  ];

  const RISK_COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  // Recent Verification Activities
  const recentActivities = [
    { 
      id: 1, 
      applicant: "John Smith", 
      document: "Passport", 
      status: "Approved", 
      time: "2 hours ago", 
      officer: "You",
      risk: "Low"
    },
    { 
      id: 2, 
      applicant: "Maria Garcia", 
      document: "Driver License", 
      status: "Pending", 
      time: "3 hours ago", 
      officer: "Sarah Johnson",
      risk: "Medium"
    },
    { 
      id: 3, 
      applicant: "David Chen", 
      document: "National ID", 
      status: "Rejected", 
      time: "5 hours ago", 
      officer: "You",
      risk: "High"
    },
    { 
      id: 4, 
      applicant: "Emma Wilson", 
      document: "Passport", 
      status: "Approved", 
      time: "1 day ago", 
      officer: "Mike Brown",
      risk: "Low"
    }
  ];

  // Pending Verifications Table
  const pendingVerifications = [
    {
      id: "APP001",
      applicant: "Robert Taylor",
      documentType: "Passport",
      submitted: "2024-01-15",
      priority: "High",
      assignedTo: "You"
    },
    {
      id: "APP002",
      applicant: "Lisa Anderson",
      documentType: "Driver License",
      submitted: "2024-01-15",
      priority: "Medium",
      assignedTo: "Sarah Johnson"
    },
    {
      id: "APP003",
      applicant: "James Wilson",
      documentType: "National ID",
      submitted: "2024-01-14",
      priority: "Low",
      assignedTo: "Unassigned"
    },
    {
      id: "APP004",
      applicant: "Sophia Martinez",
      documentType: "Utility Bill",
      submitted: "2024-01-14",
      priority: "High",
      assignedTo: "You"
    }
  ];

  const quickActions = [
    { name: "New Verification", icon: "📋", path: "/verification/new" },
    { name: "Pending Queue", icon: "⏳", path: "/verification/pending" },
    { name: "Approved Cases", icon: "✅", path: "/verification/approved" },
    { name: "Risk Analysis", icon: "🔍", path: "/verification/risk" },
    { name: "Reports", icon: "📊", path: "/reports" },
    { name: "Settings", icon: "⚙️", path: "/settings" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
       

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 px-4 sm:px-0">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">📄</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total Applications</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalApplications.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-xl">⏳</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-900">{stats.pendingVerification}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-xl">✅</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Approved Today</p>
                <p className="text-xl font-bold text-gray-900">{stats.approvedToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-xl">❌</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Rejected Today</p>
                <p className="text-xl font-bold text-gray-900">{stats.rejectedToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-xl">🔍</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">High Risk</p>
                <p className="text-xl font-bold text-gray-900">{stats.highRisk}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 px-4 sm:px-0">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Verification Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="approved" stroke="#00C49F" strokeWidth={2} />
                <Line type="monotone" dataKey="rejected" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Document Type Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 px-4 sm:px-0">
          {/* Risk Level Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Analysis</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200 group"
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition duration-200">
                      {action.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                      {action.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0">
          {/* Pending Verifications Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Pending Verifications</h3>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {pendingVerifications.length} pending
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pendingVerifications.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.applicant}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.assignedTo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      activity.status === "Approved" ? "bg-green-500" :
                      activity.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.applicant}
                        </p>
                        <div className="flex space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(activity.risk)}`}>
                            {activity.risk}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.document} • By {activity.officer}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BankVerificationDashboard;