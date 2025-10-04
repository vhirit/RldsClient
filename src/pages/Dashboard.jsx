// src/pages/Dashboard.jsx (Updated)
import React, { useState, useEffect } from 'react';
import StatCard from '../components/cards/StatCard';
import VerificationStats from '../components/charts/VerificationStats';
import RecentActivity from '../components/cards/RecentActivity';
import QuickActions from '../components/cards/QuickActions';
import RevenueChart from '../components/charts/RevenueChart';
import ActivityChart from '../components/charts/ActivityChart';
import { dashboardStats } from '../data/mockData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Total Verifications', 
      value: dashboardStats.totalVerifications.toLocaleString(), 
      change: dashboardStats.change.verifications, 
      icon: '✅',
      color: 'blue'
    },
    { 
      title: 'Pending Requests', 
      value: dashboardStats.pendingRequests.toString(), 
      change: dashboardStats.change.pending, 
      icon: '⏳',
      color: 'amber'
    },
    { 
      title: 'Revenue', 
      value: `$${dashboardStats.revenue.toLocaleString()}`, 
      change: dashboardStats.change.revenue, 
      icon: '💰',
      color: 'green'
    },
    { 
      title: 'Success Rate', 
      value: `${dashboardStats.successRate}%`, 
      change: dashboardStats.change.successRate, 
      icon: '📈',
      color: 'purple'
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your verifications.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            {...stat} 
            delay={index * 100}
          />
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '400ms'}}>
        <div className="xl:col-span-2 space-y-6">
          <ActivityChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VerificationStats />
            <RevenueChart />
          </div>
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;