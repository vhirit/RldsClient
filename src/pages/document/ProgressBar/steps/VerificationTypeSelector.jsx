import React from 'react';

const VerificationTypeSelector = ({ selectedType, onTypeChange, errors, validateField }) => {
  const verificationTypes = [
    { value: 'residence', label: 'Residence Verification', icon: '🏠' },
    { value: 'office', label: 'Office Verification', icon: '🏢' },
    { value: 'business', label: 'Business Verification', icon: '🏪' },
    { value: 'all', label: 'All Verifications', icon: '📋' }
  ];

  // Convert selectedType to array if it's not already
  const selectedTypes = Array.isArray(selectedType) ? selectedType : (selectedType ? [selectedType] : []);

  const handleTypeChange = (type) => {
    let newSelection;
    
    if (type === 'all') {
      // If 'all' is selected, clear other selections and select only 'all'
      newSelection = selectedTypes.includes('all') ? [] : ['all'];
    } else {
      // Handle individual selections
      if (selectedTypes.includes(type)) {
        // Remove if already selected
        newSelection = selectedTypes.filter(t => t !== type && t !== 'all');
      } else {
        // Add to selection, but remove 'all' if it was selected
        newSelection = [...selectedTypes.filter(t => t !== 'all'), type];
      }
    }
    
    onTypeChange(newSelection.length === 1 ? newSelection[0] : newSelection);
    if (validateField) {
      validateField('verificationType', newSelection, { required: true });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Types</h2>
        <p className="text-gray-600">Select one or multiple verification types you want to complete. You can select any combination except when choosing "All Verifications".</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verificationTypes.map((type) => {
            const isSelected = selectedTypes.includes(type.value);
            const isDisabled = type.value !== 'all' && selectedTypes.includes('all');
            
            return (
              <div key={type.value} className="relative">
                <input
                  type="checkbox"
                  id={type.value}
                  name="verificationType"
                  value={type.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => handleTypeChange(type.value)}
                  className="sr-only"
                />
                <label
                  htmlFor={type.value}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700'
                  } ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    errors && errors.verificationType ? 'border-red-500 bg-red-50' : ''
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium text-center">{type.label}</div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            );
          })}
        </div>

        {errors && errors.verificationType && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.verificationType}
          </p>
        )}
      </div>

      {selectedTypes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Selected verifications:</strong>
                <br />
                {selectedTypes.includes('all') && 'All verification types: residence, office, and business verification forms.'}
                {!selectedTypes.includes('all') && (
                  <>
                    {selectedTypes.includes('residence') && '• Residence verification (address, property, personal details)\n'}
                    {selectedTypes.includes('office') && '• Office/Employee verification (company, employment details)\n'}
                    {selectedTypes.includes('business') && '• Business verification (business premises, commercial details)\n'}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationTypeSelector;