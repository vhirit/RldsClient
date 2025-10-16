import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    fromDate: "",
    toDate: "",
    customer: "",
    bankName: "",
  });

  // Mock data with bank names
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setInvoices([
          {
            id: "INV-001",
            customer: "John Doe",
            customerEmail: "john@example.com",
            amount: 1250.0,
            status: "paid",
            createdAt: "2024-01-15",
            dueDate: "2024-02-15",
            items: 3,
            bankName: "SBI",
          },
          {
            id: "INV-002",
            customer: "Sarah Smith",
            customerEmail: "sarah@example.com",
            amount: 890.5,
            status: "pending",
            createdAt: "2024-01-16",
            dueDate: "2024-02-16",
            items: 2,
            bankName: "HDFC",
          },
          {
            id: "INV-003",
            customer: "Mike Johnson",
            customerEmail: "mike@example.com",
            amount: 2100.75,
            status: "overdue",
            createdAt: "2024-01-10",
            dueDate: "2024-01-31",
            items: 5,
            bankName: "Union Bank",
          },
          {
            id: "INV-004",
            customer: "Emily Brown",
            customerEmail: "emily@example.com",
            amount: 450.0,
            status: "paid",
            createdAt: "2024-01-18",
            dueDate: "2024-02-18",
            items: 1,
            bankName: "SBI",
          },
          {
            id: "INV-005",
            customer: "David Wilson",
            customerEmail: "david@example.com",
            amount: 1675.25,
            status: "pending",
            createdAt: "2024-01-20",
            dueDate: "2024-02-20",
            items: 4,
            bankName: "HDFC",
          },
          {
            id: "INV-006",
            customer: "Lisa Anderson",
            customerEmail: "lisa@example.com",
            amount: 3200.0,
            status: "paid",
            createdAt: "2024-01-22",
            dueDate: "2024-02-22",
            items: 6,
            bankName: "Union Bank",
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchInvoices();
  }, []);

  // Toggle single invoice selection
  const toggleInvoiceSelection = (id) => {
    setSelectedInvoices((prev) =>
      prev.includes(id)
        ? prev.filter((invoiceId) => invoiceId !== id)
        : [...prev, id]
    );
  };

  // Toggle all invoices selection
  const toggleAllSelection = () => {
    setSelectedInvoices((prev) =>
      prev.length === filteredInvoices.length
        ? []
        : filteredInvoices.map((invoice) => invoice.id)
    );
  };

  // Handle bulk download
  const handleBulkDownload = () => {
    if (selectedInvoices.length === 0) {
      alert("Please select invoices to download");
      return;
    }

    console.log("Downloading invoices:", selectedInvoices);
    alert(`Downloading ${selectedInvoices.length} invoice(s)`);
  };

  // Handle individual download
  const handleDownload = (invoiceId) => {
    console.log("Downloading invoice:", invoiceId);
    alert(`Downloading invoice ${invoiceId}`);
  };

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Filter invoices based on search and filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.bankName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || invoice.status === filters.status;
    const matchesCustomer =
      !filters.customer ||
      invoice.customer.toLowerCase().includes(filters.customer.toLowerCase());
    const matchesBank =
      !filters.bankName || invoice.bankName === filters.bankName;

    const matchesDate =
      (!filters.fromDate || invoice.createdAt >= filters.fromDate) &&
      (!filters.toDate || invoice.createdAt <= filters.toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCustomer &&
      matchesBank &&
      matchesDate
    );
  });

  // Get status config with icons
  const getStatusConfig = (status) => {
    switch (status) {
      case "paid":
        return {
          color: "bg-green-50 text-green-700 border border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Paid",
          badgeColor: "bg-green-500",
        };
      case "pending":
        return {
          color: "bg-yellow-50 text-yellow-700 border border-yellow-200",
          icon: <Clock className="w-4 h-4" />,
          text: "Pending",
          badgeColor: "bg-yellow-500",
        };
      case "overdue":
        return {
          color: "bg-red-50 text-red-700 border border-red-200",
          icon: <AlertCircle className="w-4 h-4" />,
          text: "Overdue",
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

  // Get bank color
  const getBankColor = (bankName) => {
    switch (bankName) {
      case "SBI":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "HDFC":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Union Bank":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
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
      bankName: "",
    });
    setSearchTerm("");
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      searchTerm ||
      filters.status ||
      filters.bankName ||
      filters.customer ||
      filters.fromDate ||
      filters.toDate
    );
  };

  // Stats Cards Component
  // Stats Cards Component with Left Border Only
  const StatsCards = () => {
    const stats = [
      {
        label: "Total Invoices",
        value: invoices.length,
        icon: FileText,
        borderColor: "border-l-blue-500",
        trend: "+12%",
        description: "All invoices",
      },
      {
        label: "Total Revenue",
        value: formatCurrency(
          invoices.reduce((sum, inv) => sum + inv.amount, 0)
        ),
        icon: DollarSign,
        borderColor: "border-l-green-500",
        trend: "+18%",
        description: "Total amount",
      },
      {
        label: "Pending",
        value: invoices.filter((inv) => inv.status === "pending").length,
        icon: Clock,
        borderColor: "border-l-yellow-500",
        trend: "+5%",
        description: "Awaiting payment",
      },
      {
        label: "Overdue",
        value: invoices.filter((inv) => inv.status === "overdue").length,
        icon: AlertCircle,
        borderColor: "border-l-red-500",
        trend: "+2%",
        description: "Requires attention",
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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Invoice Management
            </h2>
            <p className="text-gray-600 mt-2 flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
              Manage and track all your invoices in one place
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {selectedInvoices.length > 0 && (
              <button
                onClick={handleBulkDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download ({selectedInvoices.length})</span>
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
    flex items-center justify-center gap-2
    px-6 py-3
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    text-white rounded-xl font-semibold text-sm
    shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5
    transition-all duration-200
  "
            >
              <Plus className="w-4 h-4" />
              <span>New Invoice</span>
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
                  Search Invoices
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by invoice ID, customer, email, or bank name..."
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
                    Status
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
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Bank Filter */}
                <div className="w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.bankName}
                      onChange={(e) =>
                        setFilters({ ...filters, bankName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    >
                      <option value="">All Banks</option>
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="Union Bank">Union Bank</option>
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

                <div className="flex items-end">
                  <button
                    type="button"
                    className="
    w-full
    flex items-center justify-center gap-2
    px-6 py-3
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    text-white rounded-xl font-semibold text-sm
    shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5
    transition-all duration-200
  "
                  >
                    Apply Filters
                  </button>
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
                        selectedInvoices.length === filteredInvoices.length &&
                        filteredInvoices.length > 0
                      }
                      onChange={toggleAllSelection}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Bank & Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Amount
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
                          Loading invoices...
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Please wait while we fetch your invoices
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {hasActiveFilters()
                            ? "No invoices match your filters"
                            : "No invoices found"}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          {hasActiveFilters()
                            ? "Try adjusting your search criteria or filters to find what you're looking for."
                            : "Get started by creating your first invoice."}
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
                            Create New Invoice
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => {
                    const statusConfig = getStatusConfig(invoice.status);
                    return (
                      <tr
                        key={invoice.id}
                        className="hover:bg-gray-50 transition-all duration-150 group"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => toggleInvoiceSelection(invoice.id)}
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
    rounded-xl
    flex items-center justify-center
    text-white font-bold text-sm
    transition-all duration-200
    transform hover:-translate-y-0.5
    shadow-sm hover:shadow-md
    cursor-pointer
  "
                            >
                              <FileText className="w-5 h-5" />
                            </div>

                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {invoice.id}
                              </div>
                              <div className="text-sm text-gray-500">
                                {invoice.items} items
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span>{invoice.customer}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Mail className="w-3 h-3" />
                              <span>{invoice.customerEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBankColor(
                                invoice.bankName
                              )}`}
                            >
                              <Building className="w-3 h-3 mr-1" />
                              {invoice.bankName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Created: {formatDate(invoice.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Due: {formatDate(invoice.dueDate)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 font-bold text-gray-900">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>{formatCurrency(invoice.amount)}</span>
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
                              onClick={() => handleDownload(invoice.id)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 text-blue-600 hover:scale-110"
                              title="Download"
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
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Three dots dropdown */}
                            <div className="relative">
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 text-gray-600 hover:scale-110"
                                onClick={() => toggleDropdown(invoice.id)}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {dropdownOpen === invoice.id && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                  <div className="py-2">
                                    <button
                                      onClick={() => handleDownload(invoice.id)}
                                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                    >
                                      <Download className="w-4 h-4 mr-3" />
                                      Download PDF
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Details
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                      <Edit className="w-4 h-4 mr-3" />
                                      Edit Invoice
                                    </button>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150">
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete Invoice
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
                Showing {filteredInvoices.length} of {invoices.length} invoices
                {selectedInvoices.length > 0 && (
                  <span className="ml-2 font-medium text-blue-600">
                    ({selectedInvoices.length} selected)
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
