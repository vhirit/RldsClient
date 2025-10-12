import React from 'react';

const OfficeInformation = ({ formData, setFormData, onSectionSave }) => {
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`;
  };

  const office = formData.officeVerification || {};

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Office Information
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Address *
          </label>
          <textarea
            rows={3}
            value={office.officeAddress || ''}
            onChange={(e) => handleChange('officeVerification.officeAddress', e.target.value)}
            className={getInputClass('officeVerification.officeAddress')}
            placeholder="Enter complete office address"
          />
          {getFieldError('officeVerification.officeAddress') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('officeVerification.officeAddress')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exact Company Name *
          </label>
          <input
            type="text"
            value={office.exactCompanyName || ''}
            onChange={(e) => handleChange('officeVerification.exactCompanyName', e.target.value)}
            className={getInputClass('officeVerification.exactCompanyName')}
            placeholder="Enter exact company name"
          />
          {getFieldError('officeVerification.exactCompanyName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('officeVerification.exactCompanyName')}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Floor
          </label>
          <input
            type="text"
            value={office.officeFloor || ''}
            onChange={(e) => handleChange('officeVerification.officeFloor', e.target.value)}
            className={getInputClass('officeVerification.officeFloor')}
            placeholder="Enter office floor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Land Mark
          </label>
          <input
            type="text"
            value={office.landMark || ''}
            onChange={(e) => handleChange('officeVerification.landMark', e.target.value)}
            className={getInputClass('officeVerification.landMark')}
            placeholder="Enter landmark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Board Sighted
          </label>
          <select
            value={office.nameBoardSighted || ''}
            onChange={(e) => handleChange('officeVerification.nameBoardSighted', e.target.value)}
            className={getInputClass('officeVerification.nameBoardSighted')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
      </div>

     
    </div>
  );
};

export default OfficeInformation;
