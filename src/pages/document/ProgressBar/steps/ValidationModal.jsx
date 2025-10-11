import React from 'react';

const ValidationModal = ({ isOpen, errors, onClose, fieldRequirements }) => {
  if (!isOpen || !errors || errors.length === 0) return null;

  // Field display name mapping
  const fieldDisplayNames = {
    dateOfReceipt: "Date of Receipt",
    dateOfReport: "Date of Report",
    referenceNo: "Reference Number",
    branchName: "Branch Name",
    typeOfLoan: "Type of Loan",
    applicantName: "Applicant Name",
    applicantType: "Applicant Type",
    presentAddress: "Present Address",
    ownership: "Ownership Type",
    typeOfResidence: "Residence Type",
    dateOfBirth: "Date of Birth",
    aadharCardNo: "Aadhar Card Number",
    fieldExecutiveComments: "Field Executive Comments",
    verifiersName: "Verifier's Name",
    officeAddress: "Office Address",
    exactCompanyName: "Company Name",
    designation: "Designation",
    natureOfBusiness: "Nature of Business",
    fieldExecutiveName: "Field Executive Name"
  };

  const getFieldDisplayName = (field) => {
    return fieldDisplayNames[field] || field;
  };

  const getSectionForField = (field) => {
    const sectionMap = {
      // Residence form fields
      dateOfReceipt: 'basic',
      dateOfReport: 'basic',
      referenceNo: 'basic',
      branchName: 'basic',
      typeOfLoan: 'basic',
      applicantName: 'basic',
      applicantType: 'basic',
      presentAddress: 'address',
      ownership: 'residence',
      typeOfResidence: 'residence',
      dateOfBirth: 'personal',
      aadharCardNo: 'personal',
      fieldExecutiveComments: 'executive',
      verifiersName: 'executive',
      
      // Office form fields
      officeAddress: 'office',
      exactCompanyName: 'office',
      designation: 'office',
      natureOfBusiness: 'business',
      fieldExecutiveName: 'executive'
    };
    
    return sectionMap[field] || 'basic';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all max-h-[70vh] overflow-hidden">
        <div className="p-4">
          {/* Header - More Compact */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Missing Information</h3>
                <p className="text-gray-600 text-xs">Complete these fields to continue</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Error List - More Compact */}
          <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
            {errors.map((error, index) => {
              // Extract field name from error message
              let fieldName = error;
              if (error.includes(' is required')) {
                fieldName = error.replace(' is required', '');
              } else if (error.includes(' must be exactly 12 digits')) {
                fieldName = error.replace(' must be exactly 12 digits', '');
              }
              
              const displayName = getFieldDisplayName(fieldName);
              const section = getSectionForField(fieldName);
              
              return (
                <div key={index} className="flex items-start p-2 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <p className="text-red-800 font-medium text-sm truncate">
                          {displayName}
                        </p>
                        <p className="text-red-600 text-xs mt-0.5">
                          {error.includes('must be') ? 'Must be 12 digits' : 'Required field'}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2 flex-shrink-0">
                        {section.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Text - More Compact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-blue-800 font-medium text-xs">Quick Tip</p>
                <p className="text-blue-700 text-xs mt-0.5">
                  Use the sidebar to navigate to missing fields. Required fields are marked with <span className="text-red-500">*</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons - More Compact */}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Fix Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;