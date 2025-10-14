import React from 'react';

const CommentsAuthorization = ({ formData, setFormData, onSectionSave }) => {
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`;
  };

  const residence = formData.residenceVerification || {};

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
        </svg>
        Comments & Authorization
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            COMMENTS
          </label>
          <textarea
            rows={3}
            value={residence.comments || ''}
            onChange={(e) => handleChange('residenceVerification.comments', e.target.value)}
            className={getInputClass('residenceVerification.comments')}
            placeholder="Enter general comments"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field Executive Comments
          </label>
          <textarea
            rows={3}
            value={residence.fieldExecutiveComments || ''}
            onChange={(e) => handleChange('residenceVerification.fieldExecutiveComments', e.target.value)}
            className={getInputClass('residenceVerification.fieldExecutiveComments')}
            placeholder="Enter field executive comments"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verifier's Name
            </label>
            <input
              type="text"
              value={residence.verifierName || ''}
              onChange={(e) => handleChange('residenceVerification.verifierName', e.target.value)}
              className={getInputClass('residenceVerification.verifierName')}
              placeholder="Enter verifier's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authorized Signatory
            </label>
            <input
              type="text"
              value={residence.authorizedSignatory || ''}
              onChange={(e) => handleChange('residenceVerification.authorizedSignatory', e.target.value)}
              className={getInputClass('residenceVerification.authorizedSignatory')}
              placeholder="Enter authorized signatory name"
            />
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default CommentsAuthorization;
