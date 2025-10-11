import React from 'react';

const OfficeVerificationForm = ({ formData, handleChange, getInputClass, getFieldError }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Office / Employee Verification Form</h2>
        <p className="text-emerald-100">Complete office and employment verification details</p>
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
              value={formData.officeVerification?.dateOfReceipt || ''}
              onChange={(e) => handleChange('officeVerification.dateOfReceipt', e.target.value)}
              className={getInputClass('officeVerification.dateOfReceipt')}
            />
            {getFieldError('officeVerification.dateOfReceipt') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.dateOfReceipt')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Of The Report
            </label>
            <input
              type="date"
              value={formData.officeVerification?.dateOfReport || ''}
              onChange={(e) => handleChange('officeVerification.dateOfReport', e.target.value)}
              className={getInputClass('officeVerification.dateOfReport')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              REFERENCE NO *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.referenceNo || ''}
              onChange={(e) => handleChange('officeVerification.referenceNo', e.target.value)}
              className={getInputClass('officeVerification.referenceNo')}
              placeholder="Enter reference number"
            />
            {getFieldError('officeVerification.referenceNo') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.referenceNo')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.branchName || ''}
              onChange={(e) => handleChange('officeVerification.branchName', e.target.value)}
              className={getInputClass('officeVerification.branchName')}
              placeholder="Enter branch name"
            />
            {getFieldError('officeVerification.branchName') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.branchName')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type Of Loan
            </label>
            <select
              value={formData.officeVerification?.typeOfLoan || ''}
              onChange={(e) => handleChange('officeVerification.typeOfLoan', e.target.value)}
              className={getInputClass('officeVerification.typeOfLoan')}
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
        </div>
      </div>

      {/* Office Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Office Information
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office Address *
            </label>
            <textarea
              rows={3}
              value={formData.officeVerification?.officeAddress || ''}
              onChange={(e) => handleChange('officeVerification.officeAddress', e.target.value)}
              className={getInputClass('officeVerification.officeAddress')}
              placeholder="Enter complete office address"
            />
            {getFieldError('officeVerification.officeAddress') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.officeAddress')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exact Company Name *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.exactCompanyName || ''}
              onChange={(e) => handleChange('officeVerification.exactCompanyName', e.target.value)}
              className={getInputClass('officeVerification.exactCompanyName')}
              placeholder="Enter exact company name"
            />
            {getFieldError('officeVerification.exactCompanyName') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.exactCompanyName')}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office Floor
            </label>
            <input
              type="text"
              value={formData.officeVerification?.officeFloor || ''}
              onChange={(e) => handleChange('officeVerification.officeFloor', e.target.value)}
              className={getInputClass('officeVerification.officeFloor')}
              placeholder="Enter office floor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land Mark
            </label>
            <input
              type="text"
              value={formData.officeVerification?.landMark || ''}
              onChange={(e) => handleChange('officeVerification.landMark', e.target.value)}
              className={getInputClass('officeVerification.landMark')}
              placeholder="Enter landmark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name Board Sighted
            </label>
            <select
              value={formData.officeVerification?.nameBoardSighted || ''}
              onChange={(e) => handleChange('officeVerification.nameBoardSighted', e.target.value)}
              className={getInputClass('officeVerification.nameBoardSighted')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Employee Details
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.designation || ''}
              onChange={(e) => handleChange('officeVerification.designation', e.target.value)}
              className={getInputClass('officeVerification.designation')}
              placeholder="Enter designation"
            />
            {getFieldError('officeVerification.designation') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.designation')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={formData.officeVerification?.employeeId || ''}
              onChange={(e) => handleChange('officeVerification.employeeId', e.target.value)}
              className={getInputClass('officeVerification.employeeId')}
              placeholder="Enter employee ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Since
            </label>
            <input
              type="date"
              value={formData.officeVerification?.workingSince || ''}
              onChange={(e) => handleChange('officeVerification.workingSince', e.target.value)}
              className={getInputClass('officeVerification.workingSince')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Salary
            </label>
            <input
              type="number"
              value={formData.officeVerification?.netSalary || ''}
              onChange={(e) => handleChange('officeVerification.netSalary', e.target.value)}
              className={getInputClass('officeVerification.netSalary')}
              placeholder="Enter net salary"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
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
              value={formData.officeVerification?.personContacted || ''}
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
              value={formData.officeVerification?.personContactedName || ''}
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
              value={formData.officeVerification?.personMet || ''}
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
              value={formData.officeVerification?.personMetName || ''}
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
              value={formData.officeVerification?.designationOfPerson || ''}
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
              value={formData.officeVerification?.mobileNo1 || ''}
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
              value={formData.officeVerification?.mobileNo2 || ''}
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
              value={formData.officeVerification?.mobileNo3 || ''}
              onChange={(e) => handleChange('officeVerification.mobileNo3', e.target.value)}
              className={getInputClass('officeVerification.mobileNo3')}
              placeholder="Enter third mobile number"
              maxLength="10"
            />
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Business Details
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nature of Business
            </label>
            <input
              type="text"
              value={formData.officeVerification?.natureOfBusiness || ''}
              onChange={(e) => handleChange('officeVerification.natureOfBusiness', e.target.value)}
              className={getInputClass('officeVerification.natureOfBusiness')}
              placeholder="Enter nature of business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of employees seen
            </label>
            <input
              type="number"
              value={formData.officeVerification?.numberOfEmployeesSeen || ''}
              onChange={(e) => handleChange('officeVerification.numberOfEmployeesSeen', e.target.value)}
              className={getInputClass('officeVerification.numberOfEmployeesSeen')}
              placeholder="Number of employees"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Activity seen
            </label>
            <select
              value={formData.officeVerification?.businessActivitySeen || ''}
              onChange={(e) => handleChange('officeVerification.businessActivitySeen', e.target.value)}
              className={getInputClass('officeVerification.businessActivitySeen')}
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
              value={formData.officeVerification?.equipmentSighted || ''}
              onChange={(e) => handleChange('officeVerification.equipmentSighted', e.target.value)}
              className={getInputClass('officeVerification.equipmentSighted')}
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
              value={formData.officeVerification?.visitingCardObtained || ''}
              onChange={(e) => handleChange('officeVerification.visitingCardObtained', e.target.value)}
              className={getInputClass('officeVerification.visitingCardObtained')}
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
              value={formData.officeVerification?.residenceCumOffice || ''}
              onChange={(e) => handleChange('officeVerification.residenceCumOffice', e.target.value)}
              className={getInputClass('officeVerification.residenceCumOffice')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Confirmed
            </label>
            <select
              value={formData.officeVerification?.workConfirmed || ''}
              onChange={(e) => handleChange('officeVerification.workConfirmed', e.target.value)}
              className={getInputClass('officeVerification.workConfirmed')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
              <option value="PARTIAL">Partial</option>
            </select>
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
              COMMENTS
            </label>
            <textarea
              rows={3}
              value={formData.officeVerification?.comments || ''}
              onChange={(e) => handleChange('officeVerification.comments', e.target.value)}
              className={getInputClass('officeVerification.comments')}
              placeholder="Enter general comments"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Executive Comments
            </label>
            <textarea
              rows={3}
              value={formData.officeVerification?.fieldExecutiveComments || ''}
              onChange={(e) => handleChange('officeVerification.fieldExecutiveComments', e.target.value)}
              className={getInputClass('officeVerification.fieldExecutiveComments')}
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
                value={formData.officeVerification?.verifierName || ''}
                onChange={(e) => handleChange('officeVerification.verifierName', e.target.value)}
                className={getInputClass('officeVerification.verifierName')}
                placeholder="Enter verifier's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authorized Signatory
              </label>
              <input
                type="text"
                value={formData.officeVerification?.authorizedSignatory || ''}
                onChange={(e) => handleChange('officeVerification.authorizedSignatory', e.target.value)}
                className={getInputClass('officeVerification.authorizedSignatory')}
                placeholder="Enter authorized signatory name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Document Upload (Required)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Site Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  handleChange('officeVerification.siteImages', files);
                }}
                className="hidden"
                id="office-site-images"
              />
              <label htmlFor="office-site-images" className="cursor-pointer">
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </label>
            </div>
            <p className="text-xs text-red-600 font-medium mt-1">* Upload photos of office premises (required)</p>
            {getFieldError('officeVerification.siteImages') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.siteImages')}
              </p>
            )}
            {formData.officeVerification?.siteImages && formData.officeVerification.siteImages.length > 0 && (
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {formData.officeVerification.siteImages.length} file(s) selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeVerificationForm;