 
// src/pages/CompanyProfile.jsx
import React, { useState } from 'react';
import CompanyProfileForm from '../components/forms/CompanyProfileForm';
import FileUpload from '../components/forms/FileUpload';

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const companyData = {
    name: 'Bank Verification System Ltd.',
    email: 'admin@bankverify.com',
    phone: '+1 (555) 123-4567',
    address: '123 Financial District, New York, NY 10001',
    registration: 'REG-2024-BV-001',
    established: '2020',
    employees: '50-100',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your company information and documents</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['profile', 'documents', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'profile' && <CompanyProfileForm data={companyData} />}
        {activeTab === 'documents' && <FileUpload />}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Settings</h3>
            {/* Add settings form here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;