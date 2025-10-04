
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice"; // Update with your actual path
import { 
  Home, 
  FileText, 
  Wallet, 
  Users, 
  FileSignature, 
  CreditCard,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  BanknoteIcon,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import logo from "../../assets/RLDS_Logo.svg";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isKycOpen, setIsKycOpen] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsKycOpen(false);
    }
  };

  const toggleKycDropdown = () => {
    if (!isCollapsed) {
      setIsKycOpen(!isKycOpen);
    }
  };

  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  const linkClasses = ({ isActive }) => 
    `flex items-center p-2 rounded transition-all ${
      isActive 
        ? "bg-white bg-opacity-20 text-white" 
        : "hover:bg-white hover:bg-opacity-10 text-white"
    } ${isCollapsed ? "justify-center" : ""}`;

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={`bg-[#074799] shadow-md p-4 transition-all duration-300 ${sidebarWidth} relative flex flex-col h-screen`}>
      {/* Toggle Button - Top Right */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <Menu size={12} className="text-gray-600" />
        ) : (
          <X size={18} className="text-gray-600" />
        )}
      </button>

      {/* Logo Section */}
      <div className={`flex  mb-3 ${isCollapsed ? "px-0" : "px-2"}`}>
        {!isCollapsed ? (
          <div className="  bg-white">
            <div className=" mx-auto">
              <img src={logo} alt="Logo" className="w-full h-8 object-cover" />
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RR</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white border-opacity-20 mb-6"></div>

      {/* Navigation - Main Content */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClasses}>
          <Home size={20} className="text-white" />
          {!isCollapsed && <span className="ml-3">Dashboard</span>}
        </NavLink>

        {/* KYC Settings with Dropdown */}
        <div className="mb-2">
          <button
            onClick={toggleKycDropdown}
            className={`flex items-center w-full p-2 rounded transition-all hover:bg-white hover:bg-opacity-10 text-white ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center">
              <Shield size={20} className="text-white" />
              {!isCollapsed && <span className="ml-3 font-medium">File</span>}
            </div>
            {!isCollapsed && (
              isKycOpen ? (
                <ChevronDown size={20} className="text-white text-opacity-70" />
              ) : (
                <ChevronRight size={20} className="text-white text-opacity-70" />
              )
            )}
          </button>
          
          {/* Submenu Items */}
          {!isCollapsed && isKycOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink 
                to="/dashboard/kyc/documents" 
                className={({ isActive }) => 
                  `flex items-center p-2 text-sm rounded transition-all ${
                    isActive 
                      ? "bg-white bg-opacity-20 text-white" 
                      : "text-white text-opacity-80 hover:bg-white hover:bg-opacity-10"
                  }`
                }
              >
                <FileText size={20} className="mr-2 text-white" />
                Document Lsit
              </NavLink>
              <NavLink 
                to="/dashboard/kyc/document-create" 
                className={({ isActive }) => 
                  `flex items-center p-2 text-sm rounded transition-all ${
                    isActive 
                      ? "bg-white bg-opacity-20 text-white" 
                      : "text-white text-opacity-80 hover:bg-white hover:bg-opacity-10"
                  }`
                }
              >
                <FileText size={20} className="mr-2 text-white" />
                Document Create
              </NavLink>
            </div>
          )}
        </div>

        {/* Other navigation items */}
        {/* <NavLink to="/dashboard/wallet" className={linkClasses}>
          <Wallet size={20} className="text-white" />
          {!isCollapsed && <span className="ml-3">Wallet</span>}
        </NavLink> */}

        <NavLink to="/dashboard/invoice-list" className={linkClasses}>
          <FileText size={20} className="text-white" />
          {!isCollapsed && <span className="ml-3">Invoice List</span>}6
        </NavLink>

        {/* User Management - Only show for admin users */}
        {isAdmin && (
          <NavLink to="/dashboard/users" className={linkClasses}>
            <Users size={20} className="text-white" />
            {!isCollapsed && <span className="ml-3">User Management</span>}
          </NavLink>
        )}

        {/* <NavLink to="/dashboard/contract" className={linkClasses}>
          <FileSignature size={20} className="text-white" />
          {!isCollapsed && <span className="ml-3">Contract</span>}
        </NavLink>

        <NavLink to="/dashboard/payment" className={linkClasses}>
          <CreditCard size={20} className="text-white" />
          {!isCollapsed && <span className="ml-3">Payment</span>}
        </NavLink> */}
      </nav>

      {/* User Section - Bottom */}
      <div className="border-t border-white border-opacity-20 pt-4 mt-4">
        {/* User Info */}
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            {/* User Avatar */}
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            
            {/* User Details - Only show when expanded */}
            {!isCollapsed && user && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.firstName || user.email}
                </p>
                <p className="text-xs text-white text-opacity-70 truncate">
                  {user.email}
                </p>
                {/* Display user role for clarity */}
                <p className="text-xs text-white text-opacity-50 truncate">
                  {user.role}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button - Only show when expanded */}
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Collapsed State Logout Button */}
        {isCollapsed && (
          <div className="flex justify-center mt-3">
            <button
              onClick={handleLogout}
              className="p-2 text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}