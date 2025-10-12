import React from 'react';

const BusinessDetails = ({ formData, setFormData, onSectionSave }) => {
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`;
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Business Details
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Business
          </label>
          <input
            type="text"
            value={formData.officeVerification?.natureOfBusiness || ''}
            onChange={(e) => handleChange('officeVerification.natureOfBusiness', e.target.value)}
            className={getInputClass('officeVerification.natureOfBusiness')}
            placeholder="Enter nature of business"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of employees seen
          </label>
          <input
            type="number"
            value={formData.officeVerification?.numberOfEmployeesSeen || ''}
            onChange={(e) => handleChange('officeVerification.numberOfEmployeesSeen', e.target.value)}
            className={getInputClass('officeVerification.numberOfEmployeesSeen')}
            placeholder="Number of employees"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Activity seen
          </label>
          <select
            value={formData.officeVerification?.businessActivitySeen || ''}
            onChange={(e) => handleChange('officeVerification.businessActivitySeen', e.target.value)}
            className={getInputClass('officeVerification.businessActivitySeen')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
            <option value="MINIMAL">Minimal</option>
            <option value="MODERATE">Moderate</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipment Sighted
          </label>
          <select
            value={formData.officeVerification?.equipmentSighted || ''}
            onChange={(e) => handleChange('officeVerification.equipmentSighted', e.target.value)}
            className={getInputClass('officeVerification.equipmentSighted')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
            <option value="BASIC">Basic</option>
            <option value="ADEQUATE">Adequate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visiting Card Obtained
          </label>
          <select
            value={formData.officeVerification?.visitingCardObtained || ''}
            onChange={(e) => handleChange('officeVerification.visitingCardObtained', e.target.value)}
            className={getInputClass('officeVerification.visitingCardObtained')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residence cum Office
          </label>
          <select
            value={formData.officeVerification?.residenceCumOffice || ''}
            onChange={(e) => handleChange('officeVerification.residenceCumOffice', e.target.value)}
            className={getInputClass('officeVerification.residenceCumOffice')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Confirmed
          </label>
          <select
            value={formData.officeVerification?.workConfirmed || ''}
            onChange={(e) => handleChange('officeVerification.workConfirmed', e.target.value)}
            className={getInputClass('officeVerification.workConfirmed')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
            <option value="PARTIAL">Partial</option>
          </select>
        </div>
      </div>

     
    </div>
  );
};

export default BusinessDetails;
