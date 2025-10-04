// src/components/charts/ActivityChart.jsx (Updated)
import React, { useState } from 'react';

const ActivityChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const activityData = {
    week: [
      { day: 'Mon', verifications: 45, approvals: 38, rejections: 7 },
      { day: 'Tue', verifications: 52, approvals: 45, rejections: 7 },
      { day: 'Wed', verifications: 48, approvals: 42, rejections: 6 },
      { day: 'Thu', verifications: 61, approvals: 55, rejections: 6 },
      { day: 'Fri', verifications: 55, approvals: 49, rejections: 6 },
      { day: 'Sat', verifications: 32, approvals: 29, rejections: 3 },
      { day: 'Sun', verifications: 28, approvals: 26, rejections: 2 },
    ],
    month: [
      { week: 'Week 1', verifications: 210, approvals: 190, rejections: 20 },
      { week: 'Week 2', verifications: 245, approvals: 225, rejections: 20 },
      { week: 'Week 3', verifications: 268, approvals: 248, rejections: 20 },
      { week: 'Week 4', verifications: 292, approvals: 272, rejections: 20 },
    ],
    year: [
      { month: 'Jan', verifications: 980, approvals: 920, rejections: 60 },
      { month: 'Feb', verifications: 1120, approvals: 1050, rejections: 70 },
      { month: 'Mar', verifications: 1250, approvals: 1170, rejections: 80 },
      { month: 'Apr', verifications: 1180, approvals: 1100, rejections: 80 },
      { month: 'May', verifications: 1320, approvals: 1240, rejections: 80 },
      { month: 'Jun', verifications: 1280, approvals: 1200, rejections: 80 },
    ]
  };

  const currentData = activityData[timeRange];
  const maxValue = Math.max(...currentData.map(d => d.verifications));
  const labels = currentData.map(d => timeRange === 'week' ? d.day : timeRange === 'month' ? d.week : d.month);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verification Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your verification metrics over time</p>
        </div>
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-200 capitalize ${
                timeRange === range
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
          <span>{timeRange === 'week' ? 'Days' : timeRange === 'month' ? 'Weeks' : 'Months'}</span>
          <span>Verifications</span>
        </div>

        <div className="flex items-end space-x-3 h-48">
          {currentData.map((item, index) => {
            const totalHeight = 160; // Max height in pixels
            const verificationHeight = (item.verifications / maxValue) * totalHeight;
            const approvalHeight = (item.approvals / item.verifications) * verificationHeight;
            const rejectionHeight = verificationHeight - approvalHeight;

            return (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col-reverse h-40 w-full max-w-16 relative">
                  {/* Rejected bar */}
                  <div 
                    className="bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all duration-500 hover:from-red-600 hover:to-red-500 relative group"
                    style={{ height: `${rejectionHeight}px` }}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 z-10 whitespace-nowrap">
                        Rejected: {item.rejections}
                      </div>
                    )}
                  </div>
                  
                  {/* Approved bar */}
                  <div 
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-500 hover:from-green-600 hover:to-green-500 relative group"
                    style={{ height: `${approvalHeight}px` }}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 z-10 whitespace-nowrap">
                        Approved: {item.approvals}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center mt-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {labels[index]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.verifications}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Approved</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-400 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rejected</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;