
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { 
  Home, 
  Building, 
  Briefcase, 
  FileText, 
  ArrowRight,
  Check,
  MapPin,
  Info,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Wifi,
  WifiOff
} from 'lucide-react';

const VerificationTypeSelector = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState(formData.selectedTypes || (formData.verificationType ? [formData.verificationType] : []));
  const [isConnected, setIsConnected] = useState(false);
  const [documentNumberStatus, setDocumentNumberStatus] = useState('loading'); // 'loading', 'received', 'error'
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'success', 'error'
  const socketRef = useRef(null);

  // WebSocket connection and document number management
  useEffect(() => {
    const connectToDocumentService = () => {
      try {
        // Connect to main server WebSocket (includes document service functionality)
        socketRef.current = io('http://localhost:8080', {
          transports: ['polling', 'websocket'],
          cors: {
            origin: "http://localhost:3001",
            credentials: true
          },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: 5,
          timeout: 10000
        });

        // Connection event handlers
        socketRef.current.on('connect', () => {
          console.log('📡 Connected to main server WebSocket for document number service');
          setIsConnected(true);
          setDocumentNumberStatus('loading');
          
          // Request current document number
          socketRef.current.emit('requestDocumentNumber');
        });

        socketRef.current.on('disconnect', () => {
          console.log('📡 Disconnected from main server WebSocket');
          setIsConnected(false);
          setDocumentNumberStatus('error');
        });

        // Document number received handler
        socketRef.current.on('documentNumber', (data) => {
          console.log('📄 Received document number from server:', data);
          
          if (data && data.documentNumber) {
            // Use the document number as provided by the server (already incremented)
            // Only set document number if it's not already set by user
            if (!formData.documentNumber || formData.documentNumber === '') {
              setFormData(prev => ({ 
                ...prev, 
                documentNumber: data.documentNumber 
              }));
              console.log('✅ Set document number from server:', data.documentNumber);
            }
            setDocumentNumberStatus('received');
          }
        });

        // Error handler
        socketRef.current.on('error', (error) => {
          console.error('❌ WebSocket error:', error);
          setDocumentNumberStatus('error');
        });

        // Connection error handler
        socketRef.current.on('connect_error', (error) => {
          console.error('❌ Connection error:', error);
          setIsConnected(false);
          setDocumentNumberStatus('error');
        });

        // Verification data save confirmation handler
        socketRef.current.on('verificationDataSaved', (response) => {
          console.log('✅ Verification data saved confirmation:', response);
          setSaveStatus('success');
          
          // Update form data with the final document number from backend response
          if (response.documentReferenceNumber) {
            setFormData(prev => ({ 
              ...prev, 
              documentNumber: response.documentReferenceNumber 
            }));
            console.log('✅ Updated document number from backend response:', response.documentReferenceNumber);
          }
        });

        // Verification data save error handler
        socketRef.current.on('verificationDataError', (error) => {
          console.error('❌ Error saving verification data:', error);
          setSaveStatus('error');
        });

      } catch (error) {
        console.error('❌ Failed to connect to document service:', error);
        setDocumentNumberStatus('error');
      }
    };

    // Connect when component mounts
    connectToDocumentService();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Handle manual document number generation
  const handleGenerateNewDocumentNumber = () => {
    if (socketRef.current && isConnected) {
      setDocumentNumberStatus('loading');
      socketRef.current.emit('generateNewDocumentNumber');
    }
  };

  const verificationTypes = [
    {
      id: 'residence',
      title: 'Residence ',
      description: 'Verify residential address and property details',
      icon: Home,
      color: 'blue',
      features: ['Address verification', 'Property details', 'Personal information', 'Document validation']
    },
    {
      id: 'office',
      title: 'Office ',
      description: 'Verify office location and business operations',
      icon: Building,
      color: 'green',
      features: ['Office location', 'Employee details', 'Business operations', 'Contact verification']
    },
    {
      id: 'business',
      title: 'Business ',
      description: 'Complete business verification process',
      icon: Briefcase,
      color: 'purple',
      features: ['Business registration', 'Legal documents', 'Premises details', 'Compliance check']
    }
  ];

  const getColorClasses = (color, isSelected) => {
    const baseClasses = {
      blue: {
        selected: 'border-blue-500 bg-blue-50 ring-2 ring-blue-200',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        selected: 'border-green-500 bg-green-50 ring-2 ring-green-200',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        selected: 'border-purple-500 bg-purple-50 ring-2 ring-purple-200',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    
    return baseClasses[color] || baseClasses.blue;
  };

  const handleTypeSelect = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) return prev.filter(t => t !== type);
      return [...prev, type];
    });
  };

  const isFormValid = (selectedTypes && selectedTypes.length > 0) && formData.documentNumber && !isSaving;

  const handleNext = async () => {
    const finalSelected = selectedTypes.length > 0 ? selectedTypes : (formData.verificationType ? [formData.verificationType] : []);
    
    // Prepare data to send to backend
    const verificationData = {
      documentReferenceNumber: formData.documentNumber,
      selectedVerificationTypes: finalSelected,
      timestamp: new Date().toISOString()
    };

    setIsSaving(true);
    setSaveStatus('saving');

    try {
      // Send data to backend via WebSocket and wait for confirmation
      if (socketRef.current && isConnected) {
        console.log('📤 Sending verification data to backend via WebSocket:', verificationData);
        
        // Create a promise to wait for the confirmation
        const saveVerificationData = () => {
          return new Promise((resolve, reject) => {
            // Set up response handlers
            const handleSuccess = (response) => {
              console.log('✅ Verification data saved successfully:', response);
              // Clean up event listeners
              socketRef.current.off('verificationDataSaved', handleSuccess);
              socketRef.current.off('verificationDataError', handleError);
              
              // Update form data with the confirmed document number
              if (response.documentReferenceNumber) {
                setFormData(prev => ({ 
                  ...prev, 
                  documentNumber: response.documentReferenceNumber 
                }));
                console.log('✅ Updated document number from backend confirmation:', response.documentReferenceNumber);
              }
              
              resolve(response);
            };

            const handleError = (error) => {
              console.error('❌ Error saving verification data:', error);
              // Clean up event listeners
              socketRef.current.off('verificationDataSaved', handleSuccess);
              socketRef.current.off('verificationDataError', handleError);
              reject(error);
            };

            // Set up event listeners for response
            socketRef.current.on('verificationDataSaved', handleSuccess);
            socketRef.current.on('verificationDataError', handleError);

            // Set timeout for response
            const timeout = setTimeout(() => {
              socketRef.current.off('verificationDataSaved', handleSuccess);
              socketRef.current.off('verificationDataError', handleError);
              reject(new Error('Timeout: No response from server after 5 seconds'));
            }, 5000); // 5 second timeout

            // Send the data
            socketRef.current.emit('saveVerificationData', verificationData);
            
            // Clear timeout on success/error
            socketRef.current.on('verificationDataSaved', () => {
              clearTimeout(timeout);
              console.log('🕒 Cleared timeout due to successful response');
            });
            socketRef.current.on('verificationDataError', () => {
              clearTimeout(timeout);
              console.log('🕒 Cleared timeout due to error response');
            });
          });
        };

        // Wait for the confirmation before proceeding
        const response = await saveVerificationData();
        console.log('✅ WebSocket data confirmed and saved successfully:', response);
        
        // Update form data with the final confirmed data
        setFormData(prev => ({ 
          ...prev, 
          selectedTypes: finalSelected, 
          verificationType: finalSelected[0],
          documentNumber: response.documentReferenceNumber || formData.documentNumber
        }));
        
      } else {
        console.warn('⚠️ WebSocket not connected, cannot save verification data');
        // Update form data without backend confirmation
        setFormData(prev => ({ 
          ...prev, 
          selectedTypes: finalSelected, 
          verificationType: finalSelected[0]
        }));
      }
    } catch (error) {
      console.error('❌ Error sending verification data via WebSocket:', error);
      setSaveStatus('error');
      // You can show an error message to the user here
      alert(`Failed to save verification data: ${error.message}. Please try again.`);
      setIsSaving(false);
      return; // Don't proceed to next step if save failed
    }

    setIsSaving(false);
    // Proceed to next page
    console.log('🚀 Proceeding to next step with formData:', formData);
    onNext();
  };

  // User Guide Content
  const userGuideSteps = [
    {
      icon: FileText,
      title: "Select Verification Type",
      description: "Choose one or more verification types that match your requirements"
    },
    {
      icon: Users,
      title: "Complete Administrative Details",
      description: "Fill in basic information and assign responsible officers"
    },
    {
      icon: MapPin,
      title: "Provide Location Information",
      description: "Enter address and premises details based on verification type"
    },
    {
      icon: Shield,
      title: "Upload Documents",
      description: "Attach required supporting documents for verification"
    },
    {
      icon: CheckCircle,
      title: "Review & Submit",
      description: "Verify all information and submit for processing"
    }
  ];

  const benefits = [
    "Streamlined verification process",
    "Multiple verification types in one session",
    "Real-time progress tracking",
    "Secure document handling",
    "Automated status updates"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">New Verification</h1>
                  <p className="text-gray-600 mt-1">Select verification type to begin</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Setup</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Side - User Guide */}
          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <Info className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Verification Guide</h3>
              </div>

              {/* Process Steps */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide text-blue-800">Process Steps</h4>
                {userGuideSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-blue-200">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{step.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits */}
              <div className="border-t border-blue-200 pt-4">
                <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide text-blue-800 mb-3">Benefits</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estimated Time */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Estimated Completion:</span>
                  <span>15-30 minutes</span>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium underline">
                  Need assistance?
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {/* Verification Type Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Select Verification Type</h2>
                    <p className="text-gray-600 mt-2">Choose one or more verification types to begin the process</p>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {selectedTypes.length} of {verificationTypes.length} selected
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {verificationTypes.map((type) => {
                    const IconComponent = type.icon;
                    const colorClasses = getColorClasses(type.color, selectedTypes.includes(type.id));
                    const isSelected = selectedTypes.includes(type.id);
                    
                    return (
                      <div
                        key={type.id}
                        className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          isSelected 
                            ? colorClasses.selected 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleTypeSelect(type.id)}
                      >
                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-blue-600 text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </div>
                          </div>
                        )}

                        {/* Icon */}
                        <div className={`p-3 rounded-lg bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4 ${
                          isSelected ? `bg-${type.color}-500` : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${isSelected ? colorClasses.icon : 'text-gray-400'}`} />
                        </div>

                        {/* Content */}
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{type.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{type.description}</p>

                        {/* Features */}
                        <ul className="space-y-2">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-500">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Selection Hint */}
                        <div className={`mt-4 text-sm font-medium ${
                          isSelected ? `text-${type.color}-600` : 'text-gray-400'
                        }`}>
                          {isSelected ? 'Selected' : 'Click to select'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Document Number */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Document Information</h2>
                    <p className="text-gray-600 mt-1">Enter the reference document number</p>
                  </div>
                  
                  {/* WebSocket Connection Status */}
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
                      isConnected 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {isConnected ? (
                        <>
                          <Wifi className="w-3 h-3 mr-1" />
                          Connected
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3 mr-1" />
                          Disconnected
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="max-w-md">
                  <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-3">
                    Document Number *
                  </label>
                  <div className={`flex space-x-3 ${(!formData.documentNumber || formData.documentNumber === '') ? 'flex' : 'block'}`}>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="documentNumber"
                        value={formData.documentNumber || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                        className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                          documentNumberStatus === 'loading' 
                            ? 'border-blue-300 bg-blue-50' 
                            : documentNumberStatus === 'received'
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-300'
                        }`}
                        placeholder={documentNumberStatus === 'loading' ? 'Loading document number...' : 'Enter document reference number'}
                        disabled={documentNumberStatus === 'loading'}
                      />
                    </div>
                    
                    {/* Generate New Number Button - Only show if no document number is displayed */}
                    {(!formData.documentNumber || formData.documentNumber === '') && (
                      <button
                        type="button"
                        onClick={handleGenerateNewDocumentNumber}
                        disabled={!isConnected || documentNumberStatus === 'loading'}
                        className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isConnected && documentNumberStatus !== 'loading'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        title="Generate new document number"
                      >
                        {documentNumberStatus === 'loading' ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          'Generate'
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Status Messages */}
                  <div className="mt-2 text-sm">
                    {documentNumberStatus === 'loading' && (
                      <p className="text-blue-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1 animate-spin" />
                        Loading document number from server...
                      </p>
                    )}
                    {documentNumberStatus === 'received' && formData.documentNumber && (
                      <p className="text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Document number {formData.documentNumber} ready for verification
                      </p>
                    )}
                    {documentNumberStatus === 'error' && (
                      <p className="text-red-600">
                        Unable to connect to document service. You can enter a document number manually.
                      </p>
                    )}
                    {documentNumberStatus !== 'error' && !formData.documentNumber && (
                      <p className="text-gray-500">
                        This will be used as the primary reference for this verification process.
                      </p>
                    )}
                    {formData.documentNumber && documentNumberStatus === 'received' && (
                      <p className="text-gray-500 mt-1">
                        Ready to proceed with selected verification types.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {selectedTypes.length > 0 ? (
                    <span className="text-green-600 font-medium">
                      {selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''} selected
                    </span>
                  ) : (
                    'No verification types selected'
                  )}
                  {isSaving && (
                    <span className="ml-3 text-blue-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1 animate-spin" />
                      Saving verification data...
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={!isFormValid}
                  className={`flex items-center px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                      : 'bg-gray-400 cursor-not-allowed'
                  } ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSaving ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue to Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium text-blue-600">Step 1 of 7</span>
                  <span>Verification Type Selection</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: '14%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">View verification guidelines</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationTypeSelector;