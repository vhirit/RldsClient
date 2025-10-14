
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
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  AlertTriangle,
  Plus,
  ListChecks,
  ShieldCheck,
  BarChart3,
  Settings,
  User,
  Calendar,
  Download,
  Upload,
  Filter,
  MoreVertical
} from "lucide-react";

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

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

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

  const RISK_COLORS = ['#10B981', '#F59E0B', '#EF4444'];

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
    { name: "New Verification", icon: Plus, path: "/verification/new", color: "bg-blue-500" },
    { name: "Pending Queue", icon: ListChecks, path: "/verification/pending", color: "bg-yellow-500" },
    { name: "Approved Cases", icon: ShieldCheck, path: "/verification/approved", color: "bg-green-500" },
    { name: "Risk Analysis", icon: Search, path: "/verification/risk", color: "bg-purple-500" },
    { name: "Reports", icon: BarChart3, path: "/reports", color: "bg-indigo-500" },
    { name: "Settings", icon: Settings, path: "/settings", color: "bg-gray-500" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800 border border-green-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Rejected": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-800 border border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border border-green-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border border-green-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, borderColor }) => (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${borderColor} hover:shadow-md transition-shadow duration-200 group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-200`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ name, icon: Icon, path, color }) => (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group hover:scale-105"
    >
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-200 mb-3`}>
        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </div>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 text-center">
        {name}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verification Dashboard</h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Welcome back! Here's your verification overview for {currentTime.toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-white rounded-lg shadow-sm px-4 py-3 border flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Current Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard 
            title="Total Applications" 
            value={stats.totalApplications} 
            icon={FileText} 
            color="text-blue-500"
            borderColor="border-blue-500"
          />
          <StatCard 
            title="Pending" 
            value={stats.pendingVerification} 
            icon={Clock} 
            color="text-yellow-500"
            borderColor="border-yellow-500"
          />
          <StatCard 
            title="Approved Today" 
            value={stats.approvedToday} 
            icon={CheckCircle} 
            color="text-green-500"
            borderColor="border-green-500"
          />
          <StatCard 
            title="Rejected Today" 
            value={stats.rejectedToday} 
            icon={XCircle} 
            color="text-red-500"
            borderColor="border-red-500"
          />
          <StatCard 
            title="In Progress" 
            value={stats.inProgress} 
            icon={Search} 
            color="text-purple-500"
            borderColor="border-purple-500"
          />
          <StatCard 
            title="High Risk" 
            value={stats.highRisk} 
            icon={AlertTriangle} 
            color="text-orange-500"
            borderColor="border-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Monthly Verification Trend</h3>
              <div className="flex space-x-4">
                <span className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                  Applications
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Approved
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Rejected
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rejected" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#EF4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Document Type Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Document Type Distribution</h3>
              <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Risk Level Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Risk Level Analysis</h3>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm lg:col-span-2 border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                  <p className="text-gray-600 mt-1">Frequently used verification tasks</p>
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <QuickActionButton
                    key={index}
                    name={action.name}
                    icon={action.icon}
                    path={action.path}
                    color={action.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Pending Verifications Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pending Verifications</h3>
                  <p className="text-gray-600 mt-1">Applications waiting for review</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full border border-red-200 font-medium">
                    {pendingVerifications.length} pending
                  </span>
                  <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Application
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Applicant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Assigned To
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {pendingVerifications.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
                        onClick={() => navigate(`/verification/${item.id}`)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{item.id}</div>
                              <div className="text-sm text-gray-500">{item.documentType}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.applicant}</div>
                              <div className="text-sm text-gray-500">Submitted {item.submitted}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {item.assignedTo === "You" && (
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            )}
                            {item.assignedTo}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-gray-600 mt-1">Latest verification actions</p>
                </div>
                <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer border border-transparent hover:border-gray-200 group"
                    onClick={() => navigate(`/activity/${activity.id}`)}
                  >
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                      activity.status === "Approved" ? "bg-green-500" :
                      activity.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {activity.applicant}
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status === "Approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {activity.status === "Rejected" && <XCircle className="w-3 h-3 mr-1" />}
                            {activity.status === "Pending" && <Clock className="w-3 h-3 mr-1" />}
                            {activity.status}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(activity.risk)}`}>
                            {activity.risk === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {activity.risk}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1 flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {activity.document} • Verified by {activity.officer}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
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