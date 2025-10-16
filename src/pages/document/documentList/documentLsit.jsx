import React, { useState, useEffect } from "react";
import { brandGradients } from "../../../config/gradients";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Calendar,
  User,
  FileText,
  Building,
  Plus,
  RefreshCw,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  BarChart3,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Home,
  Car,
  Briefcase,
  FileCheck,
  FileX,
  Shield,
} from "lucide-react";

export default function LoanDocumentList() {
  const [loans, setLoans] = useState([]);
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    fromDate: "",
    toDate: "",
    customer: "",
    loanType: "",
    verificationStatus: "",
  });

  // Mock data with loan types and verification status
  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoans([
          {
            id: "LOAN-001",
            customer: "John Doe",
            customerEmail: "john@example.com",
            loanAmount: 1250000.0,
            status: "approved",
            appliedDate: "2024-01-15",
            verificationDate: "2024-01-20",
            loanType: "home",
            verificationStatus: "verified",
            documents: {
              identity: true,
              income: true,
              property: true,
              employment: true,
            },
          },
          {
            id: "LOAN-002",
            customer: "Sarah Smith",
            customerEmail: "sarah@example.com",
            loanAmount: 890500.0,
            status: "pending",
            appliedDate: "2024-01-16",
            verificationDate: "",
            loanType: "car",
            verificationStatus: "pending",
            documents: {
              identity: true,
              income: false,
              property: true,
              employment: false,
            },
          },
          {
            id: "LOAN-003",
            customer: "Mike Johnson",
            customerEmail: "mike@example.com",
            loanAmount: 500000.0,
            status: "rejected",
            appliedDate: "2024-01-10",
            verificationDate: "2024-01-18",
            loanType: "personal",
            verificationStatus: "rejected",
            documents: {
              identity: true,
              income: false,
              property: false,
              employment: true,
            },
          },
          {
            id: "LOAN-004",
            customer: "Emily Brown",
            customerEmail: "emily@example.com",
            loanAmount: 2000000.0,
            status: "approved",
            appliedDate: "2024-01-18",
            verificationDate: "2024-01-25",
            loanType: "home",
            verificationStatus: "verified",
            documents: {
              identity: true,
              income: true,
              property: true,
              employment: true,
            },
          },
          {
            id: "LOAN-005",
            customer: "David Wilson",
            customerEmail: "david@example.com",
            loanAmount: 300000.0,
            status: "pending",
            appliedDate: "2024-01-20",
            verificationDate: "",
            loanType: "education",
            verificationStatus: "pending",
            documents: {
              identity: true,
              income: true,
              property: false,
              employment: false,
            },
          },
          {
            id: "LOAN-006",
            customer: "Lisa Anderson",
            customerEmail: "lisa@example.com",
            loanAmount: 750000.0,
            status: "approved",
            appliedDate: "2024-01-22",
            verificationDate: "2024-01-28",
            loanType: "business",
            verificationStatus: "verified",
            documents: {
              identity: true,
              income: true,
              property: true,
              employment: true,
            },
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchLoans();
  }, []);

  // Toggle single loan selection
  const toggleLoanSelection = (id) => {
    setSelectedLoans((prev) =>
      prev.includes(id) ? prev.filter((loanId) => loanId !== id) : [...prev, id]
    );
  };

  // Toggle all loans selection
  const toggleAllSelection = () => {
    setSelectedLoans((prev) =>
      prev.length === filteredLoans.length
        ? []
        : filteredLoans.map((loan) => loan.id)
    );
  };

  // Handle bulk download
  const handleBulkDownload = () => {
    if (selectedLoans.length === 0) {
      alert("Please select loans to download documents");
      return;
    }

    console.log("Downloading loan documents:", selectedLoans);
    alert(`Downloading ${selectedLoans.length} loan document(s)`);
  };

  // Handle individual download
  const handleDownload = (loanId) => {
    console.log("Downloading loan documents:", loanId);
    alert(`Downloading documents for loan ${loanId}`);
  };

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Filter loans based on search and filters
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || loan.status === filters.status;
    const matchesCustomer =
      !filters.customer ||
      loan.customer.toLowerCase().includes(filters.customer.toLowerCase());
    const matchesLoanType =
      !filters.loanType || loan.loanType === filters.loanType;
    const matchesVerification =
      !filters.verificationStatus ||
      loan.verificationStatus === filters.verificationStatus;

    const matchesDate =
      (!filters.fromDate || loan.appliedDate >= filters.fromDate) &&
      (!filters.toDate || loan.appliedDate <= filters.toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCustomer &&
      matchesLoanType &&
      matchesVerification &&
      matchesDate
    );
  });

  // Get status config with icons
  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "bg-green-50 text-green-700 border border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Approved",
          badgeColor: "bg-green-500",
        };
      case "pending":
        return {
          color: "bg-yellow-50 text-yellow-700 border border-yellow-200",
          icon: <Clock className="w-4 h-4" />,
          text: "Pending",
          badgeColor: "bg-yellow-500",
        };
      case "rejected":
        return {
          color: "bg-red-50 text-red-700 border border-red-200",
          icon: <AlertCircle className="w-4 h-4" />,
          text: "Rejected",
          badgeColor: "bg-red-500",
        };
      default:
        return {
          color: "bg-gray-50 text-gray-700 border border-gray-200",
          icon: <Clock className="w-4 h-4" />,
          text: status,
          badgeColor: "bg-gray-500",
        };
    }
  };

  // Get verification status config
  const getVerificationConfig = (status) => {
    switch (status) {
      case "verified":
        return {
          color: "bg-green-50 text-green-700 border border-green-200",
          icon: <FileCheck className="w-4 h-4" />,
          text: "Verified",
        };
      case "pending":
        return {
          color: "bg-yellow-50 text-yellow-700 border border-yellow-200",
          icon: <Clock className="w-4 h-4" />,
          text: "Pending Verification",
        };
      case "rejected":
        return {
          color: "bg-red-50 text-red-700 border border-red-200",
          icon: <FileX className="w-4 h-4" />,
          text: "Verification Failed",
        };
      default:
        return {
          color: "bg-gray-50 text-gray-700 border border-gray-200",
          icon: <Clock className="w-4 h-4" />,
          text: status,
        };
    }
  };

  // Get loan type config
  const getLoanTypeConfig = (type) => {
    switch (type) {
      case "home":
        return {
          color: "bg-blue-50 text-blue-700 border border-blue-200",
          icon: <Home className="w-4 h-4" />,
          text: "Home Loan",
        };
      case "car":
        return {
          color: "bg-purple-50 text-purple-700 border border-purple-200",
          icon: <Car className="w-4 h-4" />,
          text: "Car Loan",
        };
      case "personal":
        return {
          color: "bg-orange-50 text-orange-700 border border-orange-200",
          icon: <User className="w-4 h-4" />,
          text: "Personal Loan",
        };
      case "education":
        return {
          color: "bg-green-50 text-green-700 border border-green-200",
          icon: <FileText className="w-4 h-4" />,
          text: "Education Loan",
        };
      case "business":
        return {
          color: "bg-indigo-50 text-indigo-700 border border-indigo-200",
          icon: <Briefcase className="w-4 h-4" />,
          text: "Business Loan",
        };
      default:
        return {
          color: "bg-gray-50 text-gray-700 border border-gray-200",
          icon: <CreditCard className="w-4 h-4" />,
          text: type,
        };
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      fromDate: "",
      toDate: "",
      customer: "",
      loanType: "",
      verificationStatus: "",
    });
    setSearchTerm("");
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      searchTerm ||
      filters.status ||
      filters.loanType ||
      filters.verificationStatus ||
      filters.customer ||
      filters.fromDate ||
      filters.toDate
    );
  };

  // Document status component
  const DocumentStatus = ({ documents }) => {
    const documentTypes = [
      { key: "identity", label: "ID Proof", icon: User },
      { key: "income", label: "Income", icon: DollarSign },
      { key: "property", label: "Property", icon: Home },
      { key: "employment", label: "Employment", icon: Briefcase },
    ];

    return (
      <div className="flex flex-wrap gap-1">
        {documentTypes.map((doc) => {
          const IconComponent = doc.icon;
          return (
            <div
              key={doc.key}
              className={`p-1 rounded-lg ${
                documents[doc.key]
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
              title={`${doc.label}: ${
                documents[doc.key] ? "Submitted" : "Pending"
              }`}
            >
              <IconComponent className="w-3 h-3" />
            </div>
          );
        })}
      </div>
    );
  };

  // Stats Cards Component
  const StatsCards = () => {
    const stats = [
      {
        label: "Total Loans",
        value: loans.length,
        icon: FileText,
        borderColor: "border-l-blue-500",
        trend: "+8%",
        description: "All loan applications",
      },
      {
        label: "Total Amount",
        value: formatCurrency(
          loans.reduce((sum, loan) => sum + loan.loanAmount, 0)
        ),
        icon: DollarSign,
        borderColor: "border-l-green-500",
        trend: "+15%",
        description: "Total loan amount",
      },
      {
        label: "Pending Verification",
        value: loans.filter((loan) => loan.verificationStatus === "pending")
          .length,
        icon: Clock,
        borderColor: "border-l-yellow-500",
        trend: "+3%",
        description: "Awaiting verification",
      },
      {
        label: "Approved Loans",
        value: loans.filter((loan) => loan.status === "approved").length,
        icon: CheckCircle,
        borderColor: "border-l-purple-500",
        trend: "+12%",
        description: "Successfully approved",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm border-l-4 ${stat.borderColor} border-t border-r border-b border-gray-100 p-6 hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.borderColor.replace(
                    "border-l-",
                    "bg-"
                  )} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${stat.borderColor.replace(
                      "border-l-",
                      "text-"
                    )}`}
                  />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend.startsWith("+")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 brand-gradient-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 brand-text-gradient-hero">
              Loan Document Management
            </h2>
            <p className="text-gray-600 mt-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-500" />
              Manage and track all loan applications and documents
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {selectedLoans.length > 0 && (
              <button
                onClick={handleBulkDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download ({selectedLoans.length})</span>
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              className="
    w-full
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    text-white px-6 py-3 rounded-xl font-semibold
    flex items-center justify-center gap-2
    shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5 transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
  "
            >
              <Plus className="w-4 h-4" />
              <span>New Loan Application</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Search and Filter Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Loans
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by loan ID, customer, email, or loan type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
              </div>

              {/* Quick Filters */}
              <div className="flex items-end space-x-3">
                {/* Status Filter */}
                <div className="w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Status
                  </label>
                  <div className="relative">
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none shadow-sm"
                    >
                      <option value="">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Loan Type Filter */}
                <div className="w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.loanType}
                      onChange={(e) =>
                        setFilters({ ...filters, loanType: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    >
                      <option value="">All Types</option>
                      <option value="home">Home Loan</option>
                      <option value="car">Car Loan</option>
                      <option value="personal">Personal Loan</option>
                      <option value="education">Education Loan</option>
                      <option value="business">Business Loan</option>
                    </select>
                  </div>
                </div>

                {/* Filter Toggle Button */}
                <button
                  className={`p-3 border rounded-xl transition-all duration-200 ${
                    hasActiveFilters()
                      ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </h3>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                  >
                    <span>Clear all filters</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Customer Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter by customer..."
                      value={filters.customer}
                      onChange={(e) =>
                        setFilters({ ...filters, customer: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                {/* Verification Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Status
                  </label>
                  <div className="relative">
                    <FileCheck className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.verificationStatus}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          verificationStatus: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">All Verification</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={filters.fromDate}
                        onChange={(e) =>
                          setFilters({ ...filters, fromDate: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={filters.toDate}
                        onChange={(e) =>
                          setFilters({ ...filters, toDate: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedLoans.length === filteredLoans.length &&
                        filteredLoans.length > 0
                      }
                      onChange={toggleAllSelection}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Loan ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Loan Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Documents
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                        <p className="text-gray-600 font-medium">
                          Loading loan applications...
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Please wait while we fetch your loan data
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {hasActiveFilters()
                            ? "No loans match your filters"
                            : "No loans found"}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          {hasActiveFilters()
                            ? "Try adjusting your search criteria or filters to find what you're looking for."
                            : "Get started by creating your first loan application."}
                        </p>
                        {hasActiveFilters() ? (
                          <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            Clear all filters
                          </button>
                        ) : (
                          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                            Create New Loan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => {
                    const statusConfig = getStatusConfig(loan.status);
                    const verificationConfig = getVerificationConfig(
                      loan.verificationStatus
                    );
                    const loanTypeConfig = getLoanTypeConfig(loan.loanType);

                    return (
                      <tr
                        key={loan.id}
                        className="hover:bg-gray-50 transition-all duration-150 group"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedLoans.includes(loan.id)}
                            onChange={() => toggleLoanSelection(loan.id)}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 group-hover:border-blue-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className="
    w-10 h-10
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    text-white rounded-xl font-semibold text-sm
    flex items-center justify-center
    shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5
    transition-all duration-200
  "
                            >
                              <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {loan.id}
                              </div>
                              <div className="text-sm text-gray-500">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${loanTypeConfig.color}`}
                                >
                                  {loanTypeConfig.icon}
                                  <span className="ml-1">
                                    {loanTypeConfig.text}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span>{loan.customer}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Mail className="w-3 h-3" />
                              <span>{loan.customerEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 font-bold text-gray-900">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span>{formatCurrency(loan.loanAmount)}</span>
                            </div>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${verificationConfig.color}`}
                            >
                              {verificationConfig.icon}
                              <span className="ml-1">
                                {verificationConfig.text}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <DocumentStatus documents={loan.documents} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Applied: {formatDate(loan.appliedDate)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Verified: {formatDate(loan.verificationDate)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.icon}
                            <span className="ml-1">{statusConfig.text}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleDownload(loan.id)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 text-blue-600 hover:scale-110"
                              title="Download Documents"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-green-50 rounded-lg transition-all duration-200 text-green-600 hover:scale-110"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-purple-50 rounded-lg transition-all duration-200 text-purple-600 hover:scale-110"
                              title="Edit Application"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Three dots dropdown */}
                            <div className="relative">
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-600 hover:scale-110"
                                onClick={() => toggleDropdown(loan.id)}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {dropdownOpen === loan.id && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                  <div className="py-2">
                                    <button
                                      onClick={() => handleDownload(loan.id)}
                                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                    >
                                      <Download className="w-4 h-4 mr-3" />
                                      Download All Documents
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Application Details
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                      <Edit className="w-4 h-4 mr-3" />
                                      Edit Application
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                      <FileCheck className="w-4 h-4 mr-3" />
                                      Verify Documents
                                    </button>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150">
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete Application
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredLoans.length} of {loans.length} loan
                applications
                {selectedLoans.length > 0 && (
                  <span className="ml-2 font-medium text-blue-600">
                    ({selectedLoans.length} selected)
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
