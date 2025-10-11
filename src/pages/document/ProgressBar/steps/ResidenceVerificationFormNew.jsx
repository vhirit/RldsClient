import React from 'react';

const ResidenceVerificationForm = ({ formData, handleChange, getInputClass, getFieldError }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Residence Verification Form</h2>
        <p className="text-blue-100">Complete residential verification details</p>
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

      {/* Address Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Address Information
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Present Address *
            </label>
            <textarea
              rows={3}
              value={formData.residenceVerification?.presentAddress || ''}
              onChange={(e) => handleChange('residenceVerification.presentAddress', e.target.value)}
              className={getInputClass('residenceVerification.presentAddress')}
              placeholder="Enter present address"
            />
            {getFieldError('residenceVerification.presentAddress') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.presentAddress')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permanent Address
            </label>
            <textarea
              rows={3}
              value={formData.residenceVerification?.permanentAddress || ''}
              onChange={(e) => handleChange('residenceVerification.permanentAddress', e.target.value)}
              className={getInputClass('residenceVerification.permanentAddress')}
              placeholder="Enter permanent address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locality
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.locality || ''}
              onChange={(e) => handleChange('residenceVerification.locality', e.target.value)}
              className={getInputClass('residenceVerification.locality')}
              placeholder="Enter locality"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land Mark
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.landMark || ''}
              onChange={(e) => handleChange('residenceVerification.landMark', e.target.value)}
              className={getInputClass('residenceVerification.landMark')}
              placeholder="Enter landmark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accessibility
            </label>
            <select
              value={formData.residenceVerification?.accessibility || ''}
              onChange={(e) => handleChange('residenceVerification.accessibility', e.target.value)}
              className={getInputClass('residenceVerification.accessibility')}
            >
              <option value="">Select accessibility</option>
              <option value="EASY">Easy</option>
              <option value="MODERATE">Moderate</option>
              <option value="DIFFICULT">Difficult</option>
              <option value="VERY_DIFFICULT">Very Difficult</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Within Municipal Limit
            </label>
            <select
              value={formData.residenceVerification?.withinMunicipalLimit || ''}
              onChange={(e) => handleChange('residenceVerification.withinMunicipalLimit', e.target.value)}
              className={getInputClass('residenceVerification.withinMunicipalLimit')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
          </svg>
          Property Details
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ownership Residence
            </label>
            <select
              value={formData.residenceVerification?.ownershipResidence || ''}
              onChange={(e) => handleChange('residenceVerification.ownershipResidence', e.target.value)}
              className={getInputClass('residenceVerification.ownershipResidence')}
            >
              <option value="">Select ownership</option>
              <option value="OWNED">Owned</option>
              <option value="RENTED">Rented</option>
              <option value="COMPANY_PROVIDED">Company Provided</option>
              <option value="PARENTAL">Parental</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Residence
            </label>
            <select
              value={formData.residenceVerification?.typeOfResidence || ''}
              onChange={(e) => handleChange('residenceVerification.typeOfResidence', e.target.value)}
              className={getInputClass('residenceVerification.typeOfResidence')}
            >
              <option value="">Select type</option>
              <option value="INDEPENDENT_HOUSE">Independent House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="FLAT">Flat</option>
              <option value="CHAWL">Chawl</option>
              <option value="SLUM">Slum</option>
              <option value="OTHER">Other</option>
            </select>
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
              <option value="">Select furniture level</option>
              <option value="WELL_FURNISHED">Well Furnished</option>
              <option value="SEMI_FURNISHED">Semi Furnished</option>
              <option value="UNFURNISHED">Unfurnished</option>
              <option value="LUXURIOUS">Luxurious</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Roof
            </label>
            <select
              value={formData.residenceVerification?.typeOfRoof || ''}
              onChange={(e) => handleChange('residenceVerification.typeOfRoof', e.target.value)}
              className={getInputClass('residenceVerification.typeOfRoof')}
            >
              <option value="">Select roof type</option>
              <option value="CONCRETE">Concrete</option>
              <option value="TILE">Tile</option>
              <option value="SHEET">Sheet</option>
              <option value="THATCHED">Thatched</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of floors
            </label>
            <input
              type="number"
              value={formData.residenceVerification?.numberOfFloors || ''}
              onChange={(e) => handleChange('residenceVerification.numberOfFloors', e.target.value)}
              className={getInputClass('residenceVerification.numberOfFloors')}
              placeholder="Enter number of floors"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area Sq-Ft
            </label>
            <input
              type="number"
              value={formData.residenceVerification?.areaSqFt || ''}
              onChange={(e) => handleChange('residenceVerification.areaSqFt', e.target.value)}
              className={getInputClass('residenceVerification.areaSqFt')}
              placeholder="Enter area in sq ft"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicles found at Residence
            </label>
            <input
              type="text"
              value={formData.residenceVerification?.vehiclesFoundAtResidence || ''}
              onChange={(e) => handleChange('residenceVerification.vehiclesFoundAtResidence', e.target.value)}
              className={getInputClass('residenceVerification.vehiclesFoundAtResidence')}
              placeholder="List vehicles found"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Stay
            </label>
            <input
              type="number"
              value={formData.residenceVerification?.yearsOfStay || ''}
              onChange={(e) => handleChange('residenceVerification.yearsOfStay', e.target.value)}
              className={getInputClass('residenceVerification.yearsOfStay')}
              placeholder="Years"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Months of Stay
            </label>
            <input
              type="number"
              value={formData.residenceVerification?.monthsOfStay || ''}
              onChange={(e) => handleChange('residenceVerification.monthsOfStay', e.target.value)}
              className={getInputClass('residenceVerification.monthsOfStay')}
              placeholder="Months"
              min="0"
              max="11"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name plate sighted
            </label>
            <select
              value={formData.residenceVerification?.namePlateSighted || ''}
              onChange={(e) => handleChange('residenceVerification.namePlateSighted', e.target.value)}
              className={getInputClass('residenceVerification.namePlateSighted')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry into residence permitted
            </label>
            <select
              value={formData.residenceVerification?.entryIntoResidencePermitted || ''}
              onChange={(e) => handleChange('residenceVerification.entryIntoResidencePermitted', e.target.value)}
              className={getInputClass('residenceVerification.entryIntoResidencePermitted')}
            >
              <option value="">Select option</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Personal Information */}
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
              value={formData.residenceVerification?.dateOfBirth || ''}
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
              value={formData.residenceVerification?.aadharCardNo || ''}
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
              value={formData.residenceVerification?.panCardNo || ''}
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
              value={formData.residenceVerification?.mobileNo1 || ''}
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
              value={formData.residenceVerification?.mobileNo2 || ''}
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
              value={formData.residenceVerification?.mobileNo3 || ''}
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
              value={formData.residenceVerification?.qualification || ''}
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
              value={formData.residenceVerification?.totalFamilyMembers || ''}
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
              value={formData.residenceVerification?.visibleItems || ''}
              onChange={(e) => handleChange('residenceVerification.visibleItems', e.target.value)}
              className={getInputClass('residenceVerification.visibleItems')}
              placeholder="List visible items at residence"
            />
          </div>
        </div>
      </div>

      {/* Verification Status */}
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
              value={formData.residenceVerification?.addressConfirmed || ''}
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
              value={formData.residenceVerification?.neighboursVerification || ''}
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
              value={formData.residenceVerification?.neighboursComments || ''}
              onChange={(e) => handleChange('residenceVerification.neighboursComments', e.target.value)}
              className={getInputClass('residenceVerification.neighboursComments')}
              placeholder="Enter neighbours' comments"
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
              COMMENTS
            </label>
            <textarea
              rows={3}
              value={formData.residenceVerification?.comments || ''}
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
              value={formData.residenceVerification?.fieldExecutiveComments || ''}
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
                value={formData.residenceVerification?.verifierName || ''}
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
                value={formData.residenceVerification?.authorizedSignatory || ''}
                onChange={(e) => handleChange('residenceVerification.authorizedSignatory', e.target.value)}
                className={getInputClass('residenceVerification.authorizedSignatory')}
                placeholder="Enter authorized signatory name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  handleChange('residenceVerification.siteImages', files);
                }}
                className="hidden"
                id="residence-site-images"
              />
              <label htmlFor="residence-site-images" className="cursor-pointer">
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
            <p className="text-xs text-red-600 font-medium mt-1">* Upload photos of residence premises (required)</p>
            {getFieldError('residenceVerification.siteImages') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError('residenceVerification.siteImages')}
              </p>
            )}
            {formData.residenceVerification?.siteImages && formData.residenceVerification.siteImages.length > 0 && (
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {formData.residenceVerification.siteImages.length} file(s) selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceVerificationForm;