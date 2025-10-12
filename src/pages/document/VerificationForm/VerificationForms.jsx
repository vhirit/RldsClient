import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  Send,
  CheckCircle,
  Clock,
  Building,
  Home,
  Briefcase,
  Users,
  MapPin,
  Shield,
  Upload,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import VerificationTypeSelector from './VerificationTypeSelector';
import StepNavigation from './StepNavigation';

import AdministrativeDetails from './steps/AdministrativeDetails';

// Residence steps
import AddressInformation from './steps/ResidenceSteps/AddressInformation';
import PropertyDetails from './steps/ResidenceSteps/PropertyDetails';
import PersonalInformation from './steps/ResidenceSteps/PersonalInformation';
import VerificationStatus from './steps/ResidenceSteps/VerificationStatus';
import CommentsAuthorization from './steps/ResidenceSteps/CommentsAuthorization';
import DocumentUpload from './steps/ResidenceSteps/DocumentUpload';

// Office steps
import OfficeInformation from './steps/OfficeSteps/OfficeInformation';
import EmployeeDetails from './steps/OfficeSteps/EmployeeDetails';
import ContactInformation from './steps/OfficeSteps/ContactInformation';
import BusinessDetails from './steps/OfficeSteps/BusinessDetails';

// Business steps
import BusinessAddressInfo from './steps/BusinessSteps/BusinessAddressInfo';
import CompanyContactDetails from './steps/BusinessSteps/CompanyContactDetails';
import BusinessPremisesDetails from './steps/BusinessSteps/BusinessPremisesDetails';
import LegalInformation from './steps/BusinessSteps/LegalInformation';

const VerificationForm = () => {
  const [currentPage, setCurrentPage] = useState('type-selector'); // 'type-selector' or 'form-steps'
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [formData, setFormData] = useState({
    verificationType: '',
    selectedTypes: [],
    documentNumber: '',
    // Administrative Details
    applicationDate: '',
    referenceNumber: '',
    assignedOfficer: '',
    department: '',
    adminNotes: '',
    // Residence specific
    address: '',
    propertyType: '',
    personalInfo: '',
    verificationStatus: '',
    comments: '',
    documents: [],
    // Office specific
    officeInfo: '',
    employeeDetails: '',
    contactInfo: '',
    officeBusinessDetails: '',
    // Business specific
    businessAddress: '',
    companyContact: '',
    premisesDetails: '',
    legalInfo: ''
  });
  
  const [completedSteps, setCompletedSteps] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStepsForType = (type) => {
    const baseSteps = ['Administrative Details'];
    switch (type) {
      case 'residence':
        return [...baseSteps, 'Address Information', 'Property Details', 'Personal Information', 'Verification Status', 'Comments & Authorization', 'Document Upload'];
      case 'office':
        return [...baseSteps, 'Office Information', 'Employee Details', 'Contact Information', 'Business Details', 'Comments & Authorization', 'Document Upload'];
      case 'business':
        return [...baseSteps, 'Business Address Information', 'Company & Contact Details', 'Business Premises Details', 'Legal Information', 'Comments & Authorization', 'Document Upload'];
      default:
        return baseSteps;
    }
  };

  const stepsPerType = formData.selectedTypes.map((type) => getStepsForType(type));

  const handleTypeSelectionComplete = () => {
    setCurrentPage('form-steps');
    setCurrentStep(1); // Start with first step after administrative details
  };

  const handleBackToTypeSelection = () => {
    setCurrentPage('type-selector');
    setCurrentStep(0);
  };

  const getVerificationTypeIcon = (type) => {
    switch (type) {
      case 'residence': return Home;
      case 'office': return Building;
      case 'business': return Briefcase;
      default: return FileText;
    }
  };

  const getVerificationTypeColor = (type) => {
    switch (type) {
      case 'residence': return 'blue';
      case 'office': return 'green';
      case 'business': return 'purple';
      default: return 'gray';
    }
  };

  const renderCurrentStepContent = () => {
    if (!formData.verificationType) return null;

    switch (formData.verificationType) {
      case 'residence':
        return renderResidenceStep();
      case 'office':
        return renderOfficeStep();
      case 'business':
        return renderBusinessStep();
      default:
        return null;
    }
  };

  const renderResidenceStep = () => {
    switch (currentStep) {
      case 1:
        return <AdministrativeDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 2:
        return <AddressInformation formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 3:
        return <PropertyDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 4:
        return <PersonalInformation formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 5:
        return <VerificationStatus formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 6:
        return <CommentsAuthorization formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 7:
        return <DocumentUpload formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      default:
        return null;
    }
  };

  const renderOfficeStep = () => {
    switch (currentStep) {
      case 1:
        return <AdministrativeDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 2:
        return <OfficeInformation formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 3:
        return <EmployeeDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 4:
        return <ContactInformation formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 5:
        return <BusinessDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 6:
        return <CommentsAuthorization formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 7:
        return <DocumentUpload formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      default:
        return null;
    }
  };

  const renderBusinessStep = () => {
    switch (currentStep) {
      case 1:
        return <AdministrativeDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 2:
        return <BusinessAddressInfo formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 3:
        return <CompanyContactDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 4:
        return <BusinessPremisesDetails formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 5:
        return <LegalInformation formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 6:
        return <CommentsAuthorization formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      case 7:
        return <DocumentUpload formData={formData} setFormData={setFormData} onSectionSave={onSectionSave} />;
      default:
        return null;
    }
  };

  const onSectionSave = (sectionName, data) => {
    setFormData(prev => ({ ...prev, [sectionName]: data }));
    setCompletedSteps(prev => {
      const clone = { ...prev };
      const setForType = new Set(clone[currentTypeIndex] || []);
      setForType.add(currentStep - 1);
      clone[currentTypeIndex] = Array.from(setForType);
      return clone;
    });
    
    const currentSteps = stepsPerType[currentTypeIndex] || [];
    if (currentStep < currentSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleNextTypeOrSubmit();
    }
  };

  const handleNextTypeOrSubmit = () => {
    // If there are more verification types, move to the next one
    if (currentTypeIndex < formData.selectedTypes.length - 1) {
      const nextTypeIndex = currentTypeIndex + 1;
      const nextType = formData.selectedTypes[nextTypeIndex];
      setCurrentTypeIndex(nextTypeIndex);
      setFormData(prev => ({ ...prev, verificationType: nextType }));
      setCurrentStep(1);
    } else {
      // All types completed, submit the form
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        verificationType: '',
        selectedTypes: [],
        documentNumber: '',
        applicationDate: '',
        referenceNumber: '',
        assignedOfficer: '',
        department: '',
        adminNotes: '',
        address: '',
        propertyType: '',
        personalInfo: '',
        verificationStatus: '',
        comments: '',
        documents: [],
        officeInfo: '',
        employeeDetails: '',
        contactInfo: '',
        officeBusinessDetails: '',
        businessAddress: '',
        companyContact: '',
        premisesDetails: '',
        legalInfo: ''
      });
      setCurrentPage('type-selector');
      setCurrentStep(0);
      setCurrentTypeIndex(0);
      setCompletedSteps({});
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormSteps = () => {
    if (!formData.verificationType) return null;

    const currentSteps = stepsPerType[currentTypeIndex] || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-8">
        <div className="mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBackToTypeSelection}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-medium">Back to Type Selection</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-3">
                  {formData.verificationType && (
                    <div className={`p-2 rounded-lg bg-${getVerificationTypeColor(formData.verificationType)}-100`}>
                      {React.createElement(getVerificationTypeIcon(formData.verificationType), { 
                        className: `w-6 h-6 text-${getVerificationTypeColor(formData.verificationType)}-600` 
                      })}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {formData.verificationType ? 
                        `${formData.verificationType.charAt(0).toUpperCase() + formData.verificationType.slice(1)} Verification` 
                        : 'New Verification'
                      }
                    </h1>
                    {formData.documentNumber && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <FileText className="w-4 h-4" />
                        <span>Document #: <span className="font-medium text-gray-900">{formData.documentNumber}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </button>
                
                <div className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Step {currentStep} of {currentSteps.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Side - Steps Navigation */}
            <aside className="xl:col-span-1">
              <div className="sticky top-8">
                <StepNavigation
                  currentStep={currentStep}
                  currentTypeIndex={currentTypeIndex}
                  selectedTypes={formData.selectedTypes}
                  stepsPerType={stepsPerType}
                  onStepClick={(typeIndex, stepIndex) => {
                    setCurrentTypeIndex(typeIndex);
                    setFormData(prev => ({ 
                      ...prev, 
                      verificationType: formData.selectedTypes[typeIndex]
                    }));
                    setCurrentStep(stepIndex + 1);
                  }}
                  formData={formData}
                  completedSteps={completedSteps}
                />
                
                {/* Progress Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Verification Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Completion</span>
                        <span className="font-medium text-blue-600">
                          {Math.round((currentStep / (currentSteps.length || 1)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(currentStep / (currentSteps.length || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Verification Types</span>
                        <span className="font-medium text-gray-900">
                          {currentTypeIndex + 1} of {formData.selectedTypes.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Side - Form Content */}
            <main className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {currentSteps[currentStep - 1]}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {`Complete the ${currentSteps[currentStep - 1]?.toLowerCase()} section to proceed`}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        completedSteps[currentTypeIndex]?.includes(currentStep - 1)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {completedSteps[currentTypeIndex]?.includes(currentStep - 1) ? (
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                        ) : (
                          <Clock className="w-4 h-4 inline mr-1" />
                        )}
                        {completedSteps[currentTypeIndex]?.includes(currentStep - 1) ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  {renderCurrentStepContent()}
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className={`flex items-center px-6 py-3 border border-gray-300 rounded-lg transition-all duration-200 font-medium shadow-sm ${
                        currentStep === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </button>
                    
                    <div className="flex items-center space-x-4">
                      <button className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                        Save & Exit
                      </button>
                      
                      <button
                        onClick={() => {
                          if (currentStep < currentSteps.length) {
                            setCurrentStep(currentStep + 1);
                          } else {
                            handleNextTypeOrSubmit();
                          }
                        }}
                        disabled={isSubmitting}
                        className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            {currentStep < currentSteps.length ? 'Next Step' : `Complete ${formData.verificationType} Verification`}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Need Help with This Section?</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Our verification guidelines provide detailed instructions for each step of the process.
                    </p>
                    <button className="text-sm text-blue-700 hover:text-blue-800 font-medium underline">
                      View Verification Guidelines
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentPage === 'type-selector' && (
        <VerificationTypeSelector
          formData={formData}
          setFormData={setFormData}
          onNext={handleTypeSelectionComplete}
          onBack={() => console.log('Back to dashboard')}
        />
      )}
      {currentPage === 'form-steps' && renderFormSteps()}
    </>
  );
};

export default VerificationForm;