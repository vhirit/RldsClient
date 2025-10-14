 
// src/data/mockData.js
export const dashboardStats = {
  totalVerifications: 1248,
  pendingRequests: 84,
  revenue: 24580,
  successRate: 98.2,
  change: {
    verifications: '+12%',
    pending: '-5%',
    revenue: '+18%',
    successRate: '+2.3%'
  }
};

export const verificationRequests = [
  {
    id: 1,
    customerName: 'John Smith',
    bankName: 'City Bank',
    accountNumber: '****1234',
    amount: 25000,
    status: 'pending',
    date: '2024-01-15',
    priority: 'high'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    bankName: 'National Trust',
    accountNumber: '****5678',
    amount: 150000,
    status: 'approved',
    date: '2024-01-14',
    priority: 'medium'
  },
  {
    id: 3,
    customerName: 'Mike Brown',
    bankName: 'Global Finance',
    accountNumber: '****9012',
    amount: 75000,
    status: 'rejected',
    date: '2024-01-14',
    priority: 'low'
  },
  {
    id: 4,
    customerName: 'Emily Davis',
    bankName: 'Metro Bank',
    accountNumber: '****3456',
    amount: 50000,
    status: 'pending',
    date: '2024-01-13',
    priority: 'medium'
  },
  {
    id: 5,
    customerName: 'Robert Wilson',
    bankName: 'Union Bank',
    accountNumber: '****7890',
    amount: 120000,
    status: 'processing',
    date: '2024-01-13',
    priority: 'high'
  }
];

export const recentActivities = [
  {
    id: 1,
    type: 'verification',
    action: 'New verification request received',
    user: 'John Smith',
    time: '2 minutes ago',
    status: 'pending',
    icon: '📥'
  },
  {
    id: 2,
    type: 'approval',
    action: 'Verification approved',
    user: 'Sarah Johnson',
    time: '1 hour ago',
    status: 'completed',
    icon: '✅'
  },
  {
    id: 3,
    type: 'upload',
    action: 'Document uploaded',
    user: 'Mike Brown',
    time: '3 hours ago',
    status: 'processing',
    icon: '📄'
  },
  {
    id: 4,
    type: 'update',
    action: 'Profile information updated',
    user: 'System Admin',
    time: '1 day ago',
    status: 'info',
    icon: '⚙️'
  },
  {
    id: 5,
    type: 'maintenance',
    action: 'System maintenance completed',
    user: 'System',
    time: '2 days ago',
    status: 'maintenance',
    icon: '🔧'
  }
];

export const companyProfile = {
  basicInfo: {
    name: 'Bank Verification System Ltd.',
    email: 'admin@bankverify.com',
    phone: '+1 (555) 123-4567',
    address: '123 Financial District, New York, NY 10001',
    website: 'www.bankverify.com',
    registrationNumber: 'REG-2024-BV-001',
    taxId: 'TAX-987-654-321',
    establishedDate: '2020-03-15',
    employeeCount: '75',
    businessType: 'Financial Technology'
  },
  financials: {
    annualRevenue: 2920000,
    profitMargin: 80,
    growthRate: 25,
    monthlyAverage: 243333
  },
  documents: [
    {
      id: 1,
      name: 'Business License Certificate',
      type: 'license',
      uploadDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'approved',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Tax Compliance Certificate',
      type: 'tax',
      uploadDate: '2024-01-10',
      expiryDate: '2024-12-31',
      status: 'approved',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Bank Partnership Agreement',
      type: 'agreement',
      uploadDate: '2024-01-05',
      expiryDate: '2026-01-05',
      status: 'pending',
      size: '3.1 MB'
    }
  ]
};

export const analyticsData = {
  verificationTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    verified: [65, 78, 92, 84, 101, 115],
    pending: [28, 22, 18, 24, 15, 12],
    rejected: [7, 5, 4, 6, 3, 2]
  },
  revenueData: {
    monthly: [18500, 21200, 19800, 22400, 23800, 25800],
    quarterly: [59500, 68000],
    yearly: [189000, 215000, 248000, 292000]
  },
  performanceMetrics: {
    averageProcessingTime: 2.5,
    customerSatisfaction: 94.7,
    systemUptime: 99.9,
    fraudDetectionRate: 98.5
  }
};

export const systemSettings = {
  general: {
    companyName: 'Bank Verification System Ltd.',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'English'
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: ['192.168.1.0/24']
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    verificationAlerts: true,
    systemUpdates: true
  }
};

export const userManagement = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@bankverify.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    permissions: ['full_access']
  },
  {
    id: 2,
    name: 'Manager One',
    email: 'manager1@bankverify.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15 10:15',
    permissions: ['verification_approval', 'reports_view']
  },
  {
    id: 3,
    name: 'Operator One',
    email: 'operator1@bankverify.com',
    role: 'Operator',
    status: 'inactive',
    lastLogin: '2024-01-14 16:45',
    permissions: ['verification_processing']
  }
];

// Export all data as a single object for easy importing
export default {
  dashboardStats,
  verificationRequests,
  recentActivities,
  companyProfile,
  analyticsData,
  systemSettings,
  userManagement
};