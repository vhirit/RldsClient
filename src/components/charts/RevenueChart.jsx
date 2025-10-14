// src/components/charts/RevenueChart.jsx (Updated)
import React, { useState } from 'react';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('line');
  const [dataType, setDataType] = useState('monthly');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const revenueData = {
    monthly: [
      { month: 'Jan', revenue: 18500, profit: 14800, growth: 12 },
      { month: 'Feb', revenue: 21200, profit: 16960, growth: 15 },
      { month: 'Mar', revenue: 19800, profit: 15840, growth: 8 },
      { month: 'Apr', revenue: 22400, profit: 17920, growth: 13 },
      { month: 'May', revenue: 23800, profit: 19040, growth: 18 },
      { month: 'Jun', revenue: 25800, profit: 20640, growth: 22 },
    ],
    quarterly: [
      { quarter: 'Q1', revenue: 59500, profit: 47600, growth: 12 },
      { quarter: 'Q2', revenue: 68000, profit: 54400, growth: 18 },
    ],
    yearly: [
      { year: '2020', revenue: 189000, profit: 151200, growth: 8 },
      { year: '2021', revenue: 215000, profit: 172000, growth: 14 },
      { year: '2022', revenue: 248000, profit: 198400, growth: 19 },
      { year: '2023', revenue: 292000, profit: 233600, growth: 25 },
    ]
  };

  const data = revenueData[dataType];
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  // Calculate metrics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track revenue and profit trends</p>
        </div>
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['monthly', 'quarterly', 'yearly'].map((type) => (
            <button
              key={type}
              onClick={() => setDataType(type)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-200 capitalize ${
                dataType === type
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${(totalRevenue / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${(totalProfit / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Profit</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            +{averageGrowth.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Growth</div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {data.map((item, index) => {
          const revenuePercentage = (item.revenue / maxRevenue) * 100;
          const profitPercentage = (item.profit / item.revenue) * 100;

          return (
            <div 
              key={index} 
              className="space-y-2 transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">
                  {dataType === 'monthly' ? item.month : dataType === 'quarterly' ? item.quarter : item.year}
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +{item.growth}% growth
                </span>
              </div>

              {chartType === 'line' ? (
                // Line chart style
                <div className="relative">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700 rounded-full overflow-hidden"
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${revenuePercentage}%` }}
                    />
                  </div>
                  <div 
                    className="h-2 bg-gradient-to-r from-green-200 to-green-100 dark:from-green-800 dark:to-green-700 rounded-full overflow-hidden mt-1"
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                      style={{ width: `${profitPercentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                // Bar chart style
                <div className="flex space-x-1 h-10 items-end">
                  <div 
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded transition-all duration-500 relative group"
                    style={{ height: `${revenuePercentage}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded transition-all duration-500"
                      style={{ height: `${profitPercentage}%` }}
                    />
                    {hoveredIndex === index && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 z-10 whitespace-nowrap">
                        Revenue: ${item.revenue.toLocaleString()}
                        <br />
                        Profit: ${item.profit.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Revenue: ${item.revenue.toLocaleString()}</span>
                <span>Profit: ${item.profit.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart type toggle */}
      <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setChartType('line')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            chartType === 'line'
              ? 'bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            chartType === 'bar'
              ? 'bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Bar Chart
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Profit</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;