import React, { useState } from 'react';

const ConfidentialReport = () => {
  const [selectedAddress, setSelectedAddress] = useState({
    office: false,
    home: false
  });
  const [formData, setFormData] = useState({
    // Common fields
    dateOfReceipt: '',
    dateOfReport: '',
    branchName: '',
    branchManagerName: '',
    loanType: '',
    applicantName: '',
    
    // Office Address
    officePresentAddress: '',
    officePermanentAddress: '',
    officeLocality: '',
    officeAccessibility: '',
    officeMotorable: '',
    officeInteriorFurniture: '',
    officeTypeOfRoof: '',
    officeNumberOfFloors: '',
    officeVehicles: '',
    officeVisibleItems: '',
    officeLandMark: '',
    officeNeighboursVerification: '',
    officeAreaSqFt: '',
    officeTypeOfResidence: '',
    officeWithinMunicipalLimit: '',
    officeFieldExecutiveComments: '',
    
    // Home Address
    homePresentAddress: '',
    homePermanentAddress: '',
    homeLocality: '',
    homeAccessibility: '',
    homeMotorable: '',
    homeInteriorFurniture: '',
    homeTypeOfRoof: '',
    homeNumberOfFloors: '',
    homeVehicles: '',
    homeVisibleItems: '',
    homeLandMark: '',
    homeNeighboursVerification: '',
    homeAreaSqFt: '',
    homeTypeOfResidence: '',
    homeWithinMunicipalLimit: '',
    homeFieldExecutiveComments: '',

    // Personal Details (common)
    dateOfBirth: '',
    adharCardNo: '',
    panCardNo: '',
    qualification: '',
    mobileNo1: '',
    mobileNo2: '',
    verifiersName: '',
    authorizedSignatory: '',
    
    // Personal Details - Residence
    residenceType: '',
    ownershipResidence: '',
    yearsOfStay: '',
    numberOfDependents: '',
    totalFamilyMembers: '',
    entryPermitted: '',
    
    // Neighborhood Check
    neighborsVerification: '',
    neighborhoodComments: ''
  });

  const handleAddressChange = (type) => {
    setSelectedAddress(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Report submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-800 text-white py-4 px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold uppercase">CONFIDENTIAL REPORT</h1>
            <div className="border-t border-white mt-2 pt-2 flex justify-between text-sm">
              <span>Date Of The Receipt of the File: {formData.dateOfReceipt}</span>
              <span>Date Of The Report: {formData.dateOfReport}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Address Type Selection */}
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Address Type(s) for Verification</h3>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAddress.office}
                  onChange={() => handleAddressChange('office')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Office Address</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAddress.home}
                  onChange={() => handleAddressChange('home')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Home Address</span>
              </label>
            </div>
          </div>

          {/* Common Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Of The Receipt of the File</label>
                <input
                  type="date"
                  name="dateOfReceipt"
                  value={formData.dateOfReceipt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Of The Report</label>
                <input
                  type="date"
                  name="dateOfReport"
                  value={formData.dateOfReport}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Manager Name</label>
                <input
                  type="text"
                  name="branchManagerName"
                  value={formData.branchManagerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type Of Loan</label>
                <input
                  type="text"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Applicant (Mr/Mrs/Ms)</label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Office Address Section */}
          {selectedAddress.office && (
            <div className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Office Address Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Present Address</label>
                  <textarea
                    name="officePresentAddress"
                    value={formData.officePresentAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <textarea
                    name="officePermanentAddress"
                    value={formData.officePermanentAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Office Observations */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-3">OBSERVATIONS - Office</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                      <select
                        name="officeLocality"
                        value={formData.officeLocality}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="RESIDENTIAL BUILDING">RESIDENTIAL BUILDING</option>
                        <option value="COMMERCIAL BUILDING">COMMERCIAL BUILDING</option>
                        <option value="INDUSTRIAL AREA">INDUSTRIAL AREA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility</label>
                      <select
                        name="officeAccessibility"
                        value={formData.officeAccessibility}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="EASY TO LOCATE AND ACCESS">EASY TO LOCATE AND ACCESS</option>
                        <option value="MODERATE ACCESS">MODERATE ACCESS</option>
                        <option value="DIFFICULT TO ACCESS">DIFFICULT TO ACCESS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Is the entrance motorable</label>
                      <select
                        name="officeMotorable"
                        value={formData.officeMotorable}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interior Furniture</label>
                      <input
                        type="text"
                        name="officeInteriorFurniture"
                        value={formData.officeInteriorFurniture}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type of Roof</label>
                      <input
                        type="text"
                        name="officeTypeOfRoof"
                        value={formData.officeTypeOfRoof}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of floors</label>
                      <input
                        type="text"
                        name="officeNumberOfFloors"
                        value={formData.officeNumberOfFloors}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field Executive Comments</label>
                      <textarea
                        name="officeFieldExecutiveComments"
                        value={formData.officeFieldExecutiveComments}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Home Address Section */}
          {selectedAddress.home && (
            <div className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Home Address Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Present Address</label>
                  <textarea
                    name="homePresentAddress"
                    value={formData.homePresentAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <textarea
                    name="homePermanentAddress"
                    value={formData.homePermanentAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Home Observations */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-3">OBSERVATIONS - Home</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                      <select
                        name="homeLocality"
                        value={formData.homeLocality}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="RESIDENTIAL BUILDING">RESIDENTIAL BUILDING</option>
                        <option value="COMMERCIAL BUILDING">COMMERCIAL BUILDING</option>
                        <option value="INDUSTRIAL AREA">INDUSTRIAL AREA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility</label>
                      <select
                        name="homeAccessibility"
                        value={formData.homeAccessibility}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="EASY TO LOCATE AND ACCESS">EASY TO LOCATE AND ACCESS</option>
                        <option value="MODERATE ACCESS">MODERATE ACCESS</option>
                        <option value="DIFFICULT TO ACCESS">DIFFICULT TO ACCESS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Is the entrance motorable</label>
                      <select
                        name="homeMotorable"
                        value={formData.homeMotorable}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interior Furniture</label>
                      <input
                        type="text"
                        name="homeInteriorFurniture"
                        value={formData.homeInteriorFurniture}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type of Roof</label>
                      <input
                        type="text"
                        name="homeTypeOfRoof"
                        value={formData.homeTypeOfRoof}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of floors</label>
                      <input
                        type="text"
                        name="homeNumberOfFloors"
                        value={formData.homeNumberOfFloors}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field Executive Comments</label>
                      <textarea
                        name="homeFieldExecutiveComments"
                        value={formData.homeFieldExecutiveComments}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">PERSONAL DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adhar Card No</label>
                <input
                  type="text"
                  name="adharCardNo"
                  value={formData.adharCardNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pan Card No</label>
                <input
                  type="text"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No 1</label>
                <input
                  type="text"
                  name="mobileNo1"
                  value={formData.mobileNo1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No 2</label>
                <input
                  type="text"
                  name="mobileNo2"
                  value={formData.mobileNo2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verifier's Name</label>
                <input
                  type="text"
                  name="verifiersName"
                  value={formData.verifiersName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Authorized Signatory</label>
                <input
                  type="text"
                  name="authorizedSignatory"
                  value={formData.authorizedSignatory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Generate Confidential Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfidentialReport;