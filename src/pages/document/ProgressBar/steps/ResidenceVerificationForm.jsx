import React from 'react';

const ResidenceVerificationForm = ({ formData, updateFormData, errors, validateField }) => {
  const handleChange = (field, value) => {
    updateFormData(field, value);
    if (validateField) {
      const rules = {
        // Administrative Details
        'residenceVerification.dateOfReceipt': { required: true },
        'residenceVerification.referenceNo': { required: true },
        'residenceVerification.branchName': { required: true },
        'residenceVerification.applicantName': { required: true },
        
        // Address Information
        'residenceVerification.presentAddress.street': { required: true },
        'residenceVerification.presentAddress.city': { required: true },
        'residenceVerification.presentAddress.state': { required: true },
        'residenceVerification.presentAddress.pincode': { required: true },
        
        // Property Details
        'residenceVerification.ownershipResidence': { required: true },
        'residenceVerification.typeOfResidence': { required: true },
        
        // Personal Information
        'residenceVerification.dateOfBirth': { required: true },
        'residenceVerification.mobileNo1': { required: true, phone: true }
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Residence Verification</h2>
        <p className="text-gray-600">Complete residence verification details as per the requirements.</p>
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
              value={formData.residenceVerification?.dateOfReceipt || ''}
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
              value={formData.residenceVerification?.dateOfReport || ''}
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
              value={formData.residenceVerification?.referenceNo || ''}
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
              value={formData.residenceVerification?.branchName || ''}
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
              value={formData.residenceVerification?.typeOfLoan || ''}
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
              value={formData.residenceVerification?.applicantName || ''}
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
              value={formData.residenceVerification?.relationshipOfPerson || ''}
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

      {/* Present Address Information */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Present Address Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.presentAddress?.street || ''}
              onChange={(e) => handleChange('residenceVerification.presentAddress.street', e.target.value)}
              className={getInputClass('residenceVerification.presentAddress.street')}
              placeholder="Enter street address"
            />
            {getFieldError('residenceVerification.presentAddress.street') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.presentAddress.street')}
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
                value={formData.residenceVerification?.presentAddress?.city || ''}
                onChange={(e) => handleChange('residenceVerification.presentAddress.city', e.target.value)}
                className={getInputClass('residenceVerification.presentAddress.city')}
                placeholder="City"
              />
              {getFieldError('residenceVerification.presentAddress.city') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('residenceVerification.presentAddress.city')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                value={formData.residenceVerification?.presentAddress?.state || ''}
                onChange={(e) => handleChange('residenceVerification.presentAddress.state', e.target.value)}
                className={getInputClass('residenceVerification.presentAddress.state')}
                placeholder="State"
              />
              {getFieldError('residenceVerification.presentAddress.state') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('residenceVerification.presentAddress.state')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                value={formData.residenceVerification?.presentAddress?.pincode || ''}
                onChange={(e) => handleChange('residenceVerification.presentAddress.pincode', e.target.value)}
                className={getInputClass('residenceVerification.presentAddress.pincode')}
                placeholder="Pincode"
              />
              {getFieldError('residenceVerification.presentAddress.pincode') && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {getFieldError('residenceVerification.presentAddress.pincode')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                value={formData.residenceVerification?.presentAddress?.country || 'India'}
                onChange={(e) => handleChange('residenceVerification.presentAddress.country', e.target.value)}
                className={getInputClass('residenceVerification.presentAddress.country')}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ownership of Residence *
            </label>
            <select
              value={formData.residenceVerification?.ownershipResidence || ''}
              onChange={(e) => handleChange('residenceVerification.ownershipResidence', e.target.value)}
              className={getInputClass('residenceVerification.ownershipResidence')}
            >
              <option value="">Select ownership type</option>
              <option value="OWNED">Owned</option>
              <option value="RENTED">Rented</option>
              <option value="PARENTAL">Parental</option>
              <option value="COMPANY_PROVIDED">Company Provided</option>
              <option value="OTHER">Other</option>
            </select>
            {getFieldError('residenceVerification.ownershipResidence') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.ownershipResidence')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Residence *
            </label>
            <select
              value={formData.residenceVerification?.typeOfResidence || ''}
              onChange={(e) => handleChange('residenceVerification.typeOfResidence', e.target.value)}
              className={getInputClass('residenceVerification.typeOfResidence')}
            >
              <option value="">Select residence type</option>
              <option value="INDEPENDENT_HOUSE">Independent House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="CHAWL">Chawl</option>
              <option value="SLUM">Slum</option>
              <option value="OTHER">Other</option>
            </select>
            {getFieldError('residenceVerification.typeOfResidence') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.typeOfResidence')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interior Furniture
            </label>
            <select
              value={formData.residenceVerification?.interiorFurniture || ''}
              onChange={(e) => handleChange('residenceVerification.interiorFurniture', e.target.value)}
              className={getInputClass('residenceVerification.interiorFurniture')}
            >
              <option value="">Select furniture type</option>
              <option value="WELL_FURNISHED">Well Furnished</option>
              <option value="FURNISHED">Furnished</option>
              <option value="SEMI_FURNISHED">Semi Furnished</option>
              <option value="UNFURNISHED">Unfurnished</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Stay
            </label>
            <input
              type="number"
              min="0"
              value={formData.residenceVerification?.yearsOfStay || ''}
              onChange={(e) => handleChange('residenceVerification.yearsOfStay', e.target.value)}
              className={getInputClass('residenceVerification.yearsOfStay')}
              placeholder="Years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Months of Stay
            </label>
            <input
              type="number"
              min="0"
              max="11"
              value={formData.residenceVerification?.monthsOfStay || ''}
              onChange={(e) => handleChange('residenceVerification.monthsOfStay', e.target.value)}
              className={getInputClass('residenceVerification.monthsOfStay')}
              placeholder="Months"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (Sq Ft)
            </label>
            <input
              type="number"
              min="0"
              value={formData.residenceVerification?.areaSqFt || ''}
              onChange={(e) => handleChange('residenceVerification.areaSqFt', e.target.value)}
              className={getInputClass('residenceVerification.areaSqFt')}
              placeholder="Square feet"
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.residenceVerification?.dateOfBirth || ''}
              onChange={(e) => handleChange('residenceVerification.dateOfBirth', e.target.value)}
              className={getInputClass('residenceVerification.dateOfBirth')}
            />
            {getFieldError('residenceVerification.dateOfBirth') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.dateOfBirth')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile No 1 *
            </label>
            <input
              type="tel"
              value={formData.residenceVerification?.mobileNo1 || ''}
              onChange={(e) => handleChange('residenceVerification.mobileNo1', e.target.value)}
              className={getInputClass('residenceVerification.mobileNo1')}
              placeholder="Enter mobile number"
            />
            {getFieldError('residenceVerification.mobileNo1') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.mobileNo1')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhar Card No
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.aadharCardNo || ''}
              onChange={(e) => handleChange('residenceVerification.aadharCardNo', e.target.value)}
              className={getInputClass('residenceVerification.aadharCardNo')}
              placeholder="Enter Aadhar number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN Card No
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.panCardNo || ''}
              onChange={(e) => handleChange('residenceVerification.panCardNo', e.target.value)}
              className={getInputClass('residenceVerification.panCardNo')}
              placeholder="Enter PAN number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualification
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.qualification || ''}
              onChange={(e) => handleChange('residenceVerification.qualification', e.target.value)}
              className={getInputClass('residenceVerification.qualification')}
              placeholder="Enter qualification"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Family Members
            </label>
            <input
              type="number"
              min="1"
              value={formData.residenceVerification?.totalFamilyMembers || ''}
              onChange={(e) => handleChange('residenceVerification.totalFamilyMembers', e.target.value)}
              className={getInputClass('residenceVerification.totalFamilyMembers')}
              placeholder="Number of family members"
            />
          </div>
        </div>
      </div>

      {/* Verification Details */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="addressConfirmed"
                checked={formData.residenceVerification?.addressConfirmed || false}
                onChange={(e) => handleChange('residenceVerification.addressConfirmed', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="addressConfirmed" className="text-sm font-medium text-gray-700">
                Address Confirmed
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="namePlateSighted"
                checked={formData.residenceVerification?.namePlateSighted || false}
                onChange={(e) => handleChange('residenceVerification.namePlateSighted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="namePlateSighted" className="text-sm font-medium text-gray-700">
                Name Plate Sighted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="entryIntoResidencePermitted"
                checked={formData.residenceVerification?.entryIntoResidencePermitted || false}
                onChange={(e) => handleChange('residenceVerification.entryIntoResidencePermitted', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="entryIntoResidencePermitted" className="text-sm font-medium text-gray-700">
                Entry Into Residence Permitted
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="neighboursVerification"
                checked={formData.residenceVerification?.neighboursVerification || false}
                onChange={(e) => handleChange('residenceVerification.neighboursVerification', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="neighboursVerification" className="text-sm font-medium text-gray-700">
                Neighbours Verification Done
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              rows="4"
              value={formData.residenceVerification?.comments || ''}
              onChange={(e) => handleChange('residenceVerification.comments', e.target.value)}
              className={getInputClass('residenceVerification.comments')}
              placeholder="Enter verification comments..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Executive Comments
            </label>
            <textarea
              rows="3"
              value={formData.residenceVerification?.fieldExecutiveComments || ''}
              onChange={(e) => handleChange('residenceVerification.fieldExecutiveComments', e.target.value)}
              className={getInputClass('residenceVerification.fieldExecutiveComments')}
              placeholder="Enter field executive comments..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceVerificationForm;