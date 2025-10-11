import React from 'react';

const BusinessVerificationForm = ({ formData, handleChange, getInputClass, getFieldError }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Business Verification Form</h2>
        <p className="text-purple-100">Complete business premises verification details</p>
      </div>

      {/* Administrative Details */}
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
              Date Of The Report
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
              REFERENCE NO *
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
              Type Of Loan
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

      {/* Company & Contact Details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Company & Contact Details
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation of Applicant
            </label>
            <input
              type="text"
              value={formData.businessVerification?.designationOfApplicant || ''}
              onChange={(e) => handleChange('businessVerification.designationOfApplicant', e.target.value)}
              className={getInputClass('businessVerification.designationOfApplicant')}
              placeholder="Enter designation"
            />
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
              Nature of Business
            </label>
            <input
              type="text"
              value={formData.businessVerification?.natureOfBusiness || ''}
              onChange={(e) => handleChange('businessVerification.natureOfBusiness', e.target.value)}
              className={getInputClass('businessVerification.natureOfBusiness')}
              placeholder="Enter nature of business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Employees
            </label>
            <input
              type="number"
              value={formData.businessVerification?.numberOfEmployees || ''}
              onChange={(e) => handleChange('businessVerification.numberOfEmployees', e.target.value)}
              className={getInputClass('businessVerification.numberOfEmployees')}
              placeholder="Enter number of employees"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Business Premises Details */}
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

      {/* Legal Information */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Legal Information
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      {/* Comments and Verification */}
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
              Field Executive Comments
            </label>
            <textarea
              rows={3}
              value={formData.businessVerification?.fieldExecutiveComments || ''}
              onChange={(e) => handleChange('businessVerification.fieldExecutiveComments', e.target.value)}
              className={getInputClass('businessVerification.fieldExecutiveComments')}
              placeholder="Enter field executive comments"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <option value="VERY_GOOD">Very Good</option>
                <option value="GOOD">Good</option>
                <option value="AVERAGE">Average</option>
                <option value="POOR">Poor</option>
              </select>
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
    </div>
  );
};

export default BusinessVerificationForm;