import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import FileUpload from './FileUpload';
import ValidationModal from './ValidationModal';
import { 
  LOAN_TYPES, 
  APPLICANT_TYPES,
  RESIDENCE_TYPES,
  OWNERSHIP_TYPES,
  FURNITURE_TYPES,
  ROOF_TYPES,
  FLOOR_TYPES,
  VEHICLE_TYPES,
  LOCALITY_TYPES,
  YES_NO_OPTIONS
} from '../utils/constants';

const API_BASE_URL = 'http://localhost:5000';

const ResidenceForm = ({ 
  onSubmit, 
  showSubmitButton = true, 
  currentSection, 
  onSectionChange,
  onSectionSave,
  onCancel,
  sessionId,
  isLastForm = true,
  formNumber = 1,
  totalForms = 1
}) => {
  const [formData, setFormData] = useState({
    // Basic Information
    referenceNo: '',
    sequenceNo: '',
    dateOfReceipt: '',
    dateOfReport: '',
    branchName: '',
    branchManagerName: '',
    typeOfLoan: '',
    applicantName: '',
    applicantType: '',
    
    // Address Details
    presentAddress: '',
    permanentAddress: '',
    sameAsPresent: false,
    locality: '',
    accessibility: '',
    withinMunicipalLimit: '',
    
    // Residence Details
    ownership: '',
    typeOfResidence: '',
    interiorFurniture: '',
    typeOfRoof: '',
    numberOfFloors: '',
    yearsOfStay: '',
    monthsOfStay: '',
    areaSqFt: '',
    namePlateSighted: '',
    entryPermitted: '',
    vehiclesFound: '',
    
    // Personal Details
    dateOfBirth: '',
    aadharCardNo: '',
    panCardNo: '',
    mobileNo1: '',
    mobileNo2: '',
    mobileNo3: '',
    qualification: '',
    visibleItems: '',
    landmark: '',
    totalFamilyMembers: '',
    aadharDocuments: [],
    panDocuments: [],
    
    // Verification Details
    addressConfirmed: '',
    neighboursVerification: '',
    neighboursComments: '',
    relationshipOfPerson: '',
    neighboursCommentsText: '',
    
    // Field Executive Details
    fieldExecutiveComments: '',
    verifiersName: '',
    authorizedSignatory: '',
    
    // Site Images
    siteImages: [],
    otherDocuments: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Define sections in the correct order
  const sections = ['basic', 'address', 'residence', 'personal', 'verification', 'executive', 'images'];

  useEffect(() => {
    loadSectionData();
  }, [currentSection]);

  const loadSectionData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/load-section?section=${currentSection}&formType=residence`,
        { headers: { 'x-session-id': sessionId } }
      );
      if (response.ok) {
        const savedData = await response.json();
        setFormData(prev => ({ ...prev, ...savedData }));
      }
    } catch (error) {
      console.error('Error loading section data:', error);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    // Basic Information validation
    if (!formData.dateOfReceipt || formData.dateOfReceipt.trim() === '') 
      errors.push('dateOfReceipt is required');
    if (!formData.dateOfReport || formData.dateOfReport.trim() === '') 
      errors.push('dateOfReport is required');
    if (!formData.referenceNo || formData.referenceNo.trim() === '') 
      errors.push('referenceNo is required');
    if (!formData.branchName || formData.branchName.trim() === '') 
      errors.push('branchName is required');
    if (!formData.typeOfLoan || formData.typeOfLoan.trim() === '') 
      errors.push('typeOfLoan is required');
    if (!formData.applicantName || formData.applicantName.trim() === '') 
      errors.push('applicantName is required');
    if (!formData.applicantType || formData.applicantType.trim() === '') 
      errors.push('applicantType is required');
    
    // Address Details validation
    if (!formData.presentAddress || formData.presentAddress.trim() === '') 
      errors.push('presentAddress is required');
    
    // Residence Details validation
    if (!formData.ownership || formData.ownership.trim() === '') 
      errors.push('ownership is required');
    if (!formData.typeOfResidence || formData.typeOfResidence.trim() === '') 
      errors.push('typeOfResidence is required');
    
    // Personal Details validation
    if (!formData.dateOfBirth || formData.dateOfBirth.trim() === '') 
      errors.push('dateOfBirth is required');
    if (!formData.aadharCardNo || formData.aadharCardNo.trim() === '') 
      errors.push('aadharCardNo is required');
    if (formData.aadharCardNo && formData.aadharCardNo.trim() !== '' && !/^\d{12}$/.test(formData.aadharCardNo.trim())) {
      errors.push('aadharCardNo must be exactly 12 digits');
    }
    
    // Field Executive validation
    if (!formData.fieldExecutiveComments || formData.fieldExecutiveComments.trim() === '') 
      errors.push('fieldExecutiveComments is required');
    if (!formData.verifiersName || formData.verifiersName.trim() === '') 
      errors.push('verifiersName is required');
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name === 'sameAsPresent' && checked) {
      setFormData(prev => ({
        ...prev,
        sameAsPresent: checked,
        permanentAddress: prev.presentAddress
      }));
    } else if (name === 'presentAddress' && formData.sameAsPresent) {
      setFormData(prev => ({
        ...prev,
        presentAddress: value,
        permanentAddress: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'file' ? files : value
      }));
    }
  };

  const handleFilesChange = (files, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: files
    }));
  };

  const handleSaveSection = async () => {
    try {
      await onSectionSave(currentSection, formData, 'residence');
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleNextSection = async () => {
    await handleSaveSection();
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  const handlePrevSection = async () => {
    await handleSaveSection();
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1]);
    }
  };

  const handleCancelClick = () => {
    // Reset form data locally without API call
    setFormData({
      referenceNo: '',
      sequenceNo: '',
      dateOfReceipt: '',
      dateOfReport: '',
      branchName: '',
      branchManagerName: '',
      typeOfLoan: '',
      applicantName: '',
      applicantType: '',
      presentAddress: '',
      permanentAddress: '',
      sameAsPresent: false,
      locality: '',
      accessibility: '',
      withinMunicipalLimit: '',
      ownership: '',
      typeOfResidence: '',
      interiorFurniture: '',
      typeOfRoof: '',
      numberOfFloors: '',
      yearsOfStay: '',
      monthsOfStay: '',
      areaSqFt: '',
      namePlateSighted: '',
      entryPermitted: '',
      vehiclesFound: '',
      dateOfBirth: '',
      aadharCardNo: '',
      panCardNo: '',
      mobileNo1: '',
      mobileNo2: '',
      mobileNo3: '',
      qualification: '',
      visibleItems: '',
      landmark: '',
      totalFamilyMembers: '',
      aadharDocuments: [],
      panDocuments: [],
      addressConfirmed: '',
      neighboursVerification: '',
      neighboursComments: '',
      relationshipOfPerson: '',
      neighboursCommentsText: '',
      fieldExecutiveComments: '',
      verifiersName: '',
      authorizedSignatory: '',
      siteImages: [],
      otherDocuments: []
    });
    
    if (currentSection === 'images') {
      onCancel(true, 'residence');
    } else {
      onCancel(false, 'residence');
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidation(true);
      return;
    }
    
    setIsLoading(true);
    try {
      await handleSaveSection();
      
      // Submit residence form
      await onSubmit(formData);
      setShowSuccess(true);
      
      // Clear form data after successful submission
      setTimeout(() => {
        setFormData({
          referenceNo: '',
          sequenceNo: '',
          dateOfReceipt: '',
          dateOfReport: '',
          branchName: '',
          branchManagerName: '',
          typeOfLoan: '',
          applicantName: '',
          applicantType: '',
          presentAddress: '',
          permanentAddress: '',
          sameAsPresent: false,
          locality: '',
          accessibility: '',
          withinMunicipalLimit: '',
          ownership: '',
          typeOfResidence: '',
          interiorFurniture: '',
          typeOfRoof: '',
          numberOfFloors: '',
          yearsOfStay: '',
          monthsOfStay: '',
          areaSqFt: '',
          namePlateSighted: '',
          entryPermitted: '',
          vehiclesFound: '',
          dateOfBirth: '',
          aadharCardNo: '',
          panCardNo: '',
          mobileNo1: '',
          mobileNo2: '',
          mobileNo3: '',
          qualification: '',
          visibleItems: '',
          landmark: '',
          totalFamilyMembers: '',
          aadharDocuments: [],
          panDocuments: [],
          addressConfirmed: '',
          neighboursVerification: '',
          neighboursComments: '',
          relationshipOfPerson: '',
          neighboursCommentsText: '',
          fieldExecutiveComments: '',
          verifiersName: '',
          authorizedSignatory: '',
          siteImages: [],
          otherDocuments: []
        });
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldRequirements = {
    dateOfReceipt: "Select the date when the verification file was received from the bank",
    dateOfReport: "Select the date when this verification report is being prepared",
    referenceNo: "Bank reference number (e.g., 032/26/08/2025, SBIN/2024/001)",
    branchName: "Complete bank branch name (e.g., State Bank of India, Main Branch, Kurnool)",
    typeOfLoan: "Choose the type of loan from the dropdown list",
    applicantName: "Full name of the applicant as per official documents",
    applicantType: "Select the relationship: Applicant, Co-Applicant, Guarantor, etc.",
    presentAddress: "Complete current residential address with house number, street, area, city, PIN code",
    ownership: "Select whether the residence is Owned, Rented, Leased, or Parental property",
    typeOfResidence: "Select the type of residence: Independent House, Apartment, Row House, etc.",
    dateOfBirth: "Applicant's date of birth (must be 18+ years old)",
    aadharCardNo: "12-digit Aadhar number without spaces (e.g., 123456789012)",
    fieldExecutiveComments: "Detailed observations from site visit and neighbor verification",
    verifiersName: "Name of the field executive who conducted the verification"
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full transform transition-all modal-enter">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {isLastForm ? 'Submitted Successfully!' : 'Form Completed!'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isLastForm 
              ? 'Residence verification form has been submitted successfully.'
              : `Residence verification completed. Moving to next form... (${formNumber}/${totalForms})`
            }
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  const renderBasicInformation = () => (
    <FormSection title="BASIC INFORMATION" columns={2}>
      <div className="form-field">
        <label className="form-label required">Date Of Receipt of the File</label>
        <input
          type="date"
          name="dateOfReceipt"
          value={formData.dateOfReceipt}
          onChange={handleChange}
          className="form-input"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Date when file was received from bank</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Date Of Report</label>
        <input
          type="date"
          name="dateOfReport"
          value={formData.dateOfReport}
          onChange={handleChange}
          className="form-input"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Date when verification was completed</p>
      </div>

      <div className="form-field">
        <label className="form-label required">REFERENCE NO</label>
        <input
          type="text"
          name="referenceNo"
          value={formData.referenceNo}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., 032/26/08/2025"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Bank reference number format</p>
      </div>

      <div className="form-field">
        <label className="form-label">Sequence #</label>
        <input
          type="text"
          name="sequenceNo"
          value={formData.sequenceNo}
          onChange={handleChange}
          className="form-input"
          placeholder="Sequence number if applicable"
        />
        <p className="text-xs text-gray-500 mt-1">Optional sequence number</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Branch Name</label>
        <input
          type="text"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., State Bank of India, Main Branch"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Complete bank branch name</p>
      </div>

      <div className="form-field">
        <label className="form-label">Branch Manager Name</label>
        <input
          type="text"
          name="branchManagerName"
          value={formData.branchManagerName}
          onChange={handleChange}
          className="form-input"
          placeholder="Name of branch manager"
        />
        <p className="text-xs text-gray-500 mt-1">Optional - for reference</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Type Of Loan</label>
        <select name="typeOfLoan" value={formData.typeOfLoan} onChange={handleChange} className="form-select" required>
          <option value="">Select Loan Type</option>
          {LOAN_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Choose the loan type from list</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Name of the Applicant (Mr/Mrs/Ms)</label>
        <input
          type="text"
          name="applicantName"
          value={formData.applicantName}
          onChange={handleChange}
          className="form-input"
          placeholder="Full name as per Aadhar card"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Applicant's full legal name</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Relationship of the Person</label>
        <select name="applicantType" value={formData.applicantType} onChange={handleChange} className="form-select" required>
          <option value="">Select</option>
          {APPLICANT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Applicant's role in the loan application</p>
      </div>
    </FormSection>
  );

  const renderAddressDetails = () => (
    <FormSection title="ADDRESS DETAILS" columns={1}>
      <div className="form-field form-field-textarea">
        <label className="form-label required">Present Address</label>
        <textarea
          name="presentAddress"
          value={formData.presentAddress}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Complete current address with house number, street, area, city, PIN code"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Full current residential address for verification</p>
      </div>

      <div className="form-field form-field-textarea">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="sameAsPresent"
            checked={formData.sameAsPresent}
            onChange={handleChange}
            className="form-checkbox mr-2"
            id="sameAsPresent"
          />
          <label htmlFor="sameAsPresent" className="text-sm font-medium text-gray-700">
            Same as Present Address
          </label>
        </div>
        <label className="form-label">Permanent Address</label>
        <textarea
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          disabled={formData.sameAsPresent}
          placeholder="Permanent address if different from present address"
        />
        <p className="text-xs text-gray-500 mt-1">Permanent residential address</p>
      </div>

      <div className="form-field">
        <label className="form-label">Locality</label>
        <select name="locality" value={formData.locality} onChange={handleChange} className="form-select">
          <option value="">Select Locality Type</option>
          {LOCALITY_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Type of residential area</p>
      </div>

      <div className="form-field">
        <label className="form-label">Accessibility</label>
        <select name="accessibility" value={formData.accessibility} onChange={handleChange} className="form-select">
          <option value="">Select Accessibility</option>
          <option value="EASY TO LOCATE AND ACCESS">EASY TO LOCATE AND ACCESS</option>
          <option value="DIFFICULT TO LOCATE">DIFFICULT TO LOCATE</option>
          <option value="MODERATE ACCESS">MODERATE ACCESS</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">How easy was it to find the address?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Within Municipal Limit</label>
        <select name="withinMunicipalLimit" value={formData.withinMunicipalLimit} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Is the address within municipal corporation limits?</p>
      </div>
    </FormSection>
  );

  const renderResidenceDetails = () => (
    <FormSection title="RESIDENCE DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label required">Ownership</label>
        <select name="ownership" value={formData.ownership} onChange={handleChange} className="form-select" required>
          <option value="">Select Ownership</option>
          {OWNERSHIP_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Residence ownership status</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Type of Residence</label>
        <select name="typeOfResidence" value={formData.typeOfResidence} onChange={handleChange} className="form-select" required>
          <option value="">Select Residence Type</option>
          {RESIDENCE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Type of residential property</p>
      </div>

      <div className="form-field">
        <label className="form-label">Interior Furniture</label>
        <select name="interiorFurniture" value={formData.interiorFurniture} onChange={handleChange} className="form-select">
          <option value="">Select Furniture Type</option>
          {FURNITURE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Furnishing status of residence</p>
      </div>

      <div className="form-field">
        <label className="form-label">Type of Roof</label>
        <select name="typeOfRoof" value={formData.typeOfRoof} onChange={handleChange} className="form-select">
          <option value="">Select Roof Type</option>
          {ROOF_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Construction type of roof</p>
      </div>

      <div className="form-field">
        <label className="form-label">Number of floors</label>
        <select name="numberOfFloors" value={formData.numberOfFloors} onChange={handleChange} className="form-select">
          <option value="">Select Floor Type</option>
          {FLOOR_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Building structure type</p>
      </div>

      <div className="form-field">
        <label className="form-label">Vehicles found at Residence</label>
        <select name="vehiclesFound" value={formData.vehiclesFound} onChange={handleChange} className="form-select">
          <option value="">Select Vehicle</option>
          {VEHICLE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Vehicles observed at premises</p>
      </div>

      <div className="form-field">
        <label className="form-label">Years of Stay</label>
        <input
          type="number"
          name="yearsOfStay"
          value={formData.yearsOfStay}
          onChange={handleChange}
          className="form-input"
          placeholder="Number of years"
          min="0"
        />
        <p className="text-xs text-gray-500 mt-1">Duration at current address (years)</p>
      </div>

      <div className="form-field">
        <label className="form-label">Months of Stay</label>
        <input
          type="number"
          name="monthsOfStay"
          value={formData.monthsOfStay}
          onChange={handleChange}
          className="form-input"
          placeholder="Number of months"
          min="0"
          max="11"
        />
        <p className="text-xs text-gray-500 mt-1">Additional months at current address</p>
      </div>

      <div className="form-field">
        <label className="form-label">Area Sq-Ft</label>
        <input
          type="text"
          name="areaSqFt"
          value={formData.areaSqFt}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., 800, 1200, 1500"
        />
        <p className="text-xs text-gray-500 mt-1">Approximate area in square feet</p>
      </div>

      <div className="form-field">
        <label className="form-label">Name plate sighted</label>
        <select name="namePlateSighted" value={formData.namePlateSighted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was name plate visible at residence?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Entry into residence permitted</label>
        <select name="entryPermitted" value={formData.entryPermitted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Were you allowed to enter the residence?</p>
      </div>
    </FormSection>
  );

  const renderPersonalDetails = () => (
    <FormSection title="PERSONAL DETAILS" columns={3}>
      {/* Row 1 */}
      <div className="form-field">
        <label className="form-label required">Date Of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="form-input"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Applicant's date of birth</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Aadhar Card No</label>
        <input
          type="text"
          name="aadharCardNo"
          value={formData.aadharCardNo}
          onChange={handleChange}
          className="form-input"
          placeholder="12-digit number (e.g., 123456789012)"
          maxLength="12"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Must be exactly 12 digits</p>
      </div>

      <div className="form-field">
        <label className="form-label">Pan Card No</label>
        <input
          type="text"
          name="panCardNo"
          value={formData.panCardNo}
          onChange={handleChange}
          className="form-input"
          placeholder="10-character PAN (e.g., ABCDE1234F)"
          maxLength="10"
        />
        <p className="text-xs text-gray-500 mt-1">10-character PAN card number</p>
      </div>

      {/* Row 2 */}
      <div className="form-field">
        <label className="form-label">Mobile No 1</label>
        <input
          type="tel"
          name="mobileNo1"
          value={formData.mobileNo1}
          onChange={handleChange}
          className="form-input"
          placeholder="10-digit mobile number"
          maxLength="10"
        />
        <p className="text-xs text-gray-500 mt-1">Primary contact number</p>
      </div>

      <div className="form-field">
        <label className="form-label">Mobile No 2</label>
        <input
          type="tel"
          name="mobileNo2"
          value={formData.mobileNo2}
          onChange={handleChange}
          className="form-input"
          placeholder="10-digit alternate number"
          maxLength="10"
        />
        <p className="text-xs text-gray-500 mt-1">Secondary contact number (optional)</p>
      </div>

      <div className="form-field">
        <label className="form-label">Mobile No 3</label>
        <input
          type="tel"
          name="mobileNo3"
          value={formData.mobileNo3}
          onChange={handleChange}
          className="form-input"
          placeholder="10-digit additional number"
          maxLength="10"
        />
        <p className="text-xs text-gray-500 mt-1">Additional contact number (optional)</p>
      </div>

      {/* Row 3 */}
      <div className="form-field">
        <label className="form-label">Qualification</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., B.Tech, MBA, Graduate"
        />
        <p className="text-xs text-gray-500 mt-1">Educational qualification</p>
      </div>

      <div className="form-field">
        <label className="form-label">Land Mark</label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Near City Mall, Opposite Police Station"
        />
        <p className="text-xs text-gray-500 mt-1">Prominent landmark near residence</p>
      </div>

      <div className="form-field">
        <label className="form-label">Total Family Members</label>
        <input
          type="number"
          name="totalFamilyMembers"
          value={formData.totalFamilyMembers}
          onChange={handleChange}
          className="form-input"
          placeholder="Number of family members"
          min="1"
        />
        <p className="text-xs text-gray-500 mt-1">Total members living in residence</p>
      </div>

      {/* Row 4 - Full width */}
      <div className="form-field md:col-span-3">
        <label className="form-label">Visible Items</label>
        <input
          type="text"
          name="visibleItems"
          value={formData.visibleItems}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., T.V, Fridge, Sofa, AC, Washing Machine"
        />
        <p className="text-xs text-gray-500 mt-1">Assets and appliances observed</p>
      </div>

      {/* Row 5 - File Uploads */}
      <div className="form-field md:col-span-3">
        <label className="form-label">Upload Aadhar Documents</label>
        <FileUpload 
          onFilesChange={(files) => handleFilesChange(files, 'aadharDocuments')} 
          multiple={true}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="text-xs text-gray-500 mt-1">Upload scanned copies of Aadhar card (Front & Back)</p>
      </div>

      <div className="form-field md:col-span-3">
        <label className="form-label">Upload PAN Documents</label>
        <FileUpload 
          onFilesChange={(files) => handleFilesChange(files, 'panDocuments')} 
          multiple={true}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="text-xs text-gray-500 mt-1">Upload scanned copy of PAN card</p>
      </div>
    </FormSection>
  );

  const renderVerificationDetails = () => (
    <FormSection title="VERIFICATION DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label">Address Confirmed</label>
        <select name="addressConfirmed" value={formData.addressConfirmed} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was the address verified and confirmed?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Neighbours Verification</label>
        <select name="neighboursVerification" value={formData.neighboursVerification} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Were neighbors available for verification?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Neighbours Comments</label>
        <select name="neighboursComments" value={formData.neighboursComments} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="POSITIVE">POSITIVE</option>
          <option value="NEGATIVE">NEGATIVE</option>
          <option value="NEUTRAL">NEUTRAL</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Overall feedback from neighbors</p>
      </div>

      <div className="form-field">
        <label className="form-label">Relationship of Person</label>
        <input
          type="text"
          name="relationshipOfPerson"
          value={formData.relationshipOfPerson}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Uncle, Aunt, Neighbor, Relative"
        />
        <p className="text-xs text-gray-500 mt-1">Relationship of verification contact</p>
      </div>

      <div className="form-field md:col-span-2 form-field-textarea">
        <label className="form-label">COMMENTS</label>
        <textarea
          name="neighboursCommentsText"
          value={formData.neighboursCommentsText}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Neighbours recognized the Applicant and confirmed the stay at same address"
        />
        <p className="text-xs text-gray-500 mt-1">Detailed neighbor verification comments</p>
      </div>
    </FormSection>
  );

  const renderExecutiveComments = () => (
    <FormSection title="FIELD EXECUTIVE COMMENTS" columns={1}>
      <div className="form-field form-field-textarea">
        <label className="form-label required">Field Executive Comments</label>
        <textarea
          name="fieldExecutiveComments"
          value={formData.fieldExecutiveComments}
          onChange={handleChange}
          rows="4"
          className="form-textarea"
          placeholder="Visited the given Address met Applicant Mr …………. and Stay confirmed. They are in Independent House for the past ………., TPC-Confirmation: Met neighbor Mr …………..., confirmed the Applicant stay. SATISFACTORY"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Detailed observations from site visit and verification process</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Verifier's Name</label>
        <input
          type="text"
          name="verifiersName"
          value={formData.verifiersName}
          onChange={handleChange}
          className="form-input"
          placeholder="Full name of field executive"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Name of person who conducted verification</p>
      </div>

      <div className="form-field">
        <label className="form-label">Authorized Signatory</label>
        <input
          type="text"
          name="authorizedSignatory"
          value={formData.authorizedSignatory}
          onChange={handleChange}
          className="form-input"
          placeholder="Authorized signatory name"
        />
        <p className="text-xs text-gray-500 mt-1">If different from field executive</p>
      </div>
    </FormSection>
  );

  const renderSiteImages = () => (
    <FormSection title="SITE IMAGES & DOCUMENTS" columns={1}>
      <div className="form-field">
        <label className="form-label required">Upload Site Images *</label>
        <FileUpload 
          onFilesChange={(files) => handleFilesChange(files, 'siteImages')} 
          multiple={true}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="text-xs text-red-600 font-medium mt-1">* Upload photos of residence premises (required)</p>
      </div>

      <div className="form-field">
        <label className="form-label">Upload Other Documents</label>
        <FileUpload 
          onFilesChange={(files) => handleFilesChange(files, 'otherDocuments')} 
          multiple={true}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
        />
        <p className="text-xs text-gray-500 mt-1">Upload any other relevant documents (optional)</p>
      </div>
    </FormSection>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'basic':
        return renderBasicInformation();
      case 'address':
        return renderAddressDetails();
      case 'residence':
        return renderResidenceDetails();
      case 'personal':
        return renderPersonalDetails();
      case 'verification':
        return renderVerificationDetails();
      case 'executive':
        return renderExecutiveComments();
      case 'images':
        return renderSiteImages();
      default:
        return renderBasicInformation();
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col">
          <div className="text-center mb-6">
            {totalForms > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-800">
                  Form {formNumber} of {totalForms} - Residence Verification
                </p>
                {!isLastForm && (
                  <p className="text-xs text-blue-600 mt-1">
                    After submitting, you'll move to the next form
                  </p>
                )}
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">REPORT OF RESIDENCE VERIFICATION</h2>
            <p className="text-base font-medium text-gray-700">EVALUATION SHEET</p>
            <p className="text-xs text-gray-600 mt-1">Fields marked with <span className="text-red-500">*</span> are required for submission</p>
          </div>

          <div className="form-section-wrapper">
            {renderCurrentSection()}
          </div>

          <div className="form-buttons-container">
            <div className="flex space-x-2">
              <button 
                type="button" 
                onClick={handlePrevSection}
                disabled={currentSection === 'basic'}
                className={`btn-secondary ${currentSection === 'basic' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ← Previous
              </button>
              
              <button 
                type="button" 
                onClick={handleNextSection}
                disabled={currentSection === 'images'}
                className={`btn-primary ${currentSection === 'images' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next →
              </button>
            </div>

            <div className="flex space-x-2">
              <button 
                type="button" 
                onClick={handleCancelClick}
                className="btn-secondary"
              >
                {currentSection === 'images' ? 'Cancel Form' : 'Cancel'}
              </button>
              
              {currentSection === 'images' && (
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 
                   isLastForm ? 'Submit Residence Verification' : 
                   `Submit & Continue to Next Form (${formNumber}/${totalForms})`}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <ValidationModal
        isOpen={showValidation}
        errors={validationErrors}
        onClose={() => setShowValidation(false)}
        fieldRequirements={fieldRequirements}
      />

      {showSuccess && <SuccessModal />}
    </div>
  );
};

export default ResidenceForm;