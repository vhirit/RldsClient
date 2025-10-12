
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/features/auth/authSlice";
import { Bell, User, Settings, LogOut, Package, X, Shield, Verified, Clock } from "lucide-react";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Mock notifications - you can replace with real WebSocket notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      text: "Welcome to RLDS Platform", 
      time: "Just now", 
      read: false,
      type: "welcome"
    },
    { 
      id: 2, 
      text: "Your account is pending verification", 
      time: "5 min ago", 
      read: false,
      type: "verification"
    }
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'verified': { color: 'bg-green-100 text-green-800', text: 'Verified' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      'rejected': { color: 'bg-red-100 text-red-800', text: 'Rejected' },
      'not_started': { color: 'bg-gray-100 text-gray-800', text: 'Not Started' }
    };
    
    const config = statusConfig[status] || statusConfig['not_started'];
    return (
      <span className={`text-xs px-2 py-1 rounded ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'verification':
        return <Shield size={16} className="text-blue-500" />;
      case 'welcome':
        return <Verified size={16} className="text-green-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // If no user is logged in, don't show header
  if (!user) {
    return null;
  }

  return (
    <header className=" bg-white shadow p-4 flex justify-between items-center">
      {/* Left Side - Title */}
      <h1 className=" text-lg font-bold text-gray-800">
        Welcome , {user.firstName}!
      </h1>

      {/* Right Side - Icons and Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markNotificationAsRead(notification.id)}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 leading-tight">
                            {notification.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-gray-400" />
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-2 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2 font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center gap-2 p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-small hidden sm:block">
              {user.firstName}
            </span>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* User Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-small text-gray-900 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm font-small text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Verification Status</span>
                  {getStatusBadge(user.kycStatus || 'not_started')}
                </div>
              </div>

              {/* Account Info Section */}
              <div className="p-2 border-b border-gray-200">
                <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-700">
                  <Package size={16} />
                  <span>Account Information</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between px-2 py-1 text-sm hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Role</span>
                    <span className="text-gray-800 capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 text-sm hover:bg-gray-50 rounded">
                    <span className="text-gray-600">Phone</span>
                    <span className="text-gray-800">{user.phone || 'Not provided'}</span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex items-center justify-between px-2 py-1 text-sm hover:bg-gray-50 rounded">
                      <span className="text-gray-600">Last Login</span>
                      <span className="text-gray-800 text-xs">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2 space-y-1">
                <button className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <p className="text-xs text-gray-500 text-center">
                  RLDS Platform v2.1
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}