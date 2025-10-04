
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
    bankName: ""
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
            amount: 1250.00,
            status: "paid",
            createdAt: "2024-01-15",
            dueDate: "2024-02-15",
            items: 3,
            bankName: "SBI"
          },
          {
            id: "INV-002",
            customer: "Sarah Smith",
            customerEmail: "sarah@example.com",
            amount: 890.50,
            status: "pending",
            createdAt: "2024-01-16",
            dueDate: "2024-02-16",
            items: 2,
            bankName: "HDFC"
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
            bankName: "Union Bank"
          },
          {
            id: "INV-004",
            customer: "Emily Brown",
            customerEmail: "emily@example.com",
            amount: 450.00,
            status: "paid",
            createdAt: "2024-01-18",
            dueDate: "2024-02-18",
            items: 1,
            bankName: "SBI"
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
            bankName: "HDFC"
          },
          {
            id: "INV-006",
            customer: "Lisa Anderson",
            customerEmail: "lisa@example.com",
            amount: 3200.00,
            status: "paid",
            createdAt: "2024-01-22",
            dueDate: "2024-02-22",
            items: 6,
            bankName: "Union Bank"
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchInvoices();
  }, []);

  // Toggle single invoice selection
  const toggleInvoiceSelection = (id) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((invoiceId) => invoiceId !== id) : [...prev, id]
    );
  };

  // Toggle all invoices selection
  const toggleAllSelection = () => {
    setSelectedInvoices((prev) =>
      prev.length === filteredInvoices.length ? [] : filteredInvoices.map((invoice) => invoice.id)
    );
  };

  // Handle bulk download
  const handleBulkDownload = () => {
    if (selectedInvoices.length === 0) {
      alert("Please select invoices to download");
      return;
    }
    
    console.log("Downloading invoices:", selectedInvoices);
    // Implement actual download logic here
    alert(`Downloading ${selectedInvoices.length} invoice(s)`);
  };

  // Handle individual download
  const handleDownload = (invoiceId) => {
    console.log("Downloading invoice:", invoiceId);
    // Implement actual download logic here
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
    const matchesCustomer = !filters.customer || invoice.customer.toLowerCase().includes(filters.customer.toLowerCase());
    const matchesBank = !filters.bankName || invoice.bankName === filters.bankName;
    
    const matchesDate = (!filters.fromDate || invoice.createdAt >= filters.fromDate) &&
                       (!filters.toDate || invoice.createdAt <= filters.toDate);
    
    return matchesSearch && matchesStatus && matchesCustomer && matchesBank && matchesDate;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get bank color
  const getBankColor = (bankName) => {
    switch (bankName) {
      case "SBI":
        return "bg-blue-100 text-blue-800";
      case "HDFC":
        return "bg-purple-100 text-purple-800";
      case "Union Bank":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      fromDate: "",
      toDate: "",
      customer: "",
      bankName: ""
    });
    setSearchTerm("");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Invoice List</h2>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {selectedInvoices.length > 0 && (
            <button
              onClick={handleBulkDownload}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Selected ({selectedInvoices.length})
            </button>
          )}
          <button className="flex items-center px-4 py-2 bg-[#2274A5] text-white rounded-lg hover:bg-[#7a0f9d] transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Bank Name Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filters.bankName}
                  onChange={(e) => setFilters({ ...filters, bankName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                >
                  <option value="">All Banks</option>
                  <option value="SBI">SBI</option>
                  <option value="HDFC">HDFC</option>
                  <option value="Union Bank">Union Bank</option>
                </select>
              </div>
            </div>

            {/* Customer Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by customer..."
                  value={filters.customer}
                  onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
            <div className="w-full sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                />
              </div>
            </div>

            <div className="w-full sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button className="px-4 py-2 bg-[#2274A5] text-white rounded-lg hover:bg-[#7a0f9d] transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
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
                      selectedInvoices.length === filteredInvoices.length && 
                      filteredInvoices.length > 0
                    }
                    onChange={toggleAllSelection}
                    className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Invoice ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Bank Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Created Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Due Date
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
                  <td colSpan="9" className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2274A5]"></div>
                    </div>
                    <p className="mt-2 text-gray-600">Loading invoices...</p>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No invoices found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => toggleInvoiceSelection(invoice.id)}
                        className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">{invoice.items} items</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{invoice.customer}</div>
                      <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBankColor(
                          invoice.bankName
                        )}`}
                      >
                        {invoice.bankName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(invoice.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(invoice.dueDate)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownload(invoice.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        {/* Three dots dropdown */}
                        <div className="relative">
                          <button
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            onClick={() => toggleDropdown(invoice.id)}
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>

                          {dropdownOpen === invoice.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                              <div className="py-1">
                                <button
                                  onClick={() => handleDownload(invoice.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </button>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </button>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Invoice
                                </button>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Invoice
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
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
                <span className="ml-2 font-medium">
                  ({selectedInvoices.length} selected)
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 bg-[#2274A5] text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}