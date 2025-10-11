import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import FileUpload from './FileUpload';
import ValidationModal from './ValidationModal';
import { 
  LOAN_TYPES, 
  NATURE_OF_BUSINESS, 
  OFFICE_FLOORS, 
  EMPLOYEE_COUNT,
  YES_NO_OPTIONS 
} from '../utils/constants';

const API_BASE_URL = 'http://localhost:5000';

const OfficeForm = ({ 
  onSubmit, 
  showSubmitButton = true, 
  onBack, 
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
    
    // Office Details
    officeAddress: '',
    exactCompanyName: '',
    designation: '',
    employeeId: '',
    workingSince: '',
    netSalary: '',
    officeFloor: '',
    
    // Contact Details
    personContacted: '',
    personContactedName: '',
    personMet: '',
    personMetName: '',
    designationOfPerson: '',
    mobileNo: '',
    mobileNo2: '',
    mobileNo3: '',
    
    // Business Details
    natureOfBusiness: '',
    numberOfEmployees: '',
    locatingOffice: '',
    nameBoardSighted: '',
    businessActivitySeen: '',
    equipmentSighted: '',
    visitingCardObtained: '',
    residenceCumOffice: '',
    workConfirmed: '',
    
    // Field Executive Details
    fieldExecutiveComments: '',
    fieldExecutiveName: '',
    authorizedSignatory: '',
    comments: '',
    
    // Site Images
    siteImages: [],
    otherDocuments: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadSectionData();
  }, [currentSection]);

  const loadSectionData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/load-section?section=${currentSection}&formType=office`,
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
    
    // Office Details validation
    if (!formData.officeAddress || formData.officeAddress.trim() === '') 
      errors.push('officeAddress is required');
    if (!formData.exactCompanyName || formData.exactCompanyName.trim() === '') 
      errors.push('exactCompanyName is required');
    if (!formData.designation || formData.designation.trim() === '') 
      errors.push('designation is required');
    
    // Business Details validation
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
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files : value
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
      await onSectionSave(currentSection, formData, 'office');
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleNextSection = async () => {
    await handleSaveSection();
    const sections = ['basic', 'office', 'contact', 'business', 'verification', 'executive', 'images'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1]);
    }
  };

  const handlePrevSection = async () => {
    await handleSaveSection();
    const sections = ['basic', 'office', 'contact', 'business', 'verification', 'executive', 'images'];
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
      officeAddress: '',
      exactCompanyName: '',
      designation: '',
      employeeId: '',
      workingSince: '',
      netSalary: '',
      officeFloor: '',
      personContacted: '',
      personContactedName: '',
      personMet: '',
      personMetName: '',
      designationOfPerson: '',
      mobileNo: '',
      mobileNo2: '',
      mobileNo3: '',
      natureOfBusiness: '',
      numberOfEmployees: '',
      locatingOffice: '',
      nameBoardSighted: '',
      businessActivitySeen: '',
      equipmentSighted: '',
      visitingCardObtained: '',
      residenceCumOffice: '',
      workConfirmed: '',
      fieldExecutiveComments: '',
      fieldExecutiveName: '',
      authorizedSignatory: '',
      comments: '',
      siteImages: [],
      otherDocuments: []
    });
    
    if (currentSection === 'images') {
      onCancel(true, 'office');
    } else {
      onCancel(false, 'office');
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
      
      // Submit office form
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
          officeAddress: '',
          exactCompanyName: '',
          designation: '',
          employeeId: '',
          workingSince: '',
          netSalary: '',
          officeFloor: '',
          personContacted: '',
          personContactedName: '',
          personMet: '',
          personMetName: '',
          designationOfPerson: '',
          mobileNo: '',
          mobileNo2: '',
          mobileNo3: '',
          natureOfBusiness: '',
          numberOfEmployees: '',
          locatingOffice: '',
          nameBoardSighted: '',
          businessActivitySeen: '',
          equipmentSighted: '',
          visitingCardObtained: '',
          residenceCumOffice: '',
          workConfirmed: '',
          fieldExecutiveComments: '',
          fieldExecutiveName: '',
          authorizedSignatory: '',
          comments: '',
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
    referenceNo: "Bank reference number (e.g., SBIN/2024/001, BRANCH/YYYY/SEQ)",
    branchName: "Complete bank branch name (e.g., State Bank of India, Main Branch, Kurnool)",
    typeOfLoan: "Choose the type of loan from the dropdown list",
    officeAddress: "Complete office address with building name, street, area, city, and PIN code",
    exactCompanyName: "Official registered name of the company/organization",
    designation: "Applicant's job title/position in the company",
    natureOfBusiness: "Select the primary business activity from the dropdown",
    fieldExecutiveComments: "Detailed observations from site visit and verification process",
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
              ? 'Office verification form has been submitted successfully.'
              : `Office verification completed. Moving to next form... (${formNumber}/${totalForms})`
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
          placeholder="e.g., SBIN/2024/001"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Bank reference number format</p>
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

  const renderOfficeDetails = () => (
    <FormSection title="OFFICE DETAILS" columns={1}>
      <div className="form-field form-field-textarea">
        <label className="form-label required">Office Address</label>
        <textarea
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Complete office address with building, street, city, PIN code"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Full office address for verification</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Exact Company Name</label>
        <input
          type="text"
          name="exactCompanyName"
          value={formData.exactCompanyName}
          onChange={handleChange}
          className="form-input"
          placeholder="Official registered company name"
          required
        />
        <p className="text-xs text-gray-500 mt-1">As per company registration</p>
      </div>

      <div className="form-field">
        <label className="form-label required">Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Senior Manager, Software Engineer"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Applicant's job title/position</p>
      </div>

      <div className="form-field">
        <label className="form-label">Employee ID</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="form-input"
          placeholder="Company employee ID number"
        />
        <p className="text-xs text-gray-500 mt-1">If available</p>
      </div>

      <div className="form-field">
        <label className="form-label">Working Since</label>
        <input
          type="text"
          name="workingSince"
          value={formData.workingSince}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., 2 Years 3 Months"
        />
        <p className="text-xs text-gray-500 mt-1">Duration of employment</p>
      </div>

      <div className="form-field">
        <label className="form-label">Net Salary</label>
        <input
          type="text"
          name="netSalary"
          value={formData.netSalary}
          onChange={handleChange}
          className="form-input"
          placeholder="Monthly take-home salary"
        />
        <p className="text-xs text-gray-500 mt-1">If disclosed/available</p>
      </div>

      <div className="form-field">
        <label className="form-label">Office Floor</label>
        <select name="officeFloor" value={formData.officeFloor} onChange={handleChange} className="form-select">
          <option value="">Select Floor</option>
          {OFFICE_FLOORS.map(floor => (
            <option key={floor} value={floor}>{floor}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Floor where office is located</p>
      </div>
    </FormSection>
  );

  const renderContactDetails = () => (
    <FormSection title="CONTACT DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label">Person contacted</label>
        <select name="personContacted" value={formData.personContacted} onChange={handleChange} className="form-select">
          <option value="">Select Title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Title of person contacted</p>
      </div>

      <div className="form-field">
        <label className="form-label">Person Contacted Name</label>
        <input
          type="text"
          name="personContactedName"
          value={formData.personContactedName}
          onChange={handleChange}
          className="form-input"
          placeholder="Full name of person contacted"
        />
        <p className="text-xs text-gray-500 mt-1">Full name of the person you spoke with</p>
      </div>

      <div className="form-field">
        <label className="form-label">Person Met</label>
        <select name="personMet" value={formData.personMet} onChange={handleChange} className="form-select">
          <option value="">Select Title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Title of person who verified</p>
      </div>

      <div className="form-field">
        <label className="form-label">Person Met Name</label>
        <input
          type="text"
          name="personMetName"
          value={formData.personMetName}
          onChange={handleChange}
          className="form-input"
          placeholder="Full name of person who verified"
        />
        <p className="text-xs text-gray-500 mt-1">Full name of the verification contact</p>
      </div>

      <div className="form-field">
        <label className="form-label">Designation of the person</label>
        <input
          type="text"
          name="designationOfPerson"
          value={formData.designationOfPerson}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., HR Manager, Supervisor"
        />
        <p className="text-xs text-gray-500 mt-1">Job title of verification contact</p>
      </div>

      <div className="form-field">
        <label className="form-label">Mobile No</label>
        <input
          type="tel"
          name="mobileNo"
          value={formData.mobileNo}
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
        <p className="text-xs text-gray-500 mt-1">Secondary contact number</p>
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
        <p className="text-xs text-gray-500 mt-1">Additional contact number</p>
      </div>
    </FormSection>
  );

  const renderBusinessDetails = () => (
    <FormSection title="BUSINESS DETAILS" columns={2}>
      <div className="form-field">
        <label className="form-label required">Nature of Business</label>
        <select name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} className="form-select" required>
          <option value="">Select Nature</option>
          {NATURE_OF_BUSINESS.map(nature => (
            <option key={nature} value={nature}>{nature}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Primary business activity</p>
      </div>

      <div className="form-field">
        <label className="form-label">Number of employees seen</label>
        <select name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {EMPLOYEE_COUNT.map(count => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Approximate employee count observed</p>
      </div>

      <div className="form-field">
        <label className="form-label">Locating Office</label>
        <select name="locatingOffice" value={formData.locatingOffice} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Was office easy to find?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Name Board Sighted</label>
        <select name="nameBoardSighted" value={formData.nameBoardSighted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Company name board visible?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Business Activity seen</label>
        <select name="businessActivitySeen" value={formData.businessActivitySeen} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Operational activity observed?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Equipment Sighted</label>
        <select name="equipmentSighted" value={formData.equipmentSighted} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Office equipment visible?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Visiting Card Obtained</label>
        <select name="visitingCardObtained" value={formData.visitingCardObtained} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Proof of visit collected?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Residence cum Office</label>
        <select name="residenceCumOffice" value={formData.residenceCumOffice} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Combined residence and office?</p>
      </div>

      <div className="form-field">
        <label className="form-label">Work Confirmed</label>
        <select name="workConfirmed" value={formData.workConfirmed} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Employment verified by contact?</p>
      </div>
    </FormSection>
  );

  const renderVerificationDetails = () => (
    <FormSection title="VERIFICATION DETAILS" columns={1}>
      <div className="form-field form-field-textarea">
        <label className="form-label">COMMENTS</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Visited the given Office Address, met Mr …………. and confirmed the Applicant working in the same office. SATISFACTORY"
        />
        <p className="text-xs text-gray-500 mt-1">Overall verification comments</p>
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
          placeholder="Visited the given Office Address, met Mr …………. and confirmed the Applicant working in the same office. SATISFACTORY"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Detailed observations from site visit</p>
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
          accept=".jpg,.jpeg,.png,.pdf"
          error={errors?.siteImages}
        />
        <p className="text-xs text-red-600 font-medium mt-1">* Upload photos of office premises (required)</p>
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
      case 'office':
        return renderOfficeDetails();
      case 'contact':
        return renderContactDetails();
      case 'business':
        return renderBusinessDetails();
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
                  Form {formNumber} of {totalForms} - Office Verification
                </p>
                {!isLastForm && (
                  <p className="text-xs text-blue-600 mt-1">
                    After submitting, you'll move to the next form
                  </p>
                )}
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">REPORT OF OFFICE VERIFICATION</h2>
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
                   isLastForm ? 'Submit Office Verification' : 
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

export default OfficeForm;