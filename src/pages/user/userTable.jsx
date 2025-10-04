
// import React, { useState, useEffect } from "react";
// import {
//   MoreVertical,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";

// export default function UserTable() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [alertMessage, setAlertMessage] = useState(null);
  
//   // Search and Filter state
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [verificationFilter, setVerificationFilter] = useState("all");
//   const [accessLevelFilter, setAccessLevelFilter] = useState("all");
//   const [showFilters, setShowFilters] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [limit] = useState(7);

//   const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8080';

//   // Show alert function
//   const showAlert = (message, type = "info") => {
//     setAlertMessage({ message, type });
//     // Auto hide after 5 seconds
//     setTimeout(() => {
//       setAlertMessage(null);
//     }, 5000);
//   };

//   // Fetch users from API with pagination
//   const fetchUsers = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch(
//         `${BACKEND_URL}/api/user/admin/users?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch users: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.success) {
//         setUsers(result.data.users);
//         setFilteredUsers(result.data.users); // Initialize filtered users
//         setTotalUsers(result.data.totalCount);
//         setTotalPages(result.data.pagination.pages);
//         setCurrentPage(result.data.pagination.page);
//       } else {
//         throw new Error(result.error || 'Failed to fetch users');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching users:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load users on component mount and when page changes
//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   // Apply filters and search whenever relevant state changes
//   useEffect(() => {
//     applyFilters();
//   }, [users, searchTerm, roleFilter, verificationFilter, accessLevelFilter]);

//   // Filter and search function
//   const applyFilters = () => {
//     let filtered = [...users];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(user => 
//         user.firstName?.toLowerCase().includes(term) ||
//         user.lastName?.toLowerCase().includes(term) ||
//         user.email?.toLowerCase().includes(term) ||
//         user.phone?.toLowerCase().includes(term) ||
//         `${user.firstName} ${user.lastName}`.toLowerCase().includes(term)
//       );
//     }

//     // Apply role filter
//     if (roleFilter !== "all") {
//       filtered = filtered.filter(user => user.role === roleFilter);
//     }

//     // Apply verification filter
//     if (verificationFilter !== "all") {
//       filtered = filtered.filter(user => user.kycStatus === verificationFilter);
//     }

//     // Apply access level filter
//     if (accessLevelFilter !== "all") {
//       const accessLevelMap = {
//         "Full Access": "admin",
//         "Limited Access": "verifier",
//         "Standard Access": "user"
//       };
//       filtered = filtered.filter(user => 
//         getAccessLevel(user) === accessLevelFilter
//       );
//     }

//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page when filters change
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setRoleFilter("all");
//     setVerificationFilter("all");
//     setAccessLevelFilter("all");
//   };

//   // Check if any filter is active
//   const hasActiveFilters = () => {
//     return searchTerm || roleFilter !== "all" || verificationFilter !== "all" || accessLevelFilter !== "all";
//   };

//   const toggleRowSelection = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const toggleAllSelection = () => {
//     setSelectedRows((prev) =>
//       prev.length === filteredUsers.length ? [] : filteredUsers.map((user) => user._id)
//     );
//   };

//   const toggleDropdown = (id) => {
//     setDropdownOpen(dropdownOpen === id ? null : id);
//   };

//   const handleVerificationAction = async (action, userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch(
//         `${BACKEND_URL}/api/user/admin/users/${userId}/verification`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ kycStatus: action })
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `Failed to update verification status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.success) {
//         // Update local state
//         setUsers(prevUsers => 
//           prevUsers.map(user => 
//             user._id === userId 
//               ? { ...user, kycStatus: action }
//               : user
//           )
//         );
        
//         // Show success alert based on action type
//         const alertMessages = {
//           verified: { message: "✅ User verification status updated to Verified. Email notification sent.", type: "success" },
//           rejected: { message: "❌ User verification status updated to Rejected. Email notification sent.", type: "error" },
//           pending: { message: "⏳ User verification status updated to Pending. Email notification sent.", type: "warning" },
//           hold: { message: "⏸️ User verification put on Hold. Email notification sent.", type: "warning" }
//         };
        
//         showAlert(alertMessages[action].message, alertMessages[action].type);
//         console.log(`User ${userId} verification status updated to ${action}`);
//       } else {
//         throw new Error(result.error || 'Failed to update verification status');
//       }
//     } catch (err) {
//       console.error('Error updating verification status:', err);
//       showAlert(`❌ Error: ${err.message}`, "error");
//     } finally {
//       setDropdownOpen(null);
//     }
//   };

//   // Pagination functions
//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     // Adjust start page if we're near the end
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }
    
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
    
//     return pages;
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getVerificationIcon = (status) => {
//     switch (status) {
//       case "verified":
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       case "not_started":
//         return <Clock className="w-4 h-4 text-gray-500" />;
//       case "hold":
//         return <AlertCircle className="w-4 h-4 text-orange-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getVerificationText = (status) => {
//     switch (status) {
//       case "verified":
//         return "Verified";
//       case "pending":
//         return "Pending";
//       case "rejected":
//         return "Rejected";
//       case "not_started":
//         return "Not Started";
//       case "hold":
//         return "On Hold";
//       default:
//         return status;
//     }
//   };

//   const getVerificationColor = (status) => {
//     switch (status) {
//       case "verified":
//         return "text-green-800 bg-green-100";
//       case "pending":
//         return "text-yellow-800 bg-yellow-100";
//       case "rejected":
//         return "text-red-800 bg-red-100";
//       case "not_started":
//         return "text-gray-800 bg-gray-100";
//       case "hold":
//         return "text-orange-800 bg-orange-100";
//       default:
//         return "text-gray-800 bg-gray-100";
//     }
//   };

//   const getRoleColor = (role) => {
//     switch (role) {
//       case "admin":
//         return "bg-purple-100 text-purple-800";
//       case "verifier":
//         return "bg-blue-100 text-blue-800";
//       case "user":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAccessLevel = (user) => {
//     if (user.role === 'admin') return 'Full Access';
//     if (user.role === 'verifier') return 'Limited Access';
//     return 'Standard Access';
//   };

//   const getAccessLevelColor = (accessLevel) => {
//     switch (accessLevel) {
//       case "Full Access":
//         return "bg-green-100 text-green-800";
//       case "Limited Access":
//         return "bg-yellow-100 text-yellow-800";
//       case "Standard Access":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get available actions based on current status
//   const getAvailableActions = (currentStatus) => {
//     const allActions = [
//       { value: "verified", label: "Mark as Verified", icon: CheckCircle, color: "text-green-700", bgColor: "hover:bg-green-50" },
//       { value: "rejected", label: "Mark as Rejected", icon: XCircle, color: "text-red-700", bgColor: "hover:bg-red-50" },
//       { value: "pending", label: "Mark as Pending", icon: Clock, color: "text-yellow-700", bgColor: "hover:bg-yellow-50" },
//       { value: "hold", label: "Put on Hold", icon: AlertCircle, color: "text-orange-700", bgColor: "hover:bg-orange-50" },
//     ];

//     // Hide the action that matches the current status
//     return allActions.filter(action => action.value !== currentStatus);
//   };

//   // Updated Alert Component with lighter colors
//   const Alert = ({ message, type = "info", onClose }) => {
//     const getAlertStyles = () => {
//       switch (type) {
//         case "success":
//           return {
//             bg: "bg-green-50 border border-green-200",
//             innerBg: "bg-green-100",
//             badge: "bg-green-500 text-white",
//             text: "text-green-800",
//             icon: "✅",
//             badgeText: "Success"
//           };
//         case "error":
//           return {
//             bg: "bg-red-50 border border-red-200",
//             innerBg: "bg-red-100",
//             badge: "bg-red-500 text-white",
//             text: "text-red-800",
//             icon: "❌",
//             badgeText: "Error"
//           };
//         case "warning":
//           return {
//             bg: "bg-yellow-50 border border-yellow-200",
//             innerBg: "bg-yellow-100",
//             badge: "bg-yellow-500 text-white",
//             text: "text-yellow-800",
//             icon: "⏸️",
//             badgeText: "Warning"
//           };
//         case "info":
//         default:
//           return {
//             bg: "bg-blue-50 border border-blue-200",
//             innerBg: "bg-blue-100",
//             badge: "bg-blue-500 text-white",
//             text: "text-blue-800",
//             icon: "ℹ️",
//             badgeText: "Info"
//           };
//       }
//     };

//     const styles = getAlertStyles();

//     return (
//       <div className={`${styles.bg} text-center py-4 lg:px-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-96 max-w-lg rounded-lg shadow-lg`}>
//         <div className={`p-3 ${styles.innerBg} items-center ${styles.text} leading-none rounded-full flex lg:inline-flex`} role="alert">
//           <span className={`flex rounded-full ${styles.badge} uppercase px-3 py-1 text-xs font-bold mr-3`}>
//             {styles.badgeText}
//           </span>
//           <span className="font-semibold mr-2 text-left flex-auto flex items-center">
//             <span className="mr-2">{styles.icon}</span>
//             {message}
//           </span>
//           <button 
//             onClick={onClose}
//             className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//           >
           
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Alternative Alert Component with even lighter design (closer to verification badges)
//   const LightAlert = ({ message, type = "info", onClose }) => {
//     const getAlertStyles = () => {
//       switch (type) {
//         case "success":
//           return {
//             bg: "bg-green-100 border border-green-300",
//             text: "text-green-800",
//             icon: "✅",
//             badge: "bg-green-200 text-green-800"
//           };
//         case "error":
//           return {
//             bg: "bg-red-100 border border-red-300",
//             text: "text-red-800",
//             icon: "❌",
//             badge: "bg-red-200 text-red-800"
//           };
//         case "warning":
//           return {
//             bg: "bg-yellow-100 border border-yellow-300",
//             text: "text-yellow-800",
//             icon: "⏳",
//             badge: "bg-yellow-200 text-yellow-800"
//           };
//         case "info":
//         default:
//           return {
//             bg: "bg-blue-100 border border-blue-300",
//             text: "text-blue-800",
//             icon: "ℹ️",
//             badge: "bg-blue-200 text-blue-800"
//           };
//       }
//     };

//     const styles = getAlertStyles();

//     return (
//       <div className={`${styles.bg} rounded-lg p-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-96 max-w-lg shadow-lg`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
//               <span className="mr-2">{styles.icon}</span>
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </span>
//             <span className={`font-medium ${styles.text}`}>
//               {message}
//             </span>
//           </div>
//           <button 
//             onClick={onClose}
//             className="p-1 hover:bg-white rounded-full transition-colors"
//           >
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">User Management</h2>
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-600">Loading users...</div>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">User Management</h2>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <h3 className="text-red-800 font-semibold">Error Loading Users</h3>
//           <p className="text-red-600 mt-1">{error}</p>
//           <button
//             onClick={() => fetchUsers(currentPage)}
//             className="mt-3 px-4 py-2 bg-[#2274A5] text-white rounded-lg hover:bg-[#7a0f9d] transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Alert Component - Using the LightAlert version */}
//       {alertMessage && (
//         <LightAlert 
//           message={alertMessage.message} 
//           type={alertMessage.type}
//           onClose={() => setAlertMessage(null)}
//         />
//       )}

//       <h2 className="text-2xl font-semibold mb-6">User Management</h2>

//       {/* Table Section */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         {/* Table Header */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex space-x-2">
//               <button
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   activeTab === "all"
//                     ? "bg-[#2274A5] text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 onClick={() => setActiveTab("all")}
//               >
//                 All Division
//               </button>
//               <button
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   activeTab === "my"
//                     ? "bg-[#2274A5] text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 onClick={() => setActiveTab("my")}
//               >
//                 My Division
//               </button>
//             </div>

//             <div className="flex items-center space-x-3">
//               {/* Search Input */}
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search name, email, phone..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent w-64"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Filter Toggle Button */}
//               <button 
//                 className={`p-2 border rounded-lg transition-colors ${
//                   showFilters || hasActiveFilters()
//                     ? "border-[#2274A5] bg-[#2274A5] text-white"
//                     : "border-gray-300 text-gray-600 hover:bg-gray-50"
//                 }`}
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter className="w-4 h-4" />
//               </button>

//               <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <Download className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Filter Dropdown Section */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-medium text-gray-700">Filters</h3>
//                 {hasActiveFilters() && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-sm text-[#2274A5] hover:text-[#7a0f9d] font-medium"
//                   >
//                     Clear all
//                   </button>
//                 )}
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Role Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Role
//                   </label>
//                   <select
//                     value={roleFilter}
//                     onChange={(e) => setRoleFilter(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
//                   >
//                     <option value="all">All Roles</option>
//                     <option value="admin">Admin</option>
//                     <option value="verifier">Verifier</option>
//                     <option value="user">User</option>
//                   </select>
//                 </div>

//                 {/* Verification Status Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Verification Status
//                   </label>
//                   <select
//                     value={verificationFilter}
//                     onChange={(e) => setVerificationFilter(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="verified">Verified</option>
//                     <option value="pending">Pending</option>
//                     <option value="rejected">Rejected</option>
//                     <option value="not_started">Not Started</option>
//                     <option value="hold">On Hold</option>
//                   </select>
//                 </div>

//                 {/* Access Level Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Access Level
//                   </label>
//                   <select
//                     value={accessLevelFilter}
//                     onChange={(e) => setAccessLevelFilter(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
//                   >
//                     <option value="all">All Access Levels</option>
//                     <option value="Full Access">Full Access</option>
//                     <option value="Limited Access">Limited Access</option>
//                     <option value="Standard Access">Standard Access</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Active Filters Badges */}
//               {hasActiveFilters() && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {searchTerm && (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                       Search: "{searchTerm}"
//                       <button
//                         onClick={() => setSearchTerm("")}
//                         className="ml-1 hover:text-blue-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   )}
//                   {roleFilter !== "all" && (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
//                       Role: {roleFilter}
//                       <button
//                         onClick={() => setRoleFilter("all")}
//                         className="ml-1 hover:text-purple-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   )}
//                   {verificationFilter !== "all" && (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
//                       Status: {getVerificationText(verificationFilter)}
//                       <button
//                         onClick={() => setVerificationFilter("all")}
//                         className="ml-1 hover:text-yellow-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   )}
//                   {accessLevelFilter !== "all" && (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                       Access: {accessLevelFilter}
//                       <button
//                         onClick={() => setAccessLevelFilter("all")}
//                         className="ml-1 hover:text-green-600"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="px-6 py-4 text-left">
//                   <input
//                     type="checkbox"
//                     checked={
//                       selectedRows.length === filteredUsers.length && filteredUsers.length > 0
//                     }
//                     onChange={toggleAllSelection}
//                     className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
//                   />
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Role
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Phone
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Access Level
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Verification
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Date Added
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Last Login
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(user._id)}
//                         onChange={() => toggleRowSelection(user._id)}
//                         className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">
//                         {user.firstName} {user.lastName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
//                         {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{user.phone}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelColor(getAccessLevel(user))}`}>
//                         {getAccessLevel(user)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-2">
//                         {getVerificationIcon(user.kycStatus)}
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationColor(user.kycStatus)}`}
//                         >
//                           {getVerificationText(user.kycStatus)}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {formatDate(user.createdAt)}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {formatDate(user.lastLogin)}
//                     </td>
//                     <td className="px-6 py-4 relative">
//                       <div className="flex items-center space-x-2">
//                         <button className="p-1 hover:bg-gray-100 rounded transition-colors">
//                           <Eye className="w-4 h-4 text-gray-600" />
//                         </button>
//                         <button className="p-1 hover:bg-gray-100 rounded transition-colors">
//                           <Edit className="w-4 h-4 text-gray-600" />
//                         </button>

//                         {/* Three dots dropdown */}
//                         <div className="relative">
//                           <button
//                             className="p-1 hover:bg-gray-100 rounded transition-colors"
//                             onClick={() => toggleDropdown(user._id)}
//                           >
//                             <MoreVertical className="w-4 h-4 text-gray-600" />
//                           </button>

//                           {/* Dropdown Menu */}
//                           {dropdownOpen === user._id && (
//                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//                               <div className="py-1">
//                                 {/* Dynamic verification actions */}
//                                 {getAvailableActions(user.kycStatus).map((action) => {
//                                   const IconComponent = action.icon;
//                                   return (
//                                     <button
//                                       key={action.value}
//                                       onClick={() => handleVerificationAction(action.value, user._id)}
//                                       className={`flex items-center w-full px-4 py-2 text-sm ${action.color} ${action.bgColor}`}
//                                     >
//                                       <IconComponent className="w-4 h-4 mr-2" />
//                                       {action.label}
//                                     </button>
//                                   );
//                                 })}
                                
//                                 <div className="border-t border-gray-200 my-1"></div>
//                                 <button
//                                   onClick={() => console.log('Delete user:', user._id)}
//                                   className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
//                                 >
//                                   <Trash2 className="w-4 h-4 mr-2" />
//                                   Delete User
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10" className="px-6 py-8 text-center">
//                     <div className="text-gray-500">
//                       {hasActiveFilters() ? "No users match your filters" : "No users found"}
//                     </div>
//                     {hasActiveFilters() && (
//                       <button
//                         onClick={clearAllFilters}
//                         className="mt-2 text-[#2274A5] hover:text-[#7a0f9d] font-medium"
//                       >
//                         Clear all filters
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer with Pagination */}
//         <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="text-sm text-gray-600">
//               Showing {filteredUsers.length} of {totalUsers} entries
//               {hasActiveFilters() && " (filtered)"}
//             </div>
            
//             {/* Pagination Controls */}
//             {filteredUsers.length > 0 && (
//               <div className="flex items-center space-x-1">
//                 {/* Previous Button */}
//                 <button
//                   onClick={goToPreviousPage}
//                   disabled={currentPage === 1}
//                   className={`p-2 rounded-lg text-sm transition-colors ${
//                     currentPage === 1
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-gray-600 hover:bg-gray-100 border border-gray-300"
//                   }`}
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>

//                 {/* Page Numbers */}
//                 {getPageNumbers().map((pageNum) => (
//                   <button
//                     key={pageNum}
//                     onClick={() => goToPage(pageNum)}
//                     className={`px-3 py-1 rounded-lg text-sm transition-colors ${
//                       currentPage === pageNum
//                         ? "bg-[#2274A5] text-white"
//                         : "border border-gray-300 text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     {pageNum}
//                 </button>
//                 ))}

//                 {/* Next Button */}
//                 <button
//                   onClick={goToNextPage}
//                   disabled={currentPage === totalPages}
//                   className={`p-2 rounded-lg text-sm transition-colors ${
//                     currentPage === totalPages
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-gray-600 hover:bg-gray-100 border border-gray-300"
//                   }`}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
    // Don't reset currentPage here to avoid infinite re-renders
  };

  // Clear all filters and reset to first page
  const clearAllFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setVerificationFilter("all");
    setAccessLevelFilter("all");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return searchTerm || roleFilter !== "all" || verificationFilter !== "all" || accessLevelFilter !== "all";
  };

  // Enhanced pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // If we have active filters, we need to fetch new data with the page
      if (hasActiveFilters()) {
        // For client-side filtering, we just update the page
        // For server-side filtering, you would need to pass filters to the API
        console.log(`Navigating to page ${page} with filters`);
      }
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

  // Generate page numbers for pagination - improved logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
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
      // For filtered results, show client-side filtered count
      return `${filteredUsers.length} of ${totalUsers} entries (filtered)`;
    } else {
      // For unfiltered results, show paginated count
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
        return "text-green-800 bg-green-100";
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      case "rejected":
        return "text-red-800 bg-red-100";
      case "not_started":
        return "text-gray-800 bg-gray-100";
      case "hold":
        return "text-orange-800 bg-orange-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "verifier":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        return "bg-green-100 text-green-800";
      case "Limited Access":
        return "bg-yellow-100 text-yellow-800";
      case "Standard Access":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // LightAlert Component (keep your existing implementation)
  const LightAlert = ({ message, type = "info", onClose }) => {
    const getAlertStyles = () => {
      switch (type) {
        case "success":
          return {
            bg: "bg-green-100 border border-green-300",
            text: "text-green-800",
            icon: "✅",
            badge: "bg-green-200 text-green-800"
          };
        case "error":
          return {
            bg: "bg-red-100 border border-red-300",
            text: "text-red-800",
            icon: "❌",
            badge: "bg-red-200 text-red-800"
          };
        case "warning":
          return {
            bg: "bg-yellow-100 border border-yellow-300",
            text: "text-yellow-800",
            icon: "⏳",
            badge: "bg-yellow-200 text-yellow-800"
          };
        case "info":
        default:
          return {
            bg: "bg-blue-100 border border-blue-300",
            text: "text-blue-800",
            icon: "ℹ️",
            badge: "bg-blue-200 text-blue-800"
          };
      }
    };

    const styles = getAlertStyles();

    return (
      <div className={`${styles.bg} rounded-lg p-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-96 max-w-lg shadow-lg`}>
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
            className="p-1 hover:bg-white rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">User Management</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">User Management</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error Loading Users</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <button
            onClick={() => fetchUsers(currentPage)}
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
      {/* Alert Component */}
      {alertMessage && (
        <LightAlert 
          message={alertMessage.message} 
          type={alertMessage.type}
          onClose={() => setAlertMessage(null)}
        />
      )}

      <h2 className="text-2xl font-semibold mb-6">User Management</h2>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Division
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "my"
                    ? "bg-[#2274A5] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("my")}
              >
                My Division
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent w-64"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button */}
              <button 
                className={`p-2 border rounded-lg transition-colors ${
                  showFilters || hasActiveFilters()
                    ? "border-[#2274A5] bg-[#2274A5] text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </button>

              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Dropdown Section */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Filters</h3>
                {hasActiveFilters() && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#2274A5] hover:text-[#7a0f9d] font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="verifier">Verifier</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Verification Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Status
                  </label>
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Access Level
                  </label>
                  <select
                    value={accessLevelFilter}
                    onChange={(e) => setAccessLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2274A5] focus:border-transparent"
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
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {roleFilter !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      Role: {roleFilter}
                      <button
                        onClick={() => setRoleFilter("all")}
                        className="ml-1 hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {verificationFilter !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Status: {getVerificationText(verificationFilter)}
                      <button
                        onClick={() => setVerificationFilter("all")}
                        className="ml-1 hover:text-yellow-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {accessLevelFilter !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Access: {accessLevelFilter}
                      <button
                        onClick={() => setAccessLevelFilter("all")}
                        className="ml-1 hover:text-green-600"
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
                    className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Access Level
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Verification
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date Added
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user._id)}
                        onChange={() => toggleRowSelection(user._id)}
                        className="w-4 h-4 text-[#2274A5] bg-gray-100 border-gray-300 rounded focus:ring-[#2274A5]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelColor(getAccessLevel(user))}`}>
                        {getAccessLevel(user)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getVerificationIcon(user.kycStatus)}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationColor(user.kycStatus)}`}
                        >
                          {getVerificationText(user.kycStatus)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 relative">
                      <div className="flex items-center space-x-2">
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
                            onClick={() => toggleDropdown(user._id)}
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>

                          {/* Dropdown Menu */}
                          {dropdownOpen === user._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                              <div className="py-1">
                                {/* Dynamic verification actions */}
                                {getAvailableActions(user.kycStatus).map((action) => {
                                  const IconComponent = action.icon;
                                  return (
                                    <button
                                      key={action.value}
                                      onClick={() => handleVerificationAction(action.value, user._id)}
                                      className={`flex items-center w-full px-4 py-2 text-sm ${action.color} ${action.bgColor}`}
                                    >
                                      <IconComponent className="w-4 h-4 mr-2" />
                                      {action.label}
                                    </button>
                                  );
                                })}
                                
                                <div className="border-t border-gray-200 my-1"></div>
                                <button
                                  onClick={() => console.log('Delete user:', user._id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
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
                  <td colSpan="10" className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      {hasActiveFilters() ? "No users match your filters" : "No users found"}
                    </div>
                    {hasActiveFilters() && (
                      <button
                        onClick={clearAllFilters}
                        className="mt-2 text-[#2274A5] hover:text-[#7a0f9d] font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
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
              <div className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      currentPage === pageNum
                        ? "bg-[#2274A5] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 border border-gray-300"
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
  );
}