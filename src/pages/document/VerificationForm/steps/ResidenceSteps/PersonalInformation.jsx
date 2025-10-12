import React from 'react';

const PersonalInformation = ({ formData, setFormData, onSectionSave }) => {
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

  const residence = formData.residenceVerification || {};

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Personal Information
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Of Birth
          </label>
          <input
            type="date"
            value={residence.dateOfBirth || ''}
            onChange={(e) => handleChange('residenceVerification.dateOfBirth', e.target.value)}
            className={getInputClass('residenceVerification.dateOfBirth')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card No
          </label>
          <input
            type="text"
            value={residence.aadharCardNo || ''}
            onChange={(e) => handleChange('residenceVerification.aadharCardNo', e.target.value)}
            className={getInputClass('residenceVerification.aadharCardNo')}
            placeholder="Enter Aadhar number"
            maxLength="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pan Card No
          </label>
          <input
            type="text"
            value={residence.panCardNo || ''}
            onChange={(e) => handleChange('residenceVerification.panCardNo', e.target.value)}
            className={getInputClass('residenceVerification.panCardNo')}
            placeholder="Enter PAN number"
            maxLength="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile No 1
          </label>
          <input
            type="tel"
            value={residence.mobileNo1 || ''}
            onChange={(e) => handleChange('residenceVerification.mobileNo1', e.target.value)}
            className={getInputClass('residenceVerification.mobileNo1')}
            placeholder="Enter mobile number"
            maxLength="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile No 2
          </label>
          <input
            type="tel"
            value={residence.mobileNo2 || ''}
            onChange={(e) => handleChange('residenceVerification.mobileNo2', e.target.value)}
            className={getInputClass('residenceVerification.mobileNo2')}
            placeholder="Enter alternate mobile number"
            maxLength="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile No 3
          </label>
          <input
            type="tel"
            value={residence.mobileNo3 || ''}
            onChange={(e) => handleChange('residenceVerification.mobileNo3', e.target.value)}
            className={getInputClass('residenceVerification.mobileNo3')}
            placeholder="Enter third mobile number"
            maxLength="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualification
          </label>
          <select
            value={residence.qualification || ''}
            onChange={(e) => handleChange('residenceVerification.qualification', e.target.value)}
            className={getInputClass('residenceVerification.qualification')}
          >
            <option value="">Select qualification</option>
            <option value="ILLITERATE">Illiterate</option>
            <option value="PRIMARY">Primary</option>
            <option value="SECONDARY">Secondary</option>
            <option value="HIGHER_SECONDARY">Higher Secondary</option>
            <option value="GRADUATE">Graduate</option>
            <option value="POST_GRADUATE">Post Graduate</option>
            <option value="PROFESSIONAL">Professional</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Family Members
          </label>
          <input
            type="number"
            value={residence.totalFamilyMembers || ''}
            onChange={(e) => handleChange('residenceVerification.totalFamilyMembers', e.target.value)}
            className={getInputClass('residenceVerification.totalFamilyMembers')}
            placeholder="Enter total family members"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visible Items
          </label>
          <textarea
            rows={2}
            value={residence.visibleItems || ''}
            onChange={(e) => handleChange('residenceVerification.visibleItems', e.target.value)}
            className={getInputClass('residenceVerification.visibleItems')}
            placeholder="List visible items at residence"
          />
        </div>
      </div>


    </div>
  );
};

export default PersonalInformation;
