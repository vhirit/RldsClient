
import React, { useState } from 'react';
import VerificationTypeSelector from './ProgressBar/steps/VerificationTypeSelector';
import ResidenceVerificationForm from './ProgressBar/steps/ResidenceVerificationFormNew';
import OfficeVerificationForm from './ProgressBar/steps/OfficeVerificationFormNew';
import BusinessVerificationForm from './ProgressBar/steps/BusinessVerificationFormNew';
import BasicInfo from './ProgressBar/steps/BasicInfo';
import AddressDetails from './ProgressBar/steps/AddressDetails';
import PersonalDetails from './ProgressBar/steps/PersonalDetails';

// ProgressBar Component
const ProgressBar = ({ 
  currentStep, 
  steps, 
  variant = "default",
  showLabels = true,
  showConnectors = true 
}) => {
  const variants = {
    default: {
      active: "bg-blue-600 border-blue-600 text-white",
      completed: "bg-blue-600 border-blue-600 text-white",
      upcoming: "border-gray-300 bg-white text-gray-500",
      text: "text-blue-600",
      bar: "bg-blue-600"
    },
    green: {
      active: "bg-green-600 border-green-600 text-white",
      completed: "bg-green-600 border-green-600 text-white",
      upcoming: "border-gray-300 bg-white text-gray-500",
      text: "text-green-600",
      bar: "bg-green-600"
    },
    modern: {
      active: "bg-gray-600 border-gray-600 text-white",
      completed: "bg-gray-700 border-gray-700 text-white",
      upcoming: "border-gray-300 bg-white text-gray-400",
      text: "text-gray-700 font-medium",
      bar: "bg-gray-400"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  const getStepStatus = (index) => {
    if (index + 1 < currentStep) return "completed";
    if (index + 1 === currentStep) return "active";
    return "upcoming";
  };

  const getStepStyles = (status) => {
    switch (status) {
      case "completed":
        return currentVariant.completed;
      case "active":
        return currentVariant.active;
      default:
        return currentVariant.upcoming;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-6 relative">
        {/* Vertical Connector Line */}
        {showConnectors && (
          <div className="absolute left-3 top-0 bottom-6 w-0.5 bg-gray-200 -z-10"></div>
        )}
        
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const stepStyles = getStepStyles(status);
          
          return (
            <div key={index} className="flex items-start space-x-4 relative">
              {/* Step Circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${stepStyles}`}
              >
                {status === "completed" ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 pt-2">
                {/* Step Label */}
                {showLabels && (
                  <span className={`text-base font-medium transition-colors duration-300 ${
                    status !== "upcoming" ? currentVariant.text : "text-gray-500"
                  }`}>
                    {step}
                  </span>
                )}
                
                {/* Step Description */}
                <p className="text-sm text-gray-500 mt-1">
                  {status === "completed" && "Completed"}
                  {status === "active" && "In Progress"}
                  {status === "upcoming" && "Upcoming"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Validation Hook
const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, rules) => {
    const newErrors = { ...errors };
    
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      newErrors[name] = 'This field is required';
    } else if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[name] = 'Please enter a valid email address';
    } else if (rules.phone && value && !/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
      newErrors[name] = 'Please enter a valid phone number';
    } else if (rules.minLength && value && value.length < rules.minLength) {
      newErrors[name] = `Must be at least ${rules.minLength} characters`;
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
    return !newErrors[name];
  };

  const validateStep = (step, formData) => {
    let isValid = true;
    const newErrors = {};

    const checkField = (fieldName, fieldValue, rules) => {
      if (rules.required && (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === ''))) {
        newErrors[fieldName] = 'This field is required';
        isValid = false;
      } else if (rules.email && fieldValue && !/\S+@\S+\.\S+/.test(fieldValue)) {
        newErrors[fieldName] = 'Please enter a valid email address';
        isValid = false;
      } else if (rules.phone && fieldValue && !/^\d{10,}$/.test(fieldValue.replace(/\D/g, ''))) {
        newErrors[fieldName] = 'Please enter a valid phone number';
        isValid = false;
      }
    };

    const stepValidations = {
      1: () => { // Verification Type Selection
        checkField('verificationType', formData.verificationType, { required: true });
      },
      2: () => { // Basic Information
        checkField('firstName', formData.firstName, { required: true });
        checkField('lastName', formData.lastName, { required: true });
        checkField('email', formData.email, { required: true, email: true });
        checkField('phone', formData.phone, { required: true, phone: true });
      },
      3: () => { // Address Details
        checkField('street', formData.street, { required: true });
        checkField('city', formData.city, { required: true });
        checkField('state', formData.state, { required: true });
        checkField('zipCode', formData.zipCode, { required: true });
      },
      4: () => { // Personal Details
        checkField('dateOfBirth', formData.dateOfBirth, { required: true });
      },
      5: () => { // Verification Forms
        const verificationType = formData.verificationType;
        const types = Array.isArray(verificationType) ? verificationType : (verificationType ? [verificationType] : []);
        
        if (types.includes('residence') || types.includes('all')) {
          // Validate residence verification required fields
          const residenceFields = {
            'residenceVerification.dateOfReceipt': formData.residenceVerification?.dateOfReceipt,
            'residenceVerification.referenceNo': formData.residenceVerification?.referenceNo,
            'residenceVerification.branchName': formData.residenceVerification?.branchName,
            'residenceVerification.applicantName': formData.residenceVerification?.applicantName,
            'residenceVerification.presentAddress.street': formData.residenceVerification?.presentAddress?.street,
            'residenceVerification.presentAddress.city': formData.residenceVerification?.presentAddress?.city,
            'residenceVerification.presentAddress.state': formData.residenceVerification?.presentAddress?.state,
            'residenceVerification.presentAddress.pincode': formData.residenceVerification?.presentAddress?.pincode,
            'residenceVerification.ownershipResidence': formData.residenceVerification?.ownershipResidence,
            'residenceVerification.typeOfResidence': formData.residenceVerification?.typeOfResidence,
            'residenceVerification.dateOfBirth': formData.residenceVerification?.dateOfBirth,
            'residenceVerification.mobileNo1': formData.residenceVerification?.mobileNo1
          };
          
          Object.entries(residenceFields).forEach(([fieldName, fieldValue]) => {
            checkField(fieldName, fieldValue, { required: true });
          });
          
          // Require document uploads for residence verification
          const residenceDocuments = formData.residenceVerification?.siteImages || [];
          if (residenceDocuments.length === 0) {
            newErrors['residenceVerification.siteImages'] = 'At least one site image is required for residence verification';
            isValid = false;
          }
        }
        
        if (types.includes('office') || types.includes('all')) {
          // Validate office verification required fields
          const officeFields = {
            'officeVerification.dateOfReceipt': formData.officeVerification?.dateOfReceipt,
            'officeVerification.referenceNo': formData.officeVerification?.referenceNo,
            'officeVerification.branchName': formData.officeVerification?.branchName,
            'officeVerification.officeAddress.street': formData.officeVerification?.officeAddress?.street,
            'officeVerification.officeAddress.city': formData.officeVerification?.officeAddress?.city,
            'officeVerification.officeAddress.state': formData.officeVerification?.officeAddress?.state,
            'officeVerification.officeAddress.pincode': formData.officeVerification?.officeAddress?.pincode,
            'officeVerification.exactCompanyName': formData.officeVerification?.exactCompanyName,
            'officeVerification.designation': formData.officeVerification?.designation,
            'officeVerification.employeeId': formData.officeVerification?.employeeId,
            'officeVerification.workingSince': formData.officeVerification?.workingSince
          };
          
          Object.entries(officeFields).forEach(([fieldName, fieldValue]) => {
            checkField(fieldName, fieldValue, { required: true });
          });
          
          // Require document uploads for office verification
          const officeDocuments = formData.officeVerification?.siteImages || [];
          if (officeDocuments.length === 0) {
            newErrors['officeVerification.siteImages'] = 'At least one site image is required for office verification';
            isValid = false;
          }
        }
        
        if (types.includes('business') || types.includes('all')) {
          // Validate business verification required fields
          const businessFields = {
            'businessVerification.dateOfReceipt': formData.businessVerification?.dateOfReceipt,
            'businessVerification.referenceNo': formData.businessVerification?.referenceNo,
            'businessVerification.branchName': formData.businessVerification?.branchName,
            'businessVerification.applicantName': formData.businessVerification?.applicantName,
            'businessVerification.officeAddress.street': formData.businessVerification?.officeAddress?.street,
            'businessVerification.officeAddress.city': formData.businessVerification?.officeAddress?.city,
            'businessVerification.officeAddress.state': formData.businessVerification?.officeAddress?.state,
            'businessVerification.officeAddress.pincode': formData.businessVerification?.officeAddress?.pincode,
            'businessVerification.exactCompanyName': formData.businessVerification?.exactCompanyName,
            'businessVerification.designationOfApplicant': formData.businessVerification?.designationOfApplicant,
            'businessVerification.natureOfBusiness': formData.businessVerification?.natureOfBusiness
          };
          
          Object.entries(businessFields).forEach(([fieldName, fieldValue]) => {
            checkField(fieldName, fieldValue, { required: true });
          });
          
          // Require document uploads for business verification
          const businessDocuments = formData.businessVerification?.siteImages || [];
          if (businessDocuments.length === 0) {
            newErrors['businessVerification.siteImages'] = 'At least one site image is required for business verification';
            isValid = false;
          }
        }
      }
    };

    if (stepValidations[step]) {
      stepValidations[step]();
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const clearErrors = () => setErrors({});

  return { errors, validateField, validateStep, setErrors, clearErrors };
};

// Utility Functions
const getInputClass = (fieldName, errors) => {
  const baseClass = "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border rounded-md px-3 py-2 transition-colors duration-200";
  const hasError = errors && errors[fieldName];
  
  if (hasError) {
    return `${baseClass} border-red-500 bg-red-50 text-red-900 placeholder-red-300`;
  }
  
  return `${baseClass} border-gray-300 hover:border-gray-400 focus:outline-none`;
};

const getFieldError = (fieldName, errors) => {
  return errors && errors[fieldName] ? errors[fieldName] : null;
};

// Form step components are imported from separate files

// Main MultiStepForm Component
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Verification Type Selection
    verificationType: '',
    
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address Details
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Personal Details
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    
    // Verification Forms Data
    residenceVerification: {
      dateOfReceipt: '',
      dateOfReport: '',
      referenceNo: '',
      branchName: '',
      typeOfLoan: '',
      applicantName: '',
      relationshipOfPerson: '',
      presentAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      permanentAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      locality: '',
      accessibility: '',
      withinMunicipalLimit: false,
      ownershipResidence: '',
      typeOfResidence: '',
      interiorFurniture: '',
      typeOfRoof: '',
      numberOfFloors: '',
      vehiclesFoundAtResidence: [],
      yearsOfStay: '',
      monthsOfStay: '',
      areaSqFt: '',
      namePlateSighted: false,
      entryIntoResidencePermitted: false,
      dateOfBirth: '',
      aadharCardNo: '',
      panCardNo: '',
      mobileNo1: '',
      mobileNo2: '',
      mobileNo3: '',
      qualification: '',
      landMark: '',
      totalFamilyMembers: '',
      visibleItems: [],
      addressConfirmed: false,
      neighboursVerification: false,
      neighboursComments: '',
      comments: '',
      fieldExecutiveComments: '',
      verifiersName: '',
      authorizedSignatory: '',
      verificationStatus: 'PENDING'
    },
    
    officeVerification: {
      dateOfReceipt: '',
      dateOfReport: '',
      referenceNo: '',
      branchName: '',
      typeOfLoan: '',
      officeAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      exactCompanyName: '',
      designation: '',
      employeeId: '',
      workingSince: '',
      netSalary: '',
      officeFloor: '',
      personContacted: false,
      personContactedName: '',
      personMet: false,
      personMetName: '',
      designationOfPerson: '',
      mobileNo1: '',
      mobileNo2: '',
      mobileNo3: '',
      natureOfBusiness: '',
      numberOfEmployeesSeen: '',
      landMark: '',
      nameBoardSighted: false,
      businessActivitySeen: false,
      equipmentSighted: false,
      visitingCardObtained: false,
      residenceCumOffice: false,
      workConfirmed: false,
      comments: '',
      fieldExecutiveComments: '',
      verifiersName: '',
      authorizedSignatory: '',
      verificationStatus: 'PENDING'
    },
    
    businessVerification: {
      dateOfReceipt: '',
      dateOfReport: '',
      referenceNo: '',
      branchName: '',
      typeOfLoan: '',
      applicantName: '',
      officeAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      exactCompanyName: '',
      designationOfApplicant: '',
      contactPersonName: '',
      contactPersonDesignation: '',
      natureOfBusiness: '',
      officePremises: '',
      numberOfYears: '',
      payingRent: '',
      nameBoardSighted: false,
      businessActivitySeen: false,
      equipmentSighted: false,
      visitingCardObtained: false,
      residenceCumOffice: false,
      locatingOffice: '',
      areaInSqFt: '',
      numberOfEmployees: '',
      officeLocation: '',
      businessNeighbour: '',
      tradeLicenseNo: '',
      gstNo: '',
      fieldExecutiveComments: '',
      rating: '',
      fieldExecutiveName: '',
      authorizedSignatory: '',
      verificationStatus: 'PENDING'
    },
    
    // Documents
    documents: []
  });

  const { errors, validateField, validateStep, setErrors, clearErrors } = useValidation();

  const getStepsForVerificationType = (verificationType) => {
    const baseSteps = [
      'Verification Type',
      'Basic Information', 
      'Address Details',
      'Personal Details'
    ];

    // Handle both single string and array of strings
    const types = Array.isArray(verificationType) ? verificationType : (verificationType ? [verificationType] : []);

    let steps = [...baseSteps];

    if (types.length === 0) {
      // No verification type selected, just show base steps and review
      steps.push('Review & Submit');
      return steps;
    }

    if (types.includes('all')) {
      steps.push('All Verifications');
    } else if (types.length > 1) {
      steps.push('Selected Verifications');
    } else {
      // For single specific type
      const singleType = types[0];
      if (singleType === 'residence') {
        steps.push('Residence Verification');
      } else if (singleType === 'office') {
        steps.push('Office Verification');
      } else if (singleType === 'business') {
        steps.push('Business Verification');
      }
    }

    // Always add review step
    steps.push('Review & Submit');
    return steps;
  };

  const steps = getStepsForVerificationType(formData.verificationType);

  const nextStep = async () => {
    if (validateStep(currentStep, formData)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    // Handle nested object updates
    if (field.includes('.')) {
      const fieldParts = field.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        
        for (let i = 0; i < fieldParts.length - 1; i++) {
          if (!current[fieldParts[i]]) {
            current[fieldParts[i]] = {};
          }
          current = current[fieldParts[i]];
        }
        
        current[fieldParts[fieldParts.length - 1]] = value;
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const renderVerificationForms = () => {
    const commonProps = {
      formData,
      handleChange: updateFormData,
      updateFormData,
      errors,
      validateField,
      getInputClass: (fieldName) => getInputClass(fieldName, errors),
      getFieldError: (fieldName) => getFieldError(fieldName, errors)
    };

    const verificationType = formData.verificationType;
    const types = Array.isArray(verificationType) ? verificationType : (verificationType ? [verificationType] : []);
    
    if (types.length === 0) {
      return null;
    }
    
    // If 'all' is selected or multiple types are selected
    if (types.includes('all') || types.length > 1) {
      const formsToRender = [];
      
      if (types.includes('all') || types.includes('residence')) {
        formsToRender.push(
          <div key="residence">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-500 pl-4">
              Residence Verification
            </h3>
            <ResidenceVerificationForm {...commonProps} />
          </div>
        );
      }
      
      if (types.includes('all') || types.includes('office')) {
        formsToRender.push(
          <div key="office" className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-green-500 pl-4">
              Office/Employee Verification
            </h3>
            <OfficeVerificationForm {...commonProps} />
          </div>
        );
      }
      
      if (types.includes('all') || types.includes('business')) {
        formsToRender.push(
          <div key="business" className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-purple-500 pl-4">
              Business Verification
            </h3>
            <BusinessVerificationForm {...commonProps} />
          </div>
        );
      }
      
      return <div className="space-y-12">{formsToRender}</div>;
    }
    
    // Single type selection
    const singleType = types[0];
    if (singleType === 'residence') {
      return <ResidenceVerificationForm {...commonProps} />;
    } else if (singleType === 'office') {
      return <OfficeVerificationForm {...commonProps} />;
    } else if (singleType === 'business') {
      return <BusinessVerificationForm {...commonProps} />;
    }
    
    return null;
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      handleChange: updateFormData,
      updateFormData,
      errors,
      validateField,
      getInputClass: (fieldName) => getInputClass(fieldName, errors),
      getFieldError: (fieldName) => getFieldError(fieldName, errors)
    };

    switch (currentStep) {
      case 1:
        return <VerificationTypeSelector 
          selectedType={formData.verificationType}
          onTypeChange={(type) => updateFormData('verificationType', type)}
          {...commonProps} 
        />;
      case 2:
        return <BasicInfo {...commonProps} />;
      case 3:
        return <AddressDetails {...commonProps} />;
      case 4:
        return <PersonalDetails {...commonProps} />;
      case 5:
        return renderVerificationForms();
      case 6:
        return <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
            <p className="text-gray-600">Review your information before submitting.</p>
          </div>
          
          {/* Summary sections */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                <p className="text-sm text-gray-600">Name: {formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">Email: {formData.email}</p>
                <p className="text-sm text-gray-600">Phone: {formData.phone}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Verification Type</h4>
                <p className="text-sm text-gray-600 capitalize">
                  {formData.verificationType?.replace('_', ' ')} Verification
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Please review all information carefully before submitting. Once submitted, you will not be able to modify the verification details.
              </p>
            </div>
          </div>
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <svg className="w-12 h-12 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Document Verification System
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Complete comprehensive verification with our user-friendly multi-step process. 
            Select verification type and fill out required information with field validation.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Progress Bar Sidebar */}
            <div className="lg:col-span-1 bg-gray-50 border-r border-gray-200 p-8">
              <div className="sticky top-8">
                <div className="flex items-center mb-6">
                  <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-800">Progress Tracker</h2>
                </div>
                <div className="mb-4 bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">Current Step</div>
                  <div className="text-2xl font-bold text-gray-800">{currentStep} of {steps.length}</div>
                </div>
                <ProgressBar 
                  currentStep={currentStep} 
                  steps={steps}
                  variant="modern"
                  showLabels={true}
                  showConnectors={true}
                />
                
                {/* Progress Stats */}
                <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex justify-between text-sm mb-2 text-gray-700">
                    <span>Progress</span>
                    <span>{Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    Step {currentStep} of {steps.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3 p-6 md:p-8 lg:p-12">
              <div className="max-w-5xl mx-auto">
                {/* Step Header */}
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {steps[currentStep - 1]}
                      </h2>
                      <p className="text-gray-600">
                        {currentStep === 1 && "Select the type of verification you need to complete"}
                        {currentStep === 2 && "Provide basic information about the applicant"}
                        {currentStep === 3 && "Enter detailed address information"}
                        {currentStep === 4 && "Fill in personal details"}
                        {currentStep === 5 && "Complete verification form with all required fields"}
                        {currentStep === 6 && "Review and submit your completed verification"}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        Step {currentStep} of {steps.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="mb-8">
                  {renderStep()}
                </div>
                
                {/* Enhanced Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                      currentStep === 1
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  {currentStep < steps.length ? (
                    <button
                      onClick={nextStep}
                      disabled={currentStep === 1 && !formData.verificationType}
                      className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                        currentStep === 1 && !formData.verificationType
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      }`}
                    >
                      Continue
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (validateStep(currentStep, formData)) {
                          alert('🎉 Verification form submitted successfully! All data has been validated and processed.');
                          console.log('Submitted Form Data:', formData);
                        }
                      }}
                      className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submit Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;