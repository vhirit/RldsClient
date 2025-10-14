import React from 'react';

const CompanyContactDetails = ({ formData, setFormData, onSectionSave }) => {
  const handleChange = (path, value) => {
    setFormData(prev => {
      const clone = { ...prev };
      const parts = path.split('.');
      let cursor = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!cursor[p]) cursor[p] = {};
        cursor[p] = { ...cursor[p] };
        cursor = cursor[p];
      }
      cursor[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const getFieldError = (path) => {
    if (!formData || !formData.errors) return '';
    const parts = path.split('.');
    let cursor = formData.errors;
    for (const p of parts) {
      if (!cursor) return '';
      cursor = cursor[p];
    }
    return cursor || '';
  };

  const getInputClass = (path) => {
    const hasError = !!getFieldError(path);
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`;
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Company & Contact Details
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation of Applicant
          </label>
          <input
            type="text"
            value={formData.businessVerification?.designationOfApplicant || ''}
            onChange={(e) => handleChange('businessVerification.designationOfApplicant', e.target.value)}
            className={getInputClass('businessVerification.designationOfApplicant')}
            placeholder="Enter designation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person Name
          </label>
          <input
            type="text"
            value={formData.businessVerification?.contactPersonName || ''}
            onChange={(e) => handleChange('businessVerification.contactPersonName', e.target.value)}
            className={getInputClass('businessVerification.contactPersonName')}
            placeholder="Enter contact person name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person Designation
          </label>
          <input
            type="text"
            value={formData.businessVerification?.contactPersonDesignation || ''}
            onChange={(e) => handleChange('businessVerification.contactPersonDesignation', e.target.value)}
            className={getInputClass('businessVerification.contactPersonDesignation')}
            placeholder="Enter contact person designation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Business
          </label>
          <input
            type="text"
            value={formData.businessVerification?.natureOfBusiness || ''}
            onChange={(e) => handleChange('businessVerification.natureOfBusiness', e.target.value)}
            className={getInputClass('businessVerification.natureOfBusiness')}
            placeholder="Enter nature of business"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            value={formData.businessVerification?.numberOfEmployees || ''}
            onChange={(e) => handleChange('businessVerification.numberOfEmployees', e.target.value)}
            className={getInputClass('businessVerification.numberOfEmployees')}
            placeholder="Enter number of employees"
            min="0"
          />
        </div>
      </div>

   
    </div>
  );
};

export default CompanyContactDetails;
