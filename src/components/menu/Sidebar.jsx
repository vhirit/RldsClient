import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";
import {
  Home,
  FileText,
  Users,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  User,
  FolderOpen,
  PlusCircle,
  Split,
  List,
  Speech 
} from "lucide-react";
import RLDS_Logo from "../../assets/RLDS_Logo.svg";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) setIsFileOpen(false);
  };

  const toggleFileDropdown = () => {
    if (!isCollapsed) setIsFileOpen(!isFileOpen);
  };

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  // ✅ Only highlight the active link (no hover colors)
  const linkClasses = ({ isActive }) =>
    `flex items-center p-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500 shadow-sm"
        : "text-gray-600"
    } ${isCollapsed ? "justify-center" : ""}`;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <div
      className={`bg-white shadow-lg border-r border-gray-100 p-4 transition-all duration-300 ${sidebarWidth} relative flex flex-col h-screen`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all duration-200"
      >
        {isCollapsed ? (
          <ChevronsRight size={16} className="text-gray-600" />
        ) : (
          <ChevronsLeft size={16} className="text-gray-600" />
        )}
      </button>

      {/* Logo */}
      <div className={`flex mb-6 ${isCollapsed ? "px-0 justify-center" : "px-2"}`}>
        {!isCollapsed ? (
          <div className="w-full mx-auto">
            <img src={RLDS_Logo} alt="Logo" className="w-full h-12 object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">RR</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={linkClasses}>
          <div className="relative">
            <Home size={20} />
            {isCollapsed && (
              <span className="absolute -right-2 top-1 w-2 h-2 rounded-full bg-blue-600 hidden group-[.active]:block"></span>
            )}
          </div>
          {!isCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
        </NavLink>

        {/* File Section */}
        <div className="mb-2">
          <button
            onClick={toggleFileDropdown}
            className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 ${
              isCollapsed ? "justify-center" : "justify-between"
            } ${isFileOpen ? "text-gray-900" : "text-gray-600"}`}
          >
            <div className="flex items-center">
              <FolderOpen size={20} />
              {!isCollapsed && <span className="ml-3 font-medium">File</span>}
            </div>
            {!isCollapsed && (
              <ChevronsRight
                size={16}
                className={`text-gray-400 transform transition-all duration-200 ${
                  isFileOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            )}
          </button>

          {/* File Submenu */}
          {!isCollapsed && isFileOpen && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
              <NavLink
                to="/dashboard/kyc/documents"
                className={({ isActive }) =>
                  `flex items-center p-2 pl-3 rounded-lg transition-all duration-200 text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500"
                      : "text-gray-500"
                  }`
                }
              >
                <List size={16} className="mr-3" />
                Document List
              </NavLink>

              <NavLink
                to="/dashboard/kyc/document-create"
                className={({ isActive }) =>
                  `flex items-center p-2 pl-3 rounded-lg transition-all duration-200 text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500"
                      : "text-gray-500"
                  }`
                }
              >
                <PlusCircle size={16} className="mr-3" />
                Document Create
              </NavLink>
            </div>
          )}
        </div>

        {/* Invoice List */}
        <NavLink to="/dashboard/invoice-list" className={linkClasses}>
          <FileText size={20} />
          {!isCollapsed && <span className="ml-3 font-medium">Invoice List</span>}
        </NavLink>

        {/* Branch List */}
        <NavLink to="/dashboard/branches" className={linkClasses}>
          <Split size={20} />
          {!isCollapsed && <span className="ml-3 font-medium">Branch List</span>}
        </NavLink>
          {/* Source  */}
        <NavLink to="/dashboard/source" className={linkClasses}>
          <Speech  size={20} />
          {!isCollapsed && <span className="ml-3 font-medium">Source </span>}
        </NavLink>

        {/* User Management (Admin Only) */}
        {isAdmin && (
          <NavLink to="/dashboard/users" className={linkClasses}>
            <Users size={20} />
            {!isCollapsed && <span className="ml-3 font-medium">User Management</span>}
          </NavLink>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              {user?.firstName ? (
                <span className="text-white font-semibold text-sm">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            {!isCollapsed && user && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.firstName || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <p className="text-xs text-gray-400 truncate capitalize">{user.role}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-200"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

        {isCollapsed && (
          <div className="flex justify-center mt-3">
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-200"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Version Info */}
      {!isCollapsed && (
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-medium">v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">RLDS System</p>
        </div>
      )}
    </div>
  );
}
