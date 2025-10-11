
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Lazy load components to avoid circular dependencies
const DashboardLayout = React.lazy(() => import("../layouts/DashboardLayout"));
const Login = React.lazy(() => import("../Auth/Login"));
const Register = React.lazy(() => import("../Auth/Register"));
const ForgotPassword = React.lazy(() => import("../Auth/ForgotPassword"));
const DashboardHome = React.lazy(() => import("../pages/Dashboard/Index"));

// CORRECTED IMPORT PATH
const UserTable = React.lazy(() => import("../pages/user/userTable"));
const DocumentTable = React.lazy(() => import("../pages/document/document"));
const InvoiceList = React.lazy(() => import("../pages/invoice/invoiceList"));
const DocumentCreate = React.lazy(() => import("../pages/document/MultiStepForm"));
// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return !token ? children : <Navigate to="/dashboard" replace />;
};


export default function AppRouter() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } 
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<DashboardHome />} />
            
            {/* Only show users route for admin */}
            {user?.role === "admin" && (
              <Route path="users" element={<UserTable />} />
            )}
            
            <Route path="kyc/documents" element={<DocumentTable />} />
            <Route path="invoice-list" element={<InvoiceList />} />
            <Route path="kyc/document-create" element={<DocumentCreate />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}