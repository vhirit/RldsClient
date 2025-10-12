import React from 'react';

const AdministrativeDetails = ({ formData, setFormData, onSectionSave }) => {
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
    // optional: read validation errors from formData.errors if available
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;
  };

  const residence = formData.residenceVerification || {};

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Administrative Details
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Of The Receipt of the File *
          </label>
          <input
            type="date"
            value={residence.dateOfReceipt || ''}
            onChange={(e) => handleChange('residenceVerification.dateOfReceipt', e.target.value)}
            className={getInputClass('residenceVerification.dateOfReceipt')}
          />
          {getFieldError('residenceVerification.dateOfReceipt') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.dateOfReceipt')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Of The Report
          </label>
          <input
            type="date"
            value={residence.dateOfReport || ''}
            onChange={(e) => handleChange('residenceVerification.dateOfReport', e.target.value)}
            className={getInputClass('residenceVerification.dateOfReport')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            REFERENCE NO *
          </label>
          <input
            type="text"
            value={residence.referenceNo || ''}
            onChange={(e) => handleChange('residenceVerification.referenceNo', e.target.value)}
            className={getInputClass('residenceVerification.referenceNo')}
            placeholder="Enter reference number"
          />
          {getFieldError('residenceVerification.referenceNo') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.referenceNo')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name *
          </label>
          <input
            type="text"
            value={residence.branchName || ''}
            onChange={(e) => handleChange('residenceVerification.branchName', e.target.value)}
            className={getInputClass('residenceVerification.branchName')}
            placeholder="Enter branch name"
          />
          {getFieldError('residenceVerification.branchName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.branchName')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type Of Loan
          </label>
          <select
            value={residence.typeOfLoan || ''}
            onChange={(e) => handleChange('residenceVerification.typeOfLoan', e.target.value)}
            className={getInputClass('residenceVerification.typeOfLoan')}
          >
            <option value="">Select loan type</option>
            <option value="HOME_LOAN">Home Loan</option>
            <option value="PERSONAL_LOAN">Personal Loan</option>
            <option value="BUSINESS_LOAN">Business Loan</option>
            <option value="CAR_LOAN">Car Loan</option>
            <option value="EDUCATION_LOAN">Education Loan</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of the Applicant (Mr/Mrs/Ms) *
          </label>
          <input
            type="text"
            value={residence.applicantName || ''}
            onChange={(e) => handleChange('residenceVerification.applicantName', e.target.value)}
            className={getInputClass('residenceVerification.applicantName')}
            placeholder="Enter applicant name with title"
          />
          {getFieldError('residenceVerification.applicantName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.applicantName')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relationship of the Person
          </label>
          <select
            value={residence.relationshipOfPerson || ''}
            onChange={(e) => handleChange('residenceVerification.relationshipOfPerson', e.target.value)}
            className={getInputClass('residenceVerification.relationshipOfPerson')}
          >
            <option value="">Select relationship</option>
            <option value="SELF">Self</option>
            <option value="SPOUSE">Spouse</option>
            <option value="FATHER">Father</option>
            <option value="MOTHER">Mother</option>
            <option value="SON">Son</option>
            <option value="DAUGHTER">Daughter</option>
            <option value="BROTHER">Brother</option>
            <option value="SISTER">Sister</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      
    </div>
  );
};

export default AdministrativeDetails;
