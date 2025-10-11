import React, { useState, useEffect } from 'react';

const FormProgress = ({ currentStep, currentSection, completedSections, onSectionChange, verificationType }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const residenceSections = [
      { id: 'basic', title: 'Basic Information', step: 1 },
      { id: 'address', title: 'Address Details', step: 2 },
      { id: 'residence', title: 'Residence Details', step: 3 },
      { id: 'personal', title: 'Personal Details', step: 4 },
      { id: 'verification', title: 'Verification Details', step: 5 },
      { id: 'executive', title: 'Field Executive Comments', step: 6 },
      { id: 'images', title: 'Site Images', step: 7 }
    ];

    const officeSections = [
      { id: 'basic', title: 'Basic Information', step: 1 },
      { id: 'office', title: 'Office Details', step: 2 },
      { id: 'contact', title: 'Contact Details', step: 3 },
      { id: 'business', title: 'Business Details', step: 4 },
      { id: 'verification', title: 'Verification Details', step: 5 },
      { id: 'executive', title: 'Field Executive Comments', step: 6 },
      { id: 'images', title: 'Site Images', step: 7 }
    ];

    const employeeSections = [
      { id: 'basic', title: 'Basic Information', step: 1 },
      { id: 'business', title: 'Business Details', step: 2 },
      { id: 'premises', title: 'Business Premises', step: 3 },
      { id: 'registration', title: 'Registration Details', step: 4 },
      { id: 'executive', title: 'Field Executive Comments', step: 5 },
      { id: 'images', title: 'Site Images', step: 6 }
    ];

    const getSections = () => {
      switch (verificationType) {
        case 'residence':
          return residenceSections;
        case 'office':
          return officeSections;
        case 'employee':
          return employeeSections;
        default:
          return residenceSections;
      }
    };

    setSections(getSections());
  }, [verificationType]);
  
  const calculateProgress = () => {
    if (sections.length === 0) return 0;
    const completedCount = sections.filter(s => completedSections.includes(s.id)).length;
    return Math.round((completedCount / sections.length) * 100);
  };

  const getStepStatus = (sectionId) => {
    if (sectionId === currentSection) return 'current';
    if (completedSections.includes(sectionId)) return 'completed';
    return 'upcoming';
  };

  const progressPercentage = calculateProgress();

  if (sections.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          {verificationType === 'residence' ? '🏠 Residence Verification' : 
           verificationType === 'office' ? '🏢 Office Verification' : 
           '🏢👨‍💼 Business/Employee Verification'}
        </h2>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section, index) => {
          const status = getStepStatus(section.id);
          const isClickable = completedSections.includes(section.id) || section.id === currentSection;
          
          return (
            <div key={section.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onSectionChange(section.id)}
                  disabled={!isClickable}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border ${
                    status === 'current' 
                      ? 'bg-blue-500 text-white border-blue-600' 
                      : status === 'completed'
                      ? 'bg-green-500 text-white border-green-600'
                      : 'bg-white text-gray-400 border-gray-300'
                  } ${isClickable ? 'cursor-pointer hover:shadow-sm' : 'cursor-not-allowed'}`}
                >
                  {status === 'completed' ? '✓' : section.step}
                </button>
                {index < sections.length - 1 && (
                  <div className={`w-0.5 h-6 ${
                    completedSections.includes(section.id) ? 'bg-green-500' : 'bg-gray-200'
                  } transition-colors duration-300`}></div>
                )}
              </div>
              <div className="flex-1 pb-5">
                <button
                  onClick={() => isClickable && onSectionChange(section.id)}
                  disabled={!isClickable}
                  className={`text-left transition-all duration-300 w-full ${
                    status === 'current'
                      ? 'text-blue-600 font-semibold'
                      : status === 'completed'
                      ? 'text-green-600 font-medium'
                      : 'text-gray-400'
                  } ${isClickable ? 'hover:text-blue-500 cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <div className="text-sm font-medium">{section.title}</div>
                  <div className="text-xs mt-1">
                    {status === 'completed' && (
                      <span className="text-green-500 flex items-center font-medium">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </span>
                    )}
                    {status === 'current' && (
                      <span className="text-blue-500 font-medium">In Progress</span>
                    )}
                    {status === 'upcoming' && (
                      <span className="text-gray-400">Upcoming</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Current Status</h3>
        <div className="text-xs text-blue-800">
          {completedSections.length} of {sections.length} sections completed
        </div>
        <div className="text-xs text-blue-700 mt-1 font-medium">
          {progressPercentage}% Overall Progress
        </div>
      </div>
    </div>
  );
};

export default FormProgress;