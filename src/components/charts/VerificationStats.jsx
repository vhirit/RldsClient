// src/components/charts/VerificationStats.jsx (Updated)
import React from 'react';

const VerificationStats = () => {
  const data = [
    { month: 'Jan', verified: 65, pending: 28, rejected: 7 },
    { month: 'Feb', verified: 78, pending: 22, rejected: 5 },
    { month: 'Mar', verified: 92, pending: 18, rejected: 4 },
    { month: 'Apr', verified: 84, pending: 24, rejected: 6 },
    { month: 'May', verified: 101, pending: 15, rejected: 3 },
    { month: 'Jun', verified: 115, pending: 12, rejected: 2 },
  ];

  const maxValue = Math.max(...data.map(d => d.verified + d.pending + d.rejected));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Verification Trends</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2 group">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-medium">
              <span>{item.month}</span>
              <span>Total: {item.verified + item.pending + item.rejected}</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden shadow-inner bg-gray-200 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 group-hover:brightness-110" 
                style={{ width: `${(item.verified / maxValue) * 100}%` }}
                title={`Verified: ${item.verified}`}
              />
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 group-hover:brightness-110" 
                style={{ width: `${(item.pending / maxValue) * 100}%` }}
                title={`Pending: ${item.pending}`}
              />
              <div 
                className="bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500 group-hover:brightness-110" 
                style={{ width: `${(item.rejected / maxValue) * 100}%` }}
                title={`Rejected: ${item.rejected}`}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span className="text-green-600">✅ {item.verified}</span>
              <span className="text-amber-600">⏳ {item.pending}</span>
              <span className="text-red-600">❌ {item.rejected}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStats;