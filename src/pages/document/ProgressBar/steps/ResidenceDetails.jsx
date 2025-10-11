import React from 'react';

const ResidenceDetails = ({ formData, updateFormData, errors, validateField }) => {
  const handleChange = (field, value) => {
    updateFormData(field, value);
    if (validateField) {
      const rules = {
        residenceType: { required: true },
        livingSince: { required: true },
        ownership: { required: true }
      };
      validateField(field, value, rules[field]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Residence Details</h2>
        <p className="text-gray-600">Tell us about your current living situation.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residence Type *
          </label>
          <select
            value={formData.residenceType || ''}
            onChange={(e) => handleChange('residenceType', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors && errors.residenceType ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select Residence Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="other">Other</option>
          </select>
          {errors && errors.residenceType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.residenceType}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Living Since *
          </label>
          <input
            type="date"
            value={formData.livingSince}
            onChange={(e) => updateFormData('livingSince', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ownership Status *
          </label>
          <select
            value={formData.ownership}
            onChange={(e) => updateFormData('ownership', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
            <option value="leased">Leased</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ResidenceDetails;