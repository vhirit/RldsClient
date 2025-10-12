import React from 'react';

const VerificationStatus = ({ formData, setFormData, onSectionSave }) => {
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

  const residence = formData.residenceVerification || {};

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Verification Status
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Confirmed
          </label>
          <select
            value={residence.addressConfirmed || ''}
            onChange={(e) => handleChange('residenceVerification.addressConfirmed', e.target.value)}
            className={getInputClass('residenceVerification.addressConfirmed')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
            <option value="PARTIAL">Partial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neighbours Verification
          </label>
          <select
            value={residence.neighboursVerification || ''}
            onChange={(e) => handleChange('residenceVerification.neighboursVerification', e.target.value)}
            className={getInputClass('residenceVerification.neighboursVerification')}
          >
            <option value="">Select option</option>
            <option value="POSITIVE">Positive</option>
            <option value="NEGATIVE">Negative</option>
            <option value="NOT_AVAILABLE">Not Available</option>
            <option value="NEUTRAL">Neutral</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neighbours Comments
          </label>
          <textarea
            rows={3}
            value={residence.neighboursComments || ''}
            onChange={(e) => handleChange('residenceVerification.neighboursComments', e.target.value)}
            className={getInputClass('residenceVerification.neighboursComments')}
            placeholder="Enter neighbours' comments"
          />
        </div>
      </div>

   
    </div>
  );
};

export default VerificationStatus;
