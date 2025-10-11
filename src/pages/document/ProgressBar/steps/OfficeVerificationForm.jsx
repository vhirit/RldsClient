import React from 'react';

const OfficeVerificationForm = ({ formData, updateFormData, errors, validateField }) => {
  const handleChange = (field, value) => {
    updateFormData(field, value);
    if (validateField) {
      const rules = {
        // Administrative Details
        'officeVerification.dateOfReceipt': { required: true },
        'officeVerification.referenceNo': { required: true },
        'officeVerification.branchName': { required: true },
        
        // Office Address Information
        'officeVerification.officeAddress.street': { required: true },
        'officeVerification.officeAddress.city': { required: true },
        'officeVerification.officeAddress.state': { required: true },
        'officeVerification.officeAddress.pincode': { required: true },
        
        // Company Information
        'officeVerification.exactCompanyName': { required: true },
        'officeVerification.designation': { required: true },
        'officeVerification.employeeId': { required: true },
        'officeVerification.workingSince': { required: true }
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Office/Employee Verification</h2>
        <p className="text-gray-600">Complete office and employment verification details.</p>
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
              Date of Report
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
              Reference No *
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
              Type of Loan
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

      {/* Office Address Information */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Address Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office Street Address *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.officeAddress?.street || ''}
              onChange={(e) => handleChange('officeVerification.officeAddress.street', e.target.value)}
              className={getInputClass('officeVerification.officeAddress.street')}
              placeholder="Enter office street address"
            />
            {getFieldError('officeVerification.officeAddress.street') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.officeAddress.street')}
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
                value={formData.officeVerification?.officeAddress?.city || ''}
                onChange={(e) => handleChange('officeVerification.officeAddress.city', e.target.value)}
                className={getInputClass('officeVerification.officeAddress.city')}
                placeholder="City"
              />
              {getFieldError('officeVerification.officeAddress.city') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('officeVerification.officeAddress.city')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                value={formData.officeVerification?.officeAddress?.state || ''}
                onChange={(e) => handleChange('officeVerification.officeAddress.state', e.target.value)}
                className={getInputClass('officeVerification.officeAddress.state')}
                placeholder="State"
              />
              {getFieldError('officeVerification.officeAddress.state') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('officeVerification.officeAddress.state')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                value={formData.officeVerification?.officeAddress?.pincode || ''}
                onChange={(e) => handleChange('officeVerification.officeAddress.pincode', e.target.value)}
                className={getInputClass('officeVerification.officeAddress.pincode')}
                placeholder="Pincode"
              />
              {getFieldError('officeVerification.officeAddress.pincode') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('officeVerification.officeAddress.pincode')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                value={formData.officeVerification?.officeAddress?.country || 'India'}
                onChange={(e) => handleChange('officeVerification.officeAddress.country', e.target.value)}
                className={getInputClass('officeVerification.officeAddress.country')}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company & Employment Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              Employee ID *
            </label>
            <input
              type="text"
              value={formData.officeVerification?.employeeId || ''}
              onChange={(e) => handleChange('officeVerification.employeeId', e.target.value)}
              className={getInputClass('officeVerification.employeeId')}
              placeholder="Enter employee ID"
            />
            {getFieldError('officeVerification.employeeId') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.employeeId')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Since *
            </label>
            <input
              type="date"
              value={formData.officeVerification?.workingSince || ''}
              onChange={(e) => handleChange('officeVerification.workingSince', e.target.value)}
              className={getInputClass('officeVerification.workingSince')}
            />
            {getFieldError('officeVerification.workingSince') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('officeVerification.workingSince')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Salary (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.officeVerification?.netSalary || ''}
              onChange={(e) => handleChange('officeVerification.netSalary', e.target.value)}
              className={getInputClass('officeVerification.netSalary')}
              placeholder="Enter net salary"
            />
          </div>

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
              Number of Employees Seen
            </label>
            <input
              type="number"
              min="0"
              value={formData.officeVerification?.numberOfEmployeesSeen || ''}
              onChange={(e) => handleChange('officeVerification.numberOfEmployeesSeen', e.target.value)}
              className={getInputClass('officeVerification.numberOfEmployeesSeen')}
              placeholder="Number of employees"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Landmark
            </label>
            <input
              type="text"
              value={formData.officeVerification?.landMark || ''}
              onChange={(e) => handleChange('officeVerification.landMark', e.target.value)}
              className={getInputClass('officeVerification.landMark')}
              placeholder="Enter landmark"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              Designation of Person
            </label>
            <input
              type="text"
              value={formData.officeVerification?.designationOfPerson || ''}
              onChange={(e) => handleChange('officeVerification.designationOfPerson', e.target.value)}
              className={getInputClass('officeVerification.designationOfPerson')}
              placeholder="Enter designation"
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
              placeholder="Enter mobile number"
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
              placeholder="Enter mobile number"
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
                id="personContacted"
                checked={formData.officeVerification?.personContacted || false}
                onChange={(e) => handleChange('officeVerification.personContacted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="personContacted" className="text-sm font-medium text-gray-700">
                Person Contacted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="personMet"
                checked={formData.officeVerification?.personMet || false}
                onChange={(e) => handleChange('officeVerification.personMet', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="personMet" className="text-sm font-medium text-gray-700">
                Person Met
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="nameBoardSighted"
                checked={formData.officeVerification?.nameBoardSighted || false}
                onChange={(e) => handleChange('officeVerification.nameBoardSighted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="nameBoardSighted" className="text-sm font-medium text-gray-700">
                Name Board Sighted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="businessActivitySeen"
                checked={formData.officeVerification?.businessActivitySeen || false}
                onChange={(e) => handleChange('officeVerification.businessActivitySeen', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="businessActivitySeen" className="text-sm font-medium text-gray-700">
                Business Activity Seen
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="equipmentSighted"
                checked={formData.officeVerification?.equipmentSighted || false}
                onChange={(e) => handleChange('officeVerification.equipmentSighted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="equipmentSighted" className="text-sm font-medium text-gray-700">
                Equipment Sighted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="visitingCardObtained"
                checked={formData.officeVerification?.visitingCardObtained || false}
                onChange={(e) => handleChange('officeVerification.visitingCardObtained', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="visitingCardObtained" className="text-sm font-medium text-gray-700">
                Visiting Card Obtained
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="residenceCumOffice"
                checked={formData.officeVerification?.residenceCumOffice || false}
                onChange={(e) => handleChange('officeVerification.residenceCumOffice', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="residenceCumOffice" className="text-sm font-medium text-gray-700">
                Residence cum Office
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="workConfirmed"
                checked={formData.officeVerification?.workConfirmed || false}
                onChange={(e) => handleChange('officeVerification.workConfirmed', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="workConfirmed" className="text-sm font-medium text-gray-700">
                Work Confirmed
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              rows="4"
              value={formData.officeVerification?.comments || ''}
              onChange={(e) => handleChange('officeVerification.comments', e.target.value)}
              className={getInputClass('officeVerification.comments')}
              placeholder="Enter verification comments..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Executive Comments
            </label>
            <textarea
              rows="3"
              value={formData.officeVerification?.fieldExecutiveComments || ''}
              onChange={(e) => handleChange('officeVerification.fieldExecutiveComments', e.target.value)}
              className={getInputClass('officeVerification.fieldExecutiveComments')}
              placeholder="Enter field executive comments..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeVerificationForm;