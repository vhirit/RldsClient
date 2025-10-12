
import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Shield,
  Key,
  RefreshCw
} from "lucide-react";

export default function UserTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  
  // Search and Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [accessLevelFilter, setAccessLevelFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [limit] = useState(7);

  const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8080';

  // Show alert function
  const showAlert = (message, type = "info") => {
    setAlertMessage({ message, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  // Fetch users from API with pagination
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${BACKEND_URL}/api/user/admin/users?page=${page}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data.users);
        setTotalUsers(result.data.totalCount);
        setTotalPages(result.data.pagination.pages);
        setCurrentPage(result.data.pagination.page);
      } else {
        throw new Error(result.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount and when page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Apply filters and search whenever relevant state changes
  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, roleFilter, verificationFilter, accessLevelFilter]);

  // Filter and search function
  const applyFilters = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName?.toLowerCase().includes(term) ||
        user.lastName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply verification filter
    if (verificationFilter !== "all") {
      filtered = filtered.filter(user => user.kycStatus === verificationFilter);
    }

    // Apply access level filter
    if (accessLevelFilter !== "all") {
      const accessLevelMap = {
        "Full Access": "admin",
        "Limited Access": "verifier",
        "Standard Access": "user"
      };
      filtered = filtered.filter(user => 
        getAccessLevel(user) === accessLevelFilter
      );
    }

    setFilteredUsers(filtered);
  };

  // Clear all filters and reset to first page
  const clearAllFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setVerificationFilter("all");
    setAccessLevelFilter("all");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return searchTerm || roleFilter !== "all" || verificationFilter !== "all" || accessLevelFilter !== "all";
  };

  // Enhanced pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // Calculate displayed range for filtered results
  const getDisplayRange = () => {
    if (hasActiveFilters()) {
      return `${filteredUsers.length} of ${totalUsers} entries (filtered)`;
    } else {
      const start = ((currentPage - 1) * limit) + 1;
      const end = Math.min(currentPage * limit, totalUsers);
      return `Showing ${start}-${end} of ${totalUsers} entries`;
    }
  };

  // Rest of your helper functions remain the same...
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedRows((prev) =>
      prev.length === filteredUsers.length ? [] : filteredUsers.map((user) => user._id)
    );
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleVerificationAction = async (action, userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${BACKEND_URL}/api/user/admin/users/${userId}/verification`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ kycStatus: action })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update verification status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === userId 
              ? { ...user, kycStatus: action }
              : user
          )
        );
        
        const alertMessages = {
          verified: { message: "✅ User verification status updated to Verified. Email notification sent.", type: "success" },
          rejected: { message: "❌ User verification status updated to Rejected. Email notification sent.", type: "error" },
          pending: { message: "⏳ User verification status updated to Pending. Email notification sent.", type: "warning" },
          hold: { message: "⏸️ User verification put on Hold. Email notification sent.", type: "warning" }
        };
        
        showAlert(alertMessages[action].message, alertMessages[action].type);
      } else {
        throw new Error(result.error || 'Failed to update verification status');
      }
    } catch (err) {
      console.error('Error updating verification status:', err);
      showAlert(`❌ Error: ${err.message}`, "error");
    } finally {
      setDropdownOpen(null);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "not_started":
        return <Clock className="w-4 h-4 text-gray-500" />;
      case "hold":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getVerificationText = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      case "not_started":
        return "Not Started";
      case "hold":
        return "On Hold";
      default:
        return status;
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-800 bg-green-100 border border-green-200";
      case "pending":
        return "text-yellow-800 bg-yellow-100 border border-yellow-200";
      case "rejected":
        return "text-red-800 bg-red-100 border border-red-200";
      case "not_started":
        return "text-gray-800 bg-gray-100 border border-gray-200";
      case "hold":
        return "text-orange-800 bg-orange-100 border border-orange-200";
      default:
        return "text-gray-800 bg-gray-100 border border-gray-200";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "verifier":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getAccessLevel = (user) => {
    if (user.role === 'admin') return 'Full Access';
    if (user.role === 'verifier') return 'Limited Access';
    return 'Standard Access';
  };

  const getAccessLevelColor = (accessLevel) => {
    switch (accessLevel) {
      case "Full Access":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Limited Access":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Standard Access":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get available actions based on current status
  const getAvailableActions = (currentStatus) => {
    const allActions = [
      { value: "verified", label: "Mark as Verified", icon: CheckCircle, color: "text-green-700", bgColor: "hover:bg-green-50" },
      { value: "rejected", label: "Mark as Rejected", icon: XCircle, color: "text-red-700", bgColor: "hover:bg-red-50" },
      { value: "pending", label: "Mark as Pending", icon: Clock, color: "text-yellow-700", bgColor: "hover:bg-yellow-50" },
      { value: "hold", label: "Put on Hold", icon: AlertCircle, color: "text-orange-700", bgColor: "hover:bg-orange-50" },
    ];

    return allActions.filter(action => action.value !== currentStatus);
  };

  // Enhanced Alert Component
  const LightAlert = ({ message, type = "info", onClose }) => {
    const getAlertStyles = () => {
      switch (type) {
        case "success":
          return {
            bg: "bg-green-50 border border-green-200",
            text: "text-green-800",
            icon: "✅",
            badge: "bg-green-100 text-green-800 border border-green-200"
          };
        case "error":
          return {
            bg: "bg-red-50 border border-red-200",
            text: "text-red-800",
            icon: "❌",
            badge: "bg-red-100 text-red-800 border border-red-200"
          };
        case "warning":
          return {
            bg: "bg-yellow-50 border border-yellow-200",
            text: "text-yellow-800",
            icon: "⏳",
            badge: "bg-yellow-100 text-yellow-800 border border-yellow-200"
          };
        case "info":
        default:
          return {
            bg: "bg-blue-50 border border-blue-200",
            text: "text-blue-800",
            icon: "ℹ️",
            badge: "bg-blue-100 text-blue-800 border border-blue-200"
          };
      }
    };

    const styles = getAlertStyles();

    return (
      <div className={`${styles.bg} rounded-xl p-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-96 max-w-lg shadow-lg backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
              <span className="mr-2">{styles.icon}</span>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className={`font-medium ${styles.text}`}>
              {message}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Stats Cards Component
  const StatsCards = () => {
  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      valueColor: "text-blue-900"
    },
    {
      label: "Verified Users",
      value: users.filter(u => u.kycStatus === "verified").length,
      icon: UserCheck,
      borderColor: "border-l-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      valueColor: "text-green-900"
    },
    {
      label: "Pending Verification",
      value: users.filter(u => u.kycStatus === "pending").length,
      icon: Clock,
      borderColor: "border-l-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      valueColor: "text-yellow-900"
    },
    {
      label: "Rejected Users",
      value: users.filter(u => u.kycStatus === "rejected").length,
      icon: UserX,
      borderColor: "border-l-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      valueColor: "text-red-900"
    }
  ];

   return (
    <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index} 
            className={`
              bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 
              ${stat.borderColor} ${stat.bgColor}
              p-6 hover:shadow-md transition-all duration-300
              hover:translate-y-[-2px] hover:border-gray-300
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium ${stat.textColor} mb-1`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>            
          
          </div>
        );
      })}
    </div>
  );
};
  // Show loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-2">Manage and monitor system users</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <div className="text-gray-600">Loading users...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-2">Manage and monitor system users</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold text-lg">Error Loading Users</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={() => fetchUsers(currentPage)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Alert Component */}
        {alertMessage && (
          <LightAlert 
            message={alertMessage.message} 
            type={alertMessage.type}
            onClose={() => setAlertMessage(null)}
          />
        )}

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600 mt-2">Manage and monitor system users</p>
          </div>

          <div className="flex items-center space-x-3">
            {selectedRows.length > 0 && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export Selected ({selectedRows.length})</span>
              </button>
            )}
            <button 
              onClick={() => fetchUsers(currentPage)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header with Tabs and Search */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Users
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === "my"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("my")}
                >
                  My Division
                </button>
              </div>

              {/* Search and Actions */}
              <div className="flex items-center space-x-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle Button */}
                <button 
                  className={`p-2 border rounded-lg transition-all duration-200 ${
                    showFilters || hasActiveFilters()
                      ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                </button>

                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Filter Dropdown Section */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700 flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </h3>
                  {hasActiveFilters() && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Clear all</span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Role Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="verifier">Verifier</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* Verification Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Status
                    </label>
                    <select
                      value={verificationFilter}
                      onChange={(e) => setVerificationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="not_started">Not Started</option>
                      <option value="hold">On Hold</option>
                    </select>
                  </div>

                  {/* Access Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Access Level
                    </label>
                    <select
                      value={accessLevelFilter}
                      onChange={(e) => setAccessLevelFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="all">All Access Levels</option>
                      <option value="Full Access">Full Access</option>
                      <option value="Limited Access">Limited Access</option>
                      <option value="Standard Access">Standard Access</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Badges */}
                {hasActiveFilters() && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                        Search: "{searchTerm}"
                        <button
                          onClick={() => setSearchTerm("")}
                          className="ml-1 hover:text-blue-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {roleFilter !== "all" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                        Role: {roleFilter}
                        <button
                          onClick={() => setRoleFilter("all")}
                          className="ml-1 hover:text-purple-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {verificationFilter !== "all" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Status: {getVerificationText(verificationFilter)}
                        <button
                          onClick={() => setVerificationFilter("all")}
                          className="ml-1 hover:text-yellow-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {accessLevelFilter !== "all" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">
                        Access: {accessLevelFilter}
                        <button
                          onClick={() => setAccessLevelFilter("all")}
                          className="ml-1 hover:text-green-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === filteredUsers.length && filteredUsers.length > 0
                      }
                      onChange={toggleAllSelection}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role & Access
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Verification
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Activity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(user._id)}
                          onChange={() => toggleRowSelection(user._id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.firstName?.charAt(0).toUpperCase()}
                            {user.lastName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">ID: {user._id?.slice(-8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(getAccessLevel(user))}`}>
                            <Key className="w-3 h-3 mr-1" />
                            {getAccessLevel(user)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getVerificationIcon(user.kycStatus)}
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(user.kycStatus)}`}
                          >
                            {getVerificationText(user.kycStatus)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Joined: {formatDate(user.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Last: {formatDate(user.lastLogin)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 relative">
                        <div className="flex items-center space-x-1">
                          <button 
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-blue-600"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 text-green-600"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Three dots dropdown */}
                          <div className="relative">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600"
                              onClick={() => toggleDropdown(user._id)}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen === user._id && (
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                <div className="py-2">
                                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                                    Verification Actions
                                  </div>
                                  {/* Dynamic verification actions */}
                                  {getAvailableActions(user.kycStatus).map((action) => {
                                    const IconComponent = action.icon;
                                    return (
                                      <button
                                        key={action.value}
                                        onClick={() => handleVerificationAction(action.value, user._id)}
                                        className={`flex items-center w-full px-4 py-3 text-sm ${action.color} ${action.bgColor} transition-colors duration-150`}
                                      >
                                        <IconComponent className="w-4 h-4 mr-3" />
                                        {action.label}
                                      </button>
                                    );
                                  })}
                                  
                                  <div className="border-t border-gray-200 my-1"></div>
                                  <button
                                    onClick={() => console.log('Delete user:', user._id)}
                                    className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150"
                                  >
                                    <Trash2 className="w-4 h-4 mr-3" />
                                    Delete User
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-center">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <div className="text-lg font-medium text-gray-900 mb-2">
                          {hasActiveFilters() ? "No users match your filters" : "No users found"}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {hasActiveFilters() 
                            ? "Try adjusting your search criteria or filters to find what you're looking for."
                            : "There are no users in the system yet."
                          }
                        </p>
                        {hasActiveFilters() && (
                          <button
                            onClick={clearAllFilters}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                {getDisplayRange()}
              </div>
              
              {/* Pagination Controls */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-white hover:shadow-sm border border-gray-300"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-gray-300 text-gray-600 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-white hover:shadow-sm border border-gray-300"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}