// src/components/cards/RecentActivity.jsx (Updated)
import React from 'react';

const RecentActivity = () => {
  const activities = [
    { time: '2 min ago', action: 'New verification request', user: 'John Doe', status: 'pending' },
    { time: '1 hour ago', action: 'Verification completed', user: 'Sarah Smith', status: 'verified' },
    { time: '3 hours ago', action: 'Document uploaded', user: 'Mike Johnson', status: 'processing' },
    { time: '1 day ago', action: 'Profile updated', user: 'Company Admin', status: 'info' },
    { time: '2 days ago', action: 'System maintenance', user: 'System', status: 'maintenance' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      verified: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      info: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      maintenance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };
    return colors[status] || colors.info;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      verified: '✅',
      processing: '🔄',
      info: 'ℹ️',
      maintenance: '🔧',
    };
    return icons[status] || icons.info;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
              <span className="text-sm">{getStatusIcon(activity.status)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {activity.action}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {activity.user} • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;