import React from 'react';

const BusinessAddressInfo = ({ formData, setFormData, onSectionSave }) => {
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

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Business Address Information
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Address *
          </label>
          <textarea
            rows={3}
            value={formData.businessVerification?.officeAddress || ''}
            onChange={(e) => handleChange('businessVerification.officeAddress', e.target.value)}
            className={getInputClass('businessVerification.officeAddress')}
            placeholder="Enter complete business address"
          />
          {getFieldError('businessVerification.officeAddress') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('businessVerification.officeAddress')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exact Company Name *
          </label>
          <input
            type="text"
            value={formData.businessVerification?.exactCompanyName || ''}
            onChange={(e) => handleChange('businessVerification.exactCompanyName', e.target.value)}
            className={getInputClass('businessVerification.exactCompanyName')}
            placeholder="Enter exact company name"
          />
          {getFieldError('businessVerification.exactCompanyName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('businessVerification.exactCompanyName')}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Location
          </label>
          <input
            type="text"
            value={formData.businessVerification?.officeLocation || ''}
            onChange={(e) => handleChange('businessVerification.officeLocation', e.target.value)}
            className={getInputClass('businessVerification.officeLocation')}
            placeholder="Enter office location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area in Sq. Ft
          </label>
          <input
            type="number"
            value={formData.businessVerification?.areaInSqFt || ''}
            onChange={(e) => handleChange('businessVerification.areaInSqFt', e.target.value)}
            className={getInputClass('businessVerification.areaInSqFt')}
            placeholder="Enter area in sq ft"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Locating Office
          </label>
          <select
            value={formData.businessVerification?.locatingOffice || ''}
            onChange={(e) => handleChange('businessVerification.locatingOffice', e.target.value)}
            className={getInputClass('businessVerification.locatingOffice')}
          >
            <option value="">Select option</option>
            <option value="EASY">Easy</option>
            <option value="MODERATE">Moderate</option>
            <option value="DIFFICULT">Difficult</option>
          </select>
        </div>
      </div>

     
    </div>
  );
};

export default BusinessAddressInfo;
