// src/components/cards/QuickActions.jsx (Updated)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: '🏢', label: 'Update Profile', description: 'Edit company information', action: () => navigate('/company-profile'), color: 'blue' },
    { icon: '✅', label: 'Process Requests', description: 'Handle pending verifications', action: () => navigate('/verification-requests'), color: 'green' },
    { icon: '📊', label: 'View Reports', description: 'Generate analytics reports', action: () => navigate('/analytics'), color: 'purple' },
    { icon: '⚙️', label: 'Settings', description: 'System configuration', action: () => navigate('/settings'), color: 'gray' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
              bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 dark:from-gray-700 dark:to-gray-800
              border-${action.color}-200 dark:border-gray-600 hover:border-${action.color}-300`}
          >
            <span className="text-2xl mb-2">{action.icon}</span>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white text-sm">{action.label}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;