import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import FileUpload from './FileUpload';
import ValidationModal from './ValidationModal';
import { 
  LOAN_TYPES, 
  NATURE_OF_BUSINESS,
  PREMISES_TYPES,
  YES_NO_OPTIONS,
  DESIGNATION_TYPES,
  CONTACT_DESIGNATION_TYPES,
  VISITING_CARD_OPTIONS,
  OFFICE_LOCATION_TYPES,
  NUMBER_OF_EMPLOYEES,
  AREA_SQ_FT,
  YEARS_IN_BUSINESS,
  RENT_AMOUNTS,
  BUSINESS_RATINGS
} from '../utils/constants';

const API_BASE_URL = 'http://localhost:5000';

const EmployeeVerificationForm = ({ 
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
    dateOfReceipt: '',
    dateOfReport: '',
    branchName: '',
    typeOfLoan: '',
    rlmsNo: '',
    branchCode: '',
    
    // Business Details
    applicantName: '',
    exactCompanyName: '',
    officeAddress: '',
    designation: 'PROPRIETOR',
    contactPersonName: '',
    contactPersonDesignation: '',
    natureOfBusiness: '',
    
    // Business Premises Details
    officePremises: '',
    numberOfYears: '',
    payingRent: '',
    nameBoardSighted: '',
    businessActivitySeen: '',
    equipmentSighted: '',
    visitingCardObtained: '',
    residenceCumOffice: '',
    locatingOffice: '',
    areaInSqFt: '',
    numberOfEmployees: '',
    officeLocation: '',
    businessNeighbor: '',
    
    // Registration Details
    tradeLicenseNo: '',
    gstNo: '',
    
    // Field Executive Details
    fieldExecutiveComments: '',
    fieldExecutiveName: '',
    authorizedSignatory: '',
    businessRating: '',
    
    // Site Images & Documents
    siteImages: [],
    otherDocuments: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Define form type for API calls
  const formType = 'employee';

  useEffect(() => {
    loadSectionData();
  }, [currentSection]);

  const loadSectionData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/load-section?section=${currentSection}&formType=${formType}`,
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
    
    // Business Details validation
    if (!formData.applicantName || formData.applicantName.trim() === '') 
      errors.push('applicantName is required');
    if (!formData.exactCompanyName || formData.exactCompanyName.trim() === '') 
      errors.push('exactCompanyName is required');
    if (!formData.officeAddress || formData.officeAddress.trim() === '') 
      errors.push('officeAddress is required');
    if (!formData.natureOfBusiness || formData.natureOfBusiness.trim() === '') 
      errors.push('natureOfBusiness is required');
    
    // Field Executive validation
    if (!formData.fieldExecutiveComments || formData.fieldExecutiveComments.trim() === '') 
      errors.push('fieldExecutiveComments is required');
    if (!formData.fieldExecutiveName || formData.fieldExecutiveName.trim() === '') 
      errors.push('fieldExecutiveName is required');
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFilesChange = (files, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: files
    }));
  };

  const handleSaveSection = async () => {
    try {
      await onSectionSave(currentSection, formData, formType);
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleNextSection = async () => {
    await handleSaveSection();
    const sections = ['basic', 'business', 'premises', 'registration', 'executive', 'images'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  const handlePrevSection = async () => {
    await handleSaveSection();
    const sections = ['basic', 'business', 'premises', 'registration', 'executive', 'images'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1]);
    }
  };

  const handleCancelClick = () => {
    // Reset form data locally without API call
    setFormData({
      referenceNo: '',
      dateOfReceipt: '',
      dateOfReport: '',
      branchName: '',
      typeOfLoan: '',
      rlmsNo: '',
      branchCode: '',
      applicantName: '',
      exactCompanyName: '',
      officeAddress: '',
      designation: 'PROPRIETOR',
      contactPersonName: '',
      contactPersonDesignation: '',
      natureOfBusiness: '',
      officePremises: '',
      numberOfYears: '',
      payingRent: '',
      nameBoardSighted: '',
      businessActivitySeen: '',
      equipmentSighted: '',
      visitingCardObtained: '',
      residenceCumOffice: '',
      locatingOffice: '',
      areaInSqFt: '',
      numberOfEmployees: '',
      officeLocation: '',
      businessNeighbor: '',
      tradeLicenseNo: '',
      gstNo: '',
      fieldExecutiveComments: '',
      fieldExecutiveName: '',
      authorizedSignatory: '',
      businessRating: '',
      siteImages: [],
      otherDocuments: []
    });
    
    if (currentSection === 'images') {
      onCancel(true, formType);
    } else {
      onCancel(false, formType);
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
      
      // Submit business verification form
      await onSubmit(formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Clear form data after successful submission
      setTimeout(() => {
        setFormData({
          referenceNo: '',
          dateOfReceipt: '',
          dateOfReport: '',
          branchName: '',
          typeOfLoan: '',
          rlmsNo: '',
          branchCode: '',
          applicantName: '',
          exactCompanyName: '',
          officeAddress: '',
          designation: 'PROPRIETOR',
          contactPersonName: '',
          contactPersonDesignation: '',
          natureOfBusiness: '',
          officePremises: '',
          numberOfYears: '',
          payingRent: '',
          nameBoardSighted: '',
          businessActivitySeen: '',
          equipmentSighted: '',
          visitingCardObtained: '',
          residenceCumOffice: '',
          locatingOffice: '',
          areaInSqFt: '',
          numberOfEmployees: '',
          officeLocation: '',
          businessNeighbor: '',
          tradeLicenseNo: '',
          gstNo: '',
          fieldExecutiveComments: '',
          fieldExecutiveName: '',
          authorizedSignatory: '',
          businessRating: '',
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
    referenceNo: "Bank reference number (e.g., 862/27-09-2025)",
    branchName: "Complete bank branch name (e.g., RAMACHANDRA NAGAR)",
    typeOfLoan: "Choose the type of loan from the dropdown list",
    applicantName: "Full name of the applicant/proprietor",
    exactCompanyName: "Exact registered business name",
    officeAddress: "Complete business address with door number, street, city, PIN code",
    natureOfBusiness: "Nature of business activities (e.g., CENTRING WORKS)",
    fieldExecutiveComments: "Detailed observations from business verification process",
    fieldExecutiveName: "Name of the field executive who conducted the verification"
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
              ? 'Business verification form has been submitted successfully.'
              : `Business verification completed. Moving to next form... (${formNumber}/${totalForms})`
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
          placeholder="e.g., 862/27-09-2025"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Bank reference number</p>
      </div>

      <div className="form-field">
        <label className="form-label">RLMS No</label>
        <input
          type="text"
          name="rlmsNo"
          value={formData.rlmsNo}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., 501250926061832"
        />
        <p className="text-xs text-gray-500 mt-1">RLMS reference number</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Branch Name</label>
        <input
          type="text"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., RAMACHANDRA NAGAR"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Bank branch name</p>
      </div>

      <div className="form-field">
        <label className="form-label">Branch Code</label>
        <input
          type="text"
          name="branchCode"
          value={formData.branchCode}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., 21148"
        />
        <p className="text-xs text-gray-500 mt-1">Bank branch code</p>
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
    </FormSection>
  );

  const renderBusinessDetails = () => (
    <FormSection title="BUSINESS DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label required">Applicant Name</label>
        <input
          type="text"
          name="applicantName"
          value={formData.applicantName}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., SHAIK MASTAN"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Full name of applicant/proprietor</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Exact Company Name</label>
        <input
          type="text"
          name="exactCompanyName"
          value={formData.exactCompanyName}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., SHAIK MASTAN CENTRING WORKS"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Registered business name</p>
      </div>

      <div className="form-field md:col-span-2 form-field-textarea">
        <label className="form-label required">Office Address</label>
        <textarea
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Complete office address with door number, street, city, PIN code"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Full business address</p>
      </div>

      <div className="form-field">
        <label className="form-label">Designation of Applicant</label>
        <select name="designation" value={formData.designation} onChange={handleChange} className="form-select">
          <option value="">Select Designation</option>
          {DESIGNATION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Applicant's role in business</p>
      </div>

      <div className="form-field">
        <label className="form-label">Contact Person Name</label>
        <input
          type="text"
          name="contactPersonName"
          value={formData.contactPersonName}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., DURGA RAO"
        />
        <p className="text-xs text-gray-500 mt-1">Person met during verification</p>
      </div>

      <div className="form-field">
        <label className="form-label">Contact Person Designation</label>
        <select name="contactPersonDesignation" value={formData.contactPersonDesignation} onChange={handleChange} className="form-select">
          <option value="">Select Designation</option>
          {CONTACT_DESIGNATION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Designation of contact person</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Nature of Business</label>
        <select name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} className="form-select" required>
          <option value="">Select Business Type</option>
          {NATURE_OF_BUSINESS.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Primary business activity</p>
      </div>
    </FormSection>
  );

  const renderPremisesDetails = () => (
    <FormSection title="BUSINESS PREMISES DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label">Office Premises</label>
        <select name="officePremises" value={formData.officePremises} onChange={handleChange} className="form-select">
          <option value="">Select Type</option>
          {PREMISES_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Type of office premises</p>
      </div>

      <div className="form-field">
        <label className="form-label">Number of Years</label>
        <select name="numberOfYears" value={formData.numberOfYears} onChange={handleChange} className="form-select">
          <option value="">Select Years</option>
          {YEARS_IN_BUSINESS.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Duration at current location</p>
      </div>

      <div className="form-field">
        <label className="form-label">Paying Rent</label>
        <select name="payingRent" value={formData.payingRent} onChange={handleChange} className="form-select">
          <option value="">Select Rent Amount</option>
          {RENT_AMOUNTS.map(rent => (
            <option key={rent} value={rent}>{rent}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Monthly rent amount</p>
      </div>

      <div className="form-field">
        <label className="form-label">Name Board Sighted</label>
        <select name="nameBoardSighted" value={formData.nameBoardSighted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was name board visible?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Business Activity Seen</label>
        <select name="businessActivitySeen" value={formData.businessActivitySeen} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was business activity observed?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Equipment Sighted</label>
        <select name="equipmentSighted" value={formData.equipmentSighted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was business equipment visible?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Visiting Card Obtained</label>
        <select name="visitingCardObtained" value={formData.visitingCardObtained} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {VISITING_CARD_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was visiting card collected?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Residence Cum Office</label>
        <select name="residenceCumOffice" value={formData.residenceCumOffice} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Is it combined residence and office?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Locating Office</label>
        <select name="locatingOffice" value={formData.locatingOffice} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was office easily located?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Area in Sq. Ft</label>
        <select name="areaInSqFt" value={formData.areaInSqFt} onChange={handleChange} className="form-select">
          <option value="">Select Area</option>
          {AREA_SQ_FT.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Office area in square feet</p>
      </div>

      <div className="form-field">
        <label className="form-label">Number of Employees</label>
        <select name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} className="form-select">
          <option value="">Select Count</option>
          {NUMBER_OF_EMPLOYEES.map(count => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Total number of employees</p>
      </div>

      <div className="form-field">
        <label className="form-label">Office Location</label>
        <select name="officeLocation" value={formData.officeLocation} onChange={handleChange} className="form-select">
          <option value="">Select Location</option>
          {OFFICE_LOCATION_TYPES.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Floor/level of office</p>
      </div>

      <div className="form-field">
        <label className="form-label">Business Neighbor</label>
        <input
          type="text"
          name="businessNeighbor"
          value={formData.businessNeighbor}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., NA or nearby business names"
        />
        <p className="text-xs text-gray-500 mt-1">Nearby businesses or NA</p>
      </div>
    </FormSection>
  );

  const renderRegistrationDetails = () => (
    <FormSection title="REGISTRATION DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label">Trade License No</label>
        <input
          type="text"
          name="tradeLicenseNo"
          value={formData.tradeLicenseNo}
          onChange={handleChange}
          className="form-input"
          placeholder="Trade license number"
        />
        <p className="text-xs text-gray-500 mt-1">Business trade license number</p>
      </div>

      <div className="form-field">
        <label className="form-label">GST No</label>
        <select name="gstNo" value={formData.gstNo} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Does business have GST registration?</p>
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
          placeholder="Visited the given business address and met with contact person. Business details confirmed. Field found correct."
          required
        />
        <p className="text-xs text-gray-500 mt-1">Detailed observations from business verification</p>
      </div>

      <div className="form-field">
        <label className="form-label">Business Rating</label>
        <select name="businessRating" value={formData.businessRating} onChange={handleChange} className="form-select">
          <option value="">Select Rating</option>
          {BUSINESS_RATINGS.map(rating => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Overall business verification rating</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Field Executive Name</label>
        <input
          type="text"
          name="fieldExecutiveName"
          value={formData.fieldExecutiveName}
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
          error={errors?.siteImages}
        />
        <p className="text-xs text-red-600 font-medium mt-1">* Upload photos of business premises (required)</p>
      </div>

      <div className="form-field">
        <label className="form-label">Upload Other Documents</label>
        <FileUpload 
          onFilesChange={(files) => handleFilesChange(files, 'otherDocuments')} 
          multiple={true} 
        />
        <p className="text-xs text-gray-500 mt-1">Upload other relevant documents like business proof, licenses, etc. (optional)</p>
      </div>
    </FormSection>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'basic':
        return renderBasicInformation();
      case 'business':
        return renderBusinessDetails();
      case 'premises':
        return renderPremisesDetails();
      case 'registration':
        return renderRegistrationDetails();
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
                  Form {formNumber} of {totalForms} - Business Verification
                </p>
                {!isLastForm && (
                  <p className="text-xs text-blue-600 mt-1">
                    After submitting, you'll move to the next form
                  </p>
                )}
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">REPORT OF APPLICANT BUSINESS VERIFICATION</h2>
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
              
              {showSubmitButton && currentSection === 'images' && (
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 
                  isLastForm ? 'Submit Business Verification' : 
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

export default EmployeeVerificationForm;