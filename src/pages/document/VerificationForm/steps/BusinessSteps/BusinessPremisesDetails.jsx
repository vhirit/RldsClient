import React from 'react';

const BusinessPremisesDetails = ({ formData, setFormData, onSectionSave }) => {
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`;
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Business Premises Details
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Premises
          </label>
          <select
            value={formData.businessVerification?.officePremises || ''}
            onChange={(e) => handleChange('businessVerification.officePremises', e.target.value)}
            className={getInputClass('businessVerification.officePremises')}
          >
            <option value="">Select premises type</option>
            <option value="OWNED">Owned</option>
            <option value="RENTED">Rented</option>
            <option value="LEASED">Leased</option>
            <option value="PARTNERSHIP">Partnership</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Years
          </label>
          <input
            type="number"
            value={formData.businessVerification?.numberOfYears || ''}
            onChange={(e) => handleChange('businessVerification.numberOfYears', e.target.value)}
            className={getInputClass('businessVerification.numberOfYears')}
            placeholder="Years in operation"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paying Rent
          </label>
          <select
            value={formData.businessVerification?.payingRent || ''}
            onChange={(e) => handleChange('businessVerification.payingRent', e.target.value)}
            className={getInputClass('businessVerification.payingRent')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Board Sighted
          </label>
          <select
            value={formData.businessVerification?.nameBoardSighted || ''}
            onChange={(e) => handleChange('businessVerification.nameBoardSighted', e.target.value)}
            className={getInputClass('businessVerification.nameBoardSighted')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Activity Seen
          </label>
          <select
            value={formData.businessVerification?.businessActivitySeen || ''}
            onChange={(e) => handleChange('businessVerification.businessActivitySeen', e.target.value)}
            className={getInputClass('businessVerification.businessActivitySeen')}
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
            value={formData.businessVerification?.equipmentSighted || ''}
            onChange={(e) => handleChange('businessVerification.equipmentSighted', e.target.value)}
            className={getInputClass('businessVerification.equipmentSighted')}
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
            value={formData.businessVerification?.visitingCardObtained || ''}
            onChange={(e) => handleChange('businessVerification.visitingCardObtained', e.target.value)}
            className={getInputClass('businessVerification.visitingCardObtained')}
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
            value={formData.businessVerification?.residenceCumOffice || ''}
            onChange={(e) => handleChange('businessVerification.residenceCumOffice', e.target.value)}
            className={getInputClass('businessVerification.residenceCumOffice')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Neighbour
          </label>
          <select
            value={formData.businessVerification?.businessNeighbour || ''}
            onChange={(e) => handleChange('businessVerification.businessNeighbour', e.target.value)}
            className={getInputClass('businessVerification.businessNeighbour')}
          >
            <option value="">Select feedback</option>
            <option value="POSITIVE">Positive</option>
            <option value="NEGATIVE">Negative</option>
            <option value="NEUTRAL">Neutral</option>
            <option value="NOT_AVAILABLE">Not Available</option>
          </select>
        </div>
      </div>

    
    </div>
  );
};

export default BusinessPremisesDetails;
