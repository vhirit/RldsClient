
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
  FileText,
} from "lucide-react";

export default function DocumentTable() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updated mock data with housing loan, car loan, and personal loan documents
  const mockDocuments = [
    // Housing Loan Documents
    {
      id: 1,
      fileName: "housing_loan_application.pdf",
      fileSize: "2.4 MB",
      fileType: "pdf",
      loanType: "Housing Loan",
      documentType: "Application Form",
      lastModified: "2024-01-15T10:30:00Z",
      uploadedBy: "John Doe",
      dateAdded: "2024-01-10T08:15:00Z",
      status: "verified"
    },
    {
      id: 2,
      fileName: "salary_slips_housing.zip",
      fileSize: "3.1 MB",
      fileType: "archive",
      loanType: "Housing Loan",
      documentType: "Income Proof",
      lastModified: "2024-01-14T14:20:00Z",
      uploadedBy: "John Doe",
      dateAdded: "2024-01-12T11:45:00Z",
      status: "pending"
    },
    {
      id: 3,
      fileName: "property_documents.pdf",
      fileSize: "5.2 MB",
      fileType: "pdf",
      loanType: "Housing Loan",
      documentType: "Property Papers",
      lastModified: "2024-01-13T09:15:00Z",
      uploadedBy: "Sarah Smith",
      dateAdded: "2024-01-11T16:20:00Z",
      status: "verified"
    },
    {
      id: 4,
      fileName: "bank_statements_housing.pdf",
      fileSize: "4.5 MB",
      fileType: "pdf",
      loanType: "Housing Loan",
      documentType: "Financial Records",
      lastModified: "2024-01-12T13:40:00Z",
      uploadedBy: "Mike Johnson",
      dateAdded: "2024-01-09T10:00:00Z",
      status: "pending"
    },

    // Car Loan Documents
    {
      id: 5,
      fileName: "car_loan_agreement.pdf",
      fileSize: "1.8 MB",
      fileType: "pdf",
      loanType: "Car Loan",
      documentType: "Loan Agreement",
      lastModified: "2024-01-11T11:25:00Z",
      uploadedBy: "David Wilson",
      dateAdded: "2024-01-08T14:30:00Z",
      status: "verified"
    },
    {
      id: 6,
      fileName: "vehicle_rc.jpg",
      fileSize: "1.2 MB",
      fileType: "image",
      loanType: "Car Loan",
      documentType: "Vehicle RC",
      lastModified: "2024-01-10T16:45:00Z",
      uploadedBy: "Emily Brown",
      dateAdded: "2024-01-07T09:20:00Z",
      status: "verified"
    },
    {
      id: 7,
      fileName: "insurance_documents.pdf",
      fileSize: "2.1 MB",
      fileType: "pdf",
      loanType: "Car Loan",
      documentType: "Insurance",
      lastModified: "2024-01-09T13:15:00Z",
      uploadedBy: "David Wilson",
      dateAdded: "2024-01-06T11:10:00Z",
      status: "pending"
    },
    {
      id: 8,
      fileName: "income_proof_car.pdf",
      fileSize: "2.9 MB",
      fileType: "pdf",
      loanType: "Car Loan",
      documentType: "Income Proof",
      lastModified: "2024-01-08T10:30:00Z",
      uploadedBy: "Emily Brown",
      dateAdded: "2024-01-05T15:45:00Z",
      status: "verified"
    },

    // Personal Loan Documents
    {
      id: 9,
      fileName: "personal_loan_application.pdf",
      fileSize: "1.5 MB",
      fileType: "pdf",
      loanType: "Personal Loan",
      documentType: "Application Form",
      lastModified: "2024-01-07T14:20:00Z",
      uploadedBy: "Robert Taylor",
      dateAdded: "2024-01-04T12:30:00Z",
      status: "pending"
    },
    {
      id: 10,
      fileName: "aadhaar_card.jpg",
      fileSize: "0.8 MB",
      fileType: "image",
      loanType: "Personal Loan",
      documentType: "KYC Documents",
      lastModified: "2024-01-06T11:45:00Z",
      uploadedBy: "Robert Taylor",
      dateAdded: "2024-01-03T10:15:00Z",
      status: "verified"
    },
    {
      id: 11,
      fileName: "pan_card.jpg",
      fileSize: "0.7 MB",
      fileType: "image",
      loanType: "Personal Loan",
      documentType: "KYC Documents",
      lastModified: "2024-01-05T09:30:00Z",
      uploadedBy: "Robert Taylor",
      dateAdded: "2024-01-02T14:50:00Z",
      status: "verified"
    },
    {
      id: 12,
      fileName: "bank_statements_personal.pdf",
      fileSize: "3.8 MB",
      fileType: "pdf",
      loanType: "Personal Loan",
      documentType: "Financial Records",
      lastModified: "2024-01-04T16:25:00Z",
      uploadedBy: "Lisa Anderson",
      dateAdded: "2024-01-01T08:40:00Z",
      status: "pending"
    }
  ];

  // Filter documents based on active tab
  const filteredDocuments = documents.filter(doc => {
    if (activeTab === "all") return true;
    if (activeTab === "housing") return doc.loanType === "Housing Loan";
    if (activeTab === "car") return doc.loanType === "Car Loan";
    if (activeTab === "personal") return doc.loanType === "Personal Loan";
    if (activeTab === "verified") return doc.status === "verified";
    if (activeTab === "pending") return doc.status === "pending";
    return true;
  });

  // Load documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDocuments(mockDocuments);
      } catch (err) {
        setError('Failed to load documents');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedRows((prev) =>
      prev.length === filteredDocuments.length ? [] : filteredDocuments.map((doc) => doc.id)
    );
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Format file size
  const formatFileSize = (size) => {
    return size;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-800 bg-green-100";
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  // Get loan type color
  const getLoanTypeColor = (loanType) => {
    switch (loanType) {
      case "Housing Loan":
        return "bg-purple-100 text-purple-800";
      case "Car Loan":
        return "bg-blue-100 text-blue-800";
      case "Personal Loan":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get document type color
  const getDocumentTypeColor = (documentType) => {
    switch (documentType) {
      case "Application Form":
        return "bg-indigo-100 text-indigo-800";
      case "Income Proof":
        return "bg-pink-100 text-pink-800";
      case "Property Papers":
        return "bg-orange-100 text-orange-800";
      case "Financial Records":
        return "bg-teal-100 text-teal-800";
      case "Loan Agreement":
        return "bg-red-100 text-red-800";
      case "Vehicle RC":
        return "bg-cyan-100 text-cyan-800";
      case "Insurance":
        return "bg-amber-100 text-amber-800";
      case "KYC Documents":
        return "bg-lime-100 text-lime-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle document actions
  const handleDownload = (documentId) => {
    console.log('Download document:', documentId);
    // Implement download logic
  };

  const handlePreview = (documentId) => {
    console.log('Preview document:', documentId);
    // Implement preview logic
  };

  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      setSelectedRows(prev => prev.filter(id => id !== documentId));
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Loan Document Management</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading documents...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Loan Document Management</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error Loading Documents</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-[#2274A5] text-white rounded-lg hover:bg-[#7a0f9d] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Loan Document Management</h2>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Documents
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "housing"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("housing")}
              >
                Housing Loan
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "car"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("car")}
              >
                Car Loan
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "personal"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Loan
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "verified"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("verified")}
              >
                Verified
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "pending"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 text-gray-600" />
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
                      selectedRows.length === filteredDocuments.length && filteredDocuments.length > 0
                    }
                    onChange={toggleAllSelection}
                    className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  File Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  File Size
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Loan Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Document Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Last Modified
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Uploaded By
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date Added
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
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(document.id)}
                      onChange={() => toggleRowSelection(document.id)}
                      className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.fileType)}
                      <div>
                        <div className="font-medium text-gray-900">
                          {document.fileName}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {document.fileType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatFileSize(document.fileSize)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLoanTypeColor(document.loanType)}`}>
                      {document.loanType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(document.documentType)}`}>
                      {document.documentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(document.lastModified)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {document.uploadedBy}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(document.dateAdded)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(document.status)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}
                      >
                        {getStatusText(document.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handlePreview(document.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDownload(document.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>

                      {/* Three dots dropdown */}
                      <div className="relative">
                        <button
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          onClick={() => toggleDropdown(document.id)}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen === document.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handlePreview(document.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </button>
                              <button
                                onClick={() => handleDownload(document.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                              <button
                                onClick={() => console.log('Edit document:', document.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Details
                              </button>
                              <div className="border-t border-gray-200 my-1"></div>
                              <button
                                onClick={() => handleDelete(document.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No documents found</p>
              <p className="text-gray-400 mt-2">
                {activeTab === "all" 
                  ? "No documents have been uploaded yet." 
                  : `No ${activeTab} documents found.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredDocuments.length} of {documents.length} documents
              {selectedRows.length > 0 && (
                <span className="ml-2">
                  ({selectedRows.length} selected)
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