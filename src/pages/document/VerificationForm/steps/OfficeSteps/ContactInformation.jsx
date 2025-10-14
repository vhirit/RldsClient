import React from 'react';

const ContactInformation = ({ formData, setFormData, onSectionSave }) => {
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

  const office = formData.officeVerification || {};

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Contact Information
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Person contacted
          </label>
          <select
            value={office.personContacted || ''}
            onChange={(e) => handleChange('officeVerification.personContacted', e.target.value)}
            className={getInputClass('officeVerification.personContacted')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Person Contacted Name
          </label>
          <input
            type="text"
            value={office.personContactedName || ''}
            onChange={(e) => handleChange('officeVerification.personContactedName', e.target.value)}
            className={getInputClass('officeVerification.personContactedName')}
            placeholder="Enter person contacted name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Person Met
          </label>
          <select
            value={office.personMet || ''}
            onChange={(e) => handleChange('officeVerification.personMet', e.target.value)}
            className={getInputClass('officeVerification.personMet')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Person Met Name
          </label>
          <input
            type="text"
            value={office.personMetName || ''}
            onChange={(e) => handleChange('officeVerification.personMetName', e.target.value)}
            className={getInputClass('officeVerification.personMetName')}
            placeholder="Enter person met name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation of the person
          </label>
          <input
            type="text"
            value={office.designationOfPerson || ''}
            onChange={(e) => handleChange('officeVerification.designationOfPerson', e.target.value)}
            className={getInputClass('officeVerification.designationOfPerson')}
            placeholder="Enter designation of person met"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile No 1
          </label>
          <input
            type="tel"
            value={office.mobileNo1 || ''}
            onChange={(e) => handleChange('officeVerification.mobileNo1', e.target.value)}
            className={getInputClass('officeVerification.mobileNo1')}
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
            value={office.mobileNo2 || ''}
            onChange={(e) => handleChange('officeVerification.mobileNo2', e.target.value)}
            className={getInputClass('officeVerification.mobileNo2')}
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
            value={office.mobileNo3 || ''}
            onChange={(e) => handleChange('officeVerification.mobileNo3', e.target.value)}
            className={getInputClass('officeVerification.mobileNo3')}
            placeholder="Enter third mobile number"
            maxLength="10"
          />
        </div>
      </div>

     
    </div>
  );
};

export default ContactInformation;
