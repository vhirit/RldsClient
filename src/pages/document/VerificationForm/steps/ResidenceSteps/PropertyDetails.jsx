import React from 'react';

const PropertyDetails = ({ formData, setFormData, onSectionSave }) => {
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`;
  };

  const residence = formData.residenceVerification || {};

  return (
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Ownership Residence</label>
          <select
            value={residence.ownershipResidence || ''}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Type of Residence</label>
          <select
            value={residence.typeOfResidence || ''}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Interior Furniture</label>
          <select
            value={residence.interiorFurniture || ''}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Type of Roof</label>
          <select
            value={residence.typeOfRoof || ''}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of floors</label>
          <input
            type="number"
            value={residence.numberOfFloors || ''}
            onChange={(e) => handleChange('residenceVerification.numberOfFloors', e.target.value)}
            className={getInputClass('residenceVerification.numberOfFloors')}
            placeholder="Enter number of floors"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Area Sq-Ft</label>
          <input
            type="number"
            value={residence.areaSqFt || ''}
            onChange={(e) => handleChange('residenceVerification.areaSqFt', e.target.value)}
            className={getInputClass('residenceVerification.areaSqFt')}
            placeholder="Enter area in sq ft"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicles found at Residence</label>
          <input
            type="text"
            value={residence.vehiclesFoundAtResidence || ''}
            onChange={(e) => handleChange('residenceVerification.vehiclesFoundAtResidence', e.target.value)}
            className={getInputClass('residenceVerification.vehiclesFoundAtResidence')}
            placeholder="List vehicles found"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Stay</label>
          <input
            type="number"
            value={residence.yearsOfStay || ''}
            onChange={(e) => handleChange('residenceVerification.yearsOfStay', e.target.value)}
            className={getInputClass('residenceVerification.yearsOfStay')}
            placeholder="Years"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Months of Stay</label>
          <input
            type="number"
            value={residence.monthsOfStay || ''}
            onChange={(e) => handleChange('residenceVerification.monthsOfStay', e.target.value)}
            className={getInputClass('residenceVerification.monthsOfStay')}
            placeholder="Months"
            min="0"
            max="11"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name plate sighted</label>
          <select
            value={residence.namePlateSighted || ''}
            onChange={(e) => handleChange('residenceVerification.namePlateSighted', e.target.value)}
            className={getInputClass('residenceVerification.namePlateSighted')}
          >
            <option value="">Select option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entry into residence permitted</label>
          <select
            value={residence.entryIntoResidencePermitted || ''}
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
  );
};

export default PropertyDetails;
