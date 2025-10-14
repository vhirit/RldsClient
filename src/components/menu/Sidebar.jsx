
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";
import { brandGradients } from '../../config/gradients';
import { 
  Home, 
  FileText, 
  Wallet, 
  Users, 
  FileSignature, 
  CreditCard,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  User,
  FolderOpen,
  PlusCircle,
  List
} from "lucide-react";
import logo from "../../assets/RLDS_Logo.svg";
import RLDS_Logo from '../../assets/RLDS_Logo.svg';
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsFileOpen(false);
    }
  };

  const toggleFileDropdown = () => {
    if (!isCollapsed) {
      setIsFileOpen(!isFileOpen);
    }
  };

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  
  const linkClasses = ({ isActive }) => 
    `flex items-center p-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500 shadow-sm" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
    } ${isCollapsed ? "justify-center" : ""}`;

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className={`bg-white shadow-lg border-r border-gray-100 p-4 transition-all duration-300 ${sidebarWidth} relative flex flex-col h-screen`}>
      {/* Toggle Button - Top Right */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
      >
        {isCollapsed ? (
          <ChevronsRight size={16} className="text-gray-600" />
        ) : (
          <ChevronsLeft size={16} className="text-gray-600" />
        )}
      </button>

      {/* Logo Section */}
      <div className={`flex mb-6 ${isCollapsed ? "px-0 justify-center" : "px-2"}`}>
        {!isCollapsed ? (
          <div className="w-full">
            <div className="mx-auto">
              {/* <img src={logo} alt="Logo" className="w-full h-8 object-contain" /> */}
              <img src={RLDS_Logo} alt="Logo" className="w-full h-12 object-contain"/>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">RR</span>
          </div>
        )}
      </div>

      {/* Navigation - Main Content */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClasses}>
          <div className="relative">
            <Home size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 font-medium group-hover:translate-x-1 transition-transform duration-200">
              Dashboard
            </span>
          )}
        </NavLink>

        {/* File Section with Dropdown */}
        <div className="mb-2">
          <button
            onClick={toggleFileDropdown}
            className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 ${
              isCollapsed ? "justify-center" : "justify-between"
            } ${isFileOpen ? "bg-gray-50 text-gray-900" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <FolderOpen size={20} className="group-hover:scale-110 transition-transform duration-200" />
              {!isCollapsed && <span className="ml-3 font-medium">File</span>}
            </div>
            {!isCollapsed && (
              <ChevronsRight 
                size={16} 
                className={`text-gray-400 group-hover:text-gray-600 transition-all duration-200 transform ${
                  isFileOpen ? "rotate-90" : "rotate-0"
                }`} 
              />
            )}
          </button>
          
          {/* Submenu Items */}
          {!isCollapsed && isFileOpen && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
              <NavLink 
                to="/dashboard/kyc/documents" 
                className={({ isActive }) => 
                  `flex items-center p-2 pl-3 rounded-lg transition-all duration-200 group text-sm ${
                    isActive 
                      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`
                }
              >
                <List size={16} className="mr-3 group-hover:scale-110 transition-transform duration-200" />
                Document List
              </NavLink>
              <NavLink 
                to="/dashboard/kyc/document-create" 
                className={({ isActive }) => 
                  `flex items-center p-2 pl-3 rounded-lg transition-all duration-200 group text-sm ${
                    isActive 
                      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`
                }
              >
                <PlusCircle size={16} className="mr-3 group-hover:scale-110 transition-transform duration-200" />
                Document Create
              </NavLink>
            </div>
          )}
        </div>

        {/* Invoice List */}
        <NavLink to="/dashboard/invoice-list" className={linkClasses}>
          <div className="relative">
            <FileText size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 font-medium group-hover:translate-x-1 transition-transform duration-200">
              Invoice List
            </span>
          )}
        </NavLink>

        {/* User Management - Only show for admin users */}
        {isAdmin && (
          <NavLink to="/dashboard/users" className={linkClasses}>
            <div className="relative">
              <Users size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-medium group-hover:translate-x-1 transition-transform duration-200">
                User Management
              </span>
            )}
          </NavLink>
        )}

       
      </nav>

      {/* User Section - Bottom */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        {/* User Info */}
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              {user?.firstName ? (
                <span className="text-white font-semibold text-sm">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            
            {/* User Details - Only show when expanded */}
            {!isCollapsed && user && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.firstName || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 truncate capitalize">
                  {user.role}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button - Only show when expanded */}
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              title="Logout"
            >
              <LogOut size={18} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
          )}
        </div>

        {/* Collapsed State Logout Button */}
        {isCollapsed && (
          <div className="flex justify-center mt-3">
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              title="Logout"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* Version Info - Bottom */}
      {!isCollapsed && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-medium">v1.0.0</p>
            <p className="text-xs text-gray-400 mt-1">RLDS System</p>
          </div>
        </div>
      )}
    </div>
  );
}