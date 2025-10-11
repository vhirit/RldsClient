import React from 'react';

const BusinessVerificationForm = ({ formData, updateFormData, errors, validateField }) => {
  const handleChange = (field, value) => {
    updateFormData(field, value);
    if (validateField) {
      const rules = {
        // Administrative Details
        'businessVerification.dateOfReceipt': { required: true },
        'businessVerification.referenceNo': { required: true },
        'businessVerification.branchName': { required: true },
        'businessVerification.applicantName': { required: true },
        
        // Office Address Information
        'businessVerification.officeAddress.street': { required: true },
        'businessVerification.officeAddress.city': { required: true },
        'businessVerification.officeAddress.state': { required: true },
        'businessVerification.officeAddress.pincode': { required: true },
        
        // Company Information
        'businessVerification.exactCompanyName': { required: true },
        'businessVerification.designationOfApplicant': { required: true },
        'businessVerification.natureOfBusiness': { required: true }
      };
      if (rules[field]) {
        validateField(field, value, rules[field]);
      }
    }
  };

  const getFieldError = (fieldPath) => {
    return errors && errors[fieldPath];
  };

  const getInputClass = (fieldPath) => {
    return `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
      getFieldError(fieldPath) ? 'border-red-500 bg-red-50' : 'border-gray-300'
    }`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Verification</h2>
        <p className="text-gray-600">Complete business verification details and premises information.</p>
      </div>

      {/* Administrative Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrative Details</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Receipt *
            </label>
            <input
              type="date"
              value={formData.businessVerification?.dateOfReceipt || ''}
              onChange={(e) => handleChange('businessVerification.dateOfReceipt', e.target.value)}
              className={getInputClass('businessVerification.dateOfReceipt')}
            />
            {getFieldError('businessVerification.dateOfReceipt') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.dateOfReceipt')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Report
            </label>
            <input
              type="date"
              value={formData.businessVerification?.dateOfReport || ''}
              onChange={(e) => handleChange('businessVerification.dateOfReport', e.target.value)}
              className={getInputClass('businessVerification.dateOfReport')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference No *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.referenceNo || ''}
              onChange={(e) => handleChange('businessVerification.referenceNo', e.target.value)}
              className={getInputClass('businessVerification.referenceNo')}
              placeholder="Enter reference number"
            />
            {getFieldError('businessVerification.referenceNo') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.referenceNo')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.branchName || ''}
              onChange={(e) => handleChange('businessVerification.branchName', e.target.value)}
              className={getInputClass('businessVerification.branchName')}
              placeholder="Enter branch name"
            />
            {getFieldError('businessVerification.branchName') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.branchName')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Loan
            </label>
            <select
              value={formData.businessVerification?.typeOfLoan || ''}
              onChange={(e) => handleChange('businessVerification.typeOfLoan', e.target.value)}
              className={getInputClass('businessVerification.typeOfLoan')}
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
              Applicant Name *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.applicantName || ''}
              onChange={(e) => handleChange('businessVerification.applicantName', e.target.value)}
              className={getInputClass('businessVerification.applicantName')}
              placeholder="Enter applicant name"
            />
            {getFieldError('businessVerification.applicantName') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.applicantName')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Office Address Information */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Address Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Street Address *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.officeAddress?.street || ''}
              onChange={(e) => handleChange('businessVerification.officeAddress.street', e.target.value)}
              className={getInputClass('businessVerification.officeAddress.street')}
              placeholder="Enter business street address"
            />
            {getFieldError('businessVerification.officeAddress.street') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.officeAddress.street')}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.businessVerification?.officeAddress?.city || ''}
                onChange={(e) => handleChange('businessVerification.officeAddress.city', e.target.value)}
                className={getInputClass('businessVerification.officeAddress.city')}
                placeholder="City"
              />
              {getFieldError('businessVerification.officeAddress.city') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('businessVerification.officeAddress.city')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                value={formData.businessVerification?.officeAddress?.state || ''}
                onChange={(e) => handleChange('businessVerification.officeAddress.state', e.target.value)}
                className={getInputClass('businessVerification.officeAddress.state')}
                placeholder="State"
              />
              {getFieldError('businessVerification.officeAddress.state') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('businessVerification.officeAddress.state')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                value={formData.businessVerification?.officeAddress?.pincode || ''}
                onChange={(e) => handleChange('businessVerification.officeAddress.pincode', e.target.value)}
                className={getInputClass('businessVerification.officeAddress.pincode')}
                placeholder="Pincode"
              />
              {getFieldError('businessVerification.officeAddress.pincode') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('businessVerification.officeAddress.pincode')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                value={formData.businessVerification?.officeAddress?.country || 'India'}
                onChange={(e) => handleChange('businessVerification.officeAddress.country', e.target.value)}
                className={getInputClass('businessVerification.officeAddress.country')}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company & Business Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation of Applicant *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.designationOfApplicant || ''}
              onChange={(e) => handleChange('businessVerification.designationOfApplicant', e.target.value)}
              className={getInputClass('businessVerification.designationOfApplicant')}
              placeholder="Enter designation"
            />
            {getFieldError('businessVerification.designationOfApplicant') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.designationOfApplicant')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nature of Business *
            </label>
            <input
              type="text"
              value={formData.businessVerification?.natureOfBusiness || ''}
              onChange={(e) => handleChange('businessVerification.natureOfBusiness', e.target.value)}
              className={getInputClass('businessVerification.natureOfBusiness')}
              placeholder="Enter nature of business"
            />
            {getFieldError('businessVerification.natureOfBusiness') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('businessVerification.natureOfBusiness')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Name
            </label>
            <input
              type="text"
              value={formData.businessVerification?.contactPersonName || ''}
              onChange={(e) => handleChange('businessVerification.contactPersonName', e.target.value)}
              className={getInputClass('businessVerification.contactPersonName')}
              placeholder="Enter contact person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Designation
            </label>
            <input
              type="text"
              value={formData.businessVerification?.contactPersonDesignation || ''}
              onChange={(e) => handleChange('businessVerification.contactPersonDesignation', e.target.value)}
              className={getInputClass('businessVerification.contactPersonDesignation')}
              placeholder="Enter contact person designation"
            />
          </div>

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
              <option value="SHARED">Shared</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Years in Business
            </label>
            <input
              type="number"
              min="0"
              value={formData.businessVerification?.numberOfYears || ''}
              onChange={(e) => handleChange('businessVerification.numberOfYears', e.target.value)}
              className={getInputClass('businessVerification.numberOfYears')}
              placeholder="Years in business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paying Rent (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.businessVerification?.payingRent || ''}
              onChange={(e) => handleChange('businessVerification.payingRent', e.target.value)}
              className={getInputClass('businessVerification.payingRent')}
              placeholder="Monthly rent amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area in Sq Ft
            </label>
            <input
              type="number"
              min="0"
              value={formData.businessVerification?.areaInSqFt || ''}
              onChange={(e) => handleChange('businessVerification.areaInSqFt', e.target.value)}
              className={getInputClass('businessVerification.areaInSqFt')}
              placeholder="Area in square feet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Employees
            </label>
            <input
              type="number"
              min="0"
              value={formData.businessVerification?.numberOfEmployees || ''}
              onChange={(e) => handleChange('businessVerification.numberOfEmployees', e.target.value)}
              className={getInputClass('businessVerification.numberOfEmployees')}
              placeholder="Number of employees"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office Location
            </label>
            <select
              value={formData.businessVerification?.officeLocation || ''}
              onChange={(e) => handleChange('businessVerification.officeLocation', e.target.value)}
              className={getInputClass('businessVerification.officeLocation')}
            >
              <option value="">Select office location type</option>
              <option value="COMMERCIAL_AREA">Commercial Area</option>
              <option value="RESIDENTIAL_AREA">Residential Area</option>
              <option value="INDUSTRIAL_AREA">Industrial Area</option>
              <option value="MIXED_USE">Mixed Use</option>
              <option value="OTHER">Other</option>
            </select>
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
              <option value="">Select difficulty level</option>
              <option value="EASY">Easy</option>
              <option value="MODERATE">Moderate</option>
              <option value="DIFFICULT">Difficult</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Neighbour
            </label>
            <input
              type="text"
              value={formData.businessVerification?.businessNeighbour || ''}
              onChange={(e) => handleChange('businessVerification.businessNeighbour', e.target.value)}
              className={getInputClass('businessVerification.businessNeighbour')}
              placeholder="Describe business neighbours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade License No
            </label>
            <input
              type="text"
              value={formData.businessVerification?.tradeLicenseNo || ''}
              onChange={(e) => handleChange('businessVerification.tradeLicenseNo', e.target.value)}
              className={getInputClass('businessVerification.tradeLicenseNo')}
              placeholder="Enter trade license number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST No
            </label>
            <input
              type="text"
              value={formData.businessVerification?.gstNo || ''}
              onChange={(e) => handleChange('businessVerification.gstNo', e.target.value)}
              className={getInputClass('businessVerification.gstNo')}
              placeholder="Enter GST number"
            />
          </div>
        </div>
      </div>

      {/* Verification Details */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="nameBoardSighted_business"
                checked={formData.businessVerification?.nameBoardSighted || false}
                onChange={(e) => handleChange('businessVerification.nameBoardSighted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="nameBoardSighted_business" className="text-sm font-medium text-gray-700">
                Name Board Sighted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="businessActivitySeen_business"
                checked={formData.businessVerification?.businessActivitySeen || false}
                onChange={(e) => handleChange('businessVerification.businessActivitySeen', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="businessActivitySeen_business" className="text-sm font-medium text-gray-700">
                Business Activity Seen
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="equipmentSighted_business"
                checked={formData.businessVerification?.equipmentSighted || false}
                onChange={(e) => handleChange('businessVerification.equipmentSighted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="equipmentSighted_business" className="text-sm font-medium text-gray-700">
                Equipment Sighted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="visitingCardObtained_business"
                checked={formData.businessVerification?.visitingCardObtained || false}
                onChange={(e) => handleChange('businessVerification.visitingCardObtained', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="visitingCardObtained_business" className="text-sm font-medium text-gray-700">
                Visiting Card Obtained
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="residenceCumOffice_business"
                checked={formData.businessVerification?.residenceCumOffice || false}
                onChange={(e) => handleChange('businessVerification.residenceCumOffice', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="residenceCumOffice_business" className="text-sm font-medium text-gray-700">
                Residence cum Office
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <select
              value={formData.businessVerification?.rating || ''}
              onChange={(e) => handleChange('businessVerification.rating', e.target.value)}
              className={getInputClass('businessVerification.rating')}
            >
              <option value="">Select rating</option>
              <option value="EXCELLENT">Excellent</option>
              <option value="GOOD">Good</option>
              <option value="AVERAGE">Average</option>
              <option value="POOR">Poor</option>
              <option value="NEGATIVE">Negative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Executive Comments
            </label>
            <textarea
              rows="4"
              value={formData.businessVerification?.fieldExecutiveComments || ''}
              onChange={(e) => handleChange('businessVerification.fieldExecutiveComments', e.target.value)}
              className={getInputClass('businessVerification.fieldExecutiveComments')}
              placeholder="Enter field executive comments..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Executive Name
            </label>
            <input
              type="text"
              value={formData.businessVerification?.fieldExecutiveName || ''}
              onChange={(e) => handleChange('businessVerification.fieldExecutiveName', e.target.value)}
              className={getInputClass('businessVerification.fieldExecutiveName')}
              placeholder="Enter field executive name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authorized Signatory
            </label>
            <input
              type="text"
              value={formData.businessVerification?.authorizedSignatory || ''}
              onChange={(e) => handleChange('businessVerification.authorizedSignatory', e.target.value)}
              className={getInputClass('businessVerification.authorizedSignatory')}
              placeholder="Enter authorized signatory name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVerificationForm;