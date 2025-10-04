
import React from "react";
import { 
  FileText, 
  BadgeCheck, 
  Users, 
  DollarSign,
  PieChart,
  TrendingUp
} from "lucide-react";

export default function DashboardHome() {
  const cardData = [
    {
      title: "Total Document",
      count: "1,234",
      percent: "+12%",
      icon: FileText,
      description: "icon number count"
    },
    {
      title: "Total Verified",
      count: "892",
      percent: "+8%",
      icon: BadgeCheck,
      description: "icon number count"
    },
    {
      title: "Total Contract User",
      count: "567",
      percent: "+5%",
      icon: Users,
      description: "icon number count"
    },
    {
      title: "Revenue",
      count: "$45,678",
      percent: "+23%",
      icon: DollarSign,
      description: "icon number count"
    }
  ];

  const bankDisbursement = [
    { name: "SBI Bank", documents: 4546 },
    { name: "CSB Bank", documents: 3241 },
    { name: "Union Bank", documents: 2873 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Welcome to Dashboard</h2>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-[#2274A5] mb-1">
                    {card.count}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {card.description}
                  </p>
                  <div className="flex items-center">
                    <span className="text-[#2274A5] text-sm font-medium">
                      {card.percent}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">precent</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">
                  <IconComponent className="w-6 h-6 text-[#2274A5]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Charts */}
        <div className="space-y-6">
          {/* Recent Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Distribution</h3>
              <PieChart className="w-5 h-5 text-[#2274A5]" />
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-8 border-[#2274A5] border-t-gray-300 border-r-gray-300 animate-spin-slow mx-auto mb-4"></div>
                <p className="text-gray-600">Distribution Chart Visualization</p>
              </div>
            </div>
          </div>

          {/* Profit Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Profit Chart</h3>
              <TrendingUp className="w-5 h-5 text-[#2274A5]" />
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-end justify-center space-x-2 mb-4">
                  <div className="w-6 bg-gray-300 h-16 rounded-t"></div>
                  <div className="w-6 bg-[#2274A5] h-24 rounded-t"></div>
                  <div className="w-6 bg-gray-300 h-20 rounded-t"></div>
                  <div className="w-6 bg-[#2274A5] h-28 rounded-t"></div>
                  <div className="w-6 bg-gray-300 h-18 rounded-t"></div>
                </div>
                <p className="text-gray-600">Profit Growth Visualization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Bank Document Disbursement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Document Disbursement</h3>
            <FileText className="w-5 h-5 text-[#2274A5]" />
          </div>
          
          <div className="space-y-4">
            {bankDisbursement.map((bank, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#2274A5] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {bank.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">{bank.name}</h4>
                    <p className="text-sm text-gray-600">Bank Document</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#2274A5]">{bank.documents.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">documents</p>
                </div>
              </div>
            ))}
          </div>

          Total Summary
          {/* <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Disbursement</span>
              <span className="text-xl font-bold text-[#2274A5]">
                {bankDisbursement.reduce((sum, bank) => sum + bank.documents, 0).toLocaleString()}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}