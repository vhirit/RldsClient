import React from 'react';

const VerificationDetails = ({ formData, updateFormData, errors, validateField }) => {
  const handleChange = (field, value) => {
    updateFormData(field, value);
    if (validateField) {
      const rules = {
        idType: { required: true },
        idNumber: { required: true }
      };
      validateField(field, value, rules[field]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Details</h2>
        <p className="text-gray-600">Please provide your identity verification information.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Type *
          </label>
          <select
            value={formData.idType || ''}
            onChange={(e) => handleChange('idType', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors && errors.idType ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select ID Type</option>
            <option value="passport">Passport</option>
            <option value="driving_license">Driving License</option>
            <option value="national_id">National ID</option>
            <option value="other">Other</option>
          </select>
          {errors && errors.idType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.idType}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Number *
          </label>
          <input
            type="text"
            required
            value={formData.idNumber || ''}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors && errors.idNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter your ID number"
          />
          {errors && errors.idNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.idNumber}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issued Date
            </label>
            <input
              type="date"
              value={formData.issuedDate || ''}
              onChange={(e) => updateFormData('issuedDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiryDate || ''}
              onChange={(e) => updateFormData('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;