import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import branchService from '../../../branch/branchService';
import { sourcePersonAPI } from '../../../services/api';

const AdministrativeDetails = ({ formData, setFormData, onSectionSave }) => {
  const [branches, setBranches] = useState([]);
  const [branchLoading, setBranchLoading] = useState(true);
  const [branchError, setBranchError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  
  // Source person state
  const [sourcePersons, setSourcePersons] = useState([]);
  const [sourcePersonLoading, setSourcePersonLoading] = useState(false);
  const [sourcePersonError, setSourcePersonError] = useState('');
  
  // Modal state for adding new branch
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [newBranchData, setNewBranchData] = useState({
    branchName: '',
    code: '',
    local: '',
    nonLocal: '',
    gst: '',
    status: 'Active'
  });
  const [addBranchLoading, setAddBranchLoading] = useState(false);
  const [addBranchError, setAddBranchError] = useState('');

  // Modal state for adding new source person
  const [showAddSourcePersonModal, setShowAddSourcePersonModal] = useState(false);
  const [newSourcePersonData, setNewSourcePersonData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    county: '',
    status: 'Active'
  });
  const [addSourcePersonLoading, setAddSourcePersonLoading] = useState(false);
  const [addSourcePersonError, setAddSourcePersonError] = useState('');

  // WebSocket connection for branch data
  useEffect(() => {
    const connectToBranchService = () => {
      try {
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

        socketRef.current.on('connect', () => {
          console.log('🏢 Connected to branch WebSocket service');
          setIsConnected(true);
          setBranchLoading(true);
          
          // Request branch data
          socketRef.current.emit('requestBranches');
        });

        socketRef.current.on('disconnect', () => {
          console.log('🏢 Disconnected from branch WebSocket');
          setIsConnected(false);
        });

        socketRef.current.on('branchesData', (response) => {
          console.log('🏢 Received branches data:', response);
          if (response.success && response.branches) {
            setBranches(response.branches);
            setBranchError('');
          }
          setBranchLoading(false);
        });

        socketRef.current.on('branchesError', (error) => {
          console.error('❌ Branch data error:', error);
          setBranchError(error.error || 'Failed to load branches');
          setBranchLoading(false);
        });

        // Listen for new branches added in real-time
        socketRef.current.on('newBranchAdded', (data) => {
          console.log('🎉 New branch added via WebSocket:', data.branch.branchName);
          console.log('📋 Current branches before update:', branches.length);
          setBranches(prev => {
            const updatedBranches = [...prev, data.branch].sort((a, b) => a.branchName.localeCompare(b.branchName));
            console.log('📋 Updated branches count:', updatedBranches.length);
            return updatedBranches;
          });
          
          // Also refresh the branch list to ensure we have the latest data
          console.log('🔄 Requesting fresh branch list after new branch added');
          socketRef.current.emit('requestBranches');
        });

        // Listen for branch updates
        socketRef.current.on('branchUpdated', (data) => {
          console.log('🔄 Branch updated:', data.branch.branchName);
          setBranches(prev => prev.map(branch => 
            branch._id === data.branch._id ? data.branch : branch
          ));
        });

        // Listen for branch deletions
        socketRef.current.on('branchDeleted', (data) => {
          console.log('🗑️ Branch deleted:', data.branchName);
          setBranches(prev => prev.filter(branch => branch._id !== data.branchId));
        });

        // Listen for new source person added in real-time
        socketRef.current.on('newSourcePersonAdded', (data) => {
          console.log('🎉 New source person added via WebSocket:', data.sourcePerson?.name);
          if (data.sourcePerson) {
            setSourcePersons(prev => {
              const exists = prev.some(person => person._id === data.sourcePerson._id);
              if (!exists) {
                const updated = [...prev, data.sourcePerson].sort((a, b) => a.name.localeCompare(b.name));
                console.log('📋 Updated source persons count:', updated.length);
                return updated;
              }
              return prev;
            });
          }
        });

        // Listen for source person updates
        socketRef.current.on('sourcePersonUpdated', (data) => {
          console.log('🔄 Source person updated:', data.sourcePerson?.name);
          if (data.sourcePerson) {
            setSourcePersons(prev => prev.map(person => 
              person._id === data.sourcePerson._id ? data.sourcePerson : person
            ));
          }
        });

        // Listen for source person deletions
        socketRef.current.on('sourcePersonDeleted', (data) => {
          console.log('🗑️ Source person deleted:', data.sourcePersonName);
          setSourcePersons(prev => prev.filter(person => person._id !== data.sourcePersonId));
        });

        socketRef.current.on('error', (error) => {
          console.error('❌ WebSocket error:', error);
          setBranchError('Connection error');
          setBranchLoading(false);
        });

      } catch (error) {
        console.error('❌ Failed to connect to branch service:', error);
        setBranchError('Failed to connect to branch service');
        setBranchLoading(false);
      }
    };

    connectToBranchService();

    return () => {
      if (socketRef.current) {
        // Clean up all WebSocket listeners
        socketRef.current.off('newSourcePersonAdded');
        socketRef.current.off('sourcePersonUpdated');
        socketRef.current.off('sourcePersonDeleted');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Load initial source persons data
  useEffect(() => {
    const loadSourcePersons = async () => {
      try {
        setSourcePersonLoading(true);
        setSourcePersonError('');
        console.log('👤 Loading source persons from API...');
        
        const response = await sourcePersonAPI.getAllPersons();
        if (response.success && response.data) {
          console.log('✅ Source persons loaded:', response.data.length);
          setSourcePersons(response.data);
        } else {
          console.error('❌ Failed to load source persons:', response.message);
          setSourcePersonError(response.message || 'Failed to load source persons');
        }
      } catch (error) {
        console.error('❌ Error loading source persons:', error);
        setSourcePersonError('Failed to connect to source person service');
      } finally {
        setSourcePersonLoading(false);
      }
    };

    loadSourcePersons();
  }, []); // Load once on component mount

  // Handle new branch creation
  const handleAddNewBranch = async () => {
    try {
      setAddBranchLoading(true);
      setAddBranchError('');

      // Validate required fields
      if (!newBranchData.branchName.trim()) {
        setAddBranchError('Branch name is required');
        setAddBranchLoading(false);
        return;
      }

      if (!newBranchData.code.trim()) {
        setAddBranchError('Branch code is required');
        setAddBranchLoading(false);
        return;
      }

      // Validate GST if provided
      if (newBranchData.gst.trim() && validateNewBranchField('gst', newBranchData.gst)) {
        setAddBranchError('Please enter a valid GST number format');
        setAddBranchLoading(false);
        return;
      }

      console.log('🆕 Creating new branch:', newBranchData);

      const response = await branchService.createBranch({
        branchName: newBranchData.branchName.trim(),
        code: newBranchData.code.trim().toUpperCase(),
        local: parseInt(newBranchData.local) || 0,
        nonLocal: parseInt(newBranchData.nonLocal) || 0,
        gst: newBranchData.gst.trim(),
        status: newBranchData.status
      });

      if (response.success) {
        console.log('✅ Branch created successfully:', response.data);
        
        // Close modal and reset form
        setShowAddBranchModal(false);
        setNewBranchData({
          branchName: '',
          code: '',
          local: '',
          nonLocal: '',
          gst: '',
          status: 'Active'
        });

        // Select the newly created branch
        handleChange('residenceVerification.branchName', response.data.branchName);

        // Immediately add the new branch to the local state
        setBranches(prev => {
          const exists = prev.some(branch => branch._id === response.data._id);
          if (!exists) {
            const updated = [...prev, response.data].sort((a, b) => a.branchName.localeCompare(b.branchName));
            console.log('✅ Added new branch to local state:', response.data.branchName);
            return updated;
          }
          return prev;
        });

        // Also request fresh branch list via WebSocket to ensure consistency
        if (socketRef.current && isConnected) {
          console.log('🔄 Requesting fresh branch list after creation');
          socketRef.current.emit('requestBranches');
        }

        // The WebSocket will automatically update the branches list via 'newBranchAdded' event for other clients
        console.log('🎉 New branch added and WebSocket will notify other clients');

      } else {
        setAddBranchError(response.message || 'Failed to create branch');
      }
    } catch (error) {
      console.error('❌ Error creating branch:', error);
      setAddBranchError(error.message || 'Failed to create branch');
    } finally {
      setAddBranchLoading(false);
    }
  };

  // Handle new branch form changes
  const handleNewBranchChange = (field, value) => {
    setNewBranchData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (addBranchError) {
      setAddBranchError('');
    }
  };

  // Validation for new branch form
  const validateNewBranchField = (field, value) => {
    switch (field) {
      case 'branchName':
        return !value || value.trim().length === 0;
      case 'code':
        return !value || value.trim().length === 0;
      case 'gst':
        // GST is optional, but if provided should be valid format
        if (value && value.trim().length > 0) {
          const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
          return !gstPattern.test(value.trim());
        }
        return false;
      default:
        return false;
    }
  };

  const getNewBranchInputClass = (field) => {
    const hasError = validateNewBranchField(field, newBranchData[field]);
    return `w-full px-3 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`;
  };

  // Handle new source person creation
  const handleAddNewSourcePerson = async () => {
    try {
      setAddSourcePersonLoading(true);
      setAddSourcePersonError('');

      // Validate required fields
      if (!newSourcePersonData.name.trim()) {
        setAddSourcePersonError('Name is required');
        setAddSourcePersonLoading(false);
        return;
      }

      if (!newSourcePersonData.mobile.trim()) {
        setAddSourcePersonError('Mobile number is required');
        setAddSourcePersonLoading(false);
        return;
      }

      // Validate email format if provided
      if (newSourcePersonData.email.trim() && validateSourcePersonField('email', newSourcePersonData.email)) {
        setAddSourcePersonError('Please enter a valid email format');
        setAddSourcePersonLoading(false);
        return;
      }

      console.log('🆕 Creating new source person:', newSourcePersonData);

      // Create source person via API
      const response = await sourcePersonAPI.register({
        name: newSourcePersonData.name.trim(),
        mobile: newSourcePersonData.mobile.trim(),
        email: newSourcePersonData.email.trim(),
        city: newSourcePersonData.city.trim(),
        state: newSourcePersonData.state.trim(),
        county: newSourcePersonData.county.trim(),
        status: newSourcePersonData.status
      });

      if (response.success) {
        console.log('✅ Source person created successfully:', response.data);
        
        // Close modal and reset form
        setShowAddSourcePersonModal(false);
        setNewSourcePersonData({
          name: '',
          mobile: '',
          email: '',
          city: '',
          state: '',
          county: '',
          status: 'Active'
        });

        // Select the newly created source person
        const createdPerson = response.data;
        handleChange('residenceVerification.sourcePerson', createdPerson.name);

        // Immediately add the new source person to the local state
        setSourcePersons(prev => {
          const exists = prev.some(person => person._id === createdPerson._id);
          if (!exists) {
            const updated = [...prev, createdPerson].sort((a, b) => a.name.localeCompare(b.name));
            console.log('✅ Added new source person to local state:', createdPerson.name);
            return updated;
          }
          return prev;
        });

        // The WebSocket will automatically notify other clients via 'newSourcePersonAdded' event
        console.log('🎉 New source person added and WebSocket will notify other clients');

      } else {
        setAddSourcePersonError(response.message || 'Failed to create source person');
      }

    } catch (error) {
      console.error('❌ Error creating source person:', error);
      setAddSourcePersonError(error.message || 'Failed to create source person');
    } finally {
      setAddSourcePersonLoading(false);
    }
  };

  // Handle new source person form changes
  const handleNewSourcePersonChange = (field, value) => {
    setNewSourcePersonData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (addSourcePersonError) {
      setAddSourcePersonError('');
    }
  };

  // Validation for new source person form
  const validateSourcePersonField = (field, value) => {
    switch (field) {
      case 'name':
        return !value || value.trim().length === 0;
      case 'mobile':
        return !value || value.trim().length === 0;
      case 'email':
        // Email is optional, but if provided should be valid format
        if (value && value.trim().length > 0) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return !emailPattern.test(value.trim());
        }
        return false;
      default:
        return false;
    }
  };

  const getNewSourcePersonInputClass = (field) => {
    const hasError = validateSourcePersonField(field, newSourcePersonData[field]);
    return `w-full px-3 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`;
  };

  // Reset modal state when closing
  const handleCloseBranchModal = () => {
    setShowAddBranchModal(false);
    setNewBranchData({
      branchName: '',
      code: '',
      local: '',
      nonLocal: '',
      gst: '',
      status: 'Active'
    });
    setAddBranchError('');
  };

  // Reset source person modal state when closing
  const handleCloseSourcePersonModal = () => {
    setShowAddSourcePersonModal(false);
    setNewSourcePersonData({
      name: '',
      mobile: '',
      email: '',
      city: '',
      state: '',
      county: '',
      status: 'Active'
    });
    setAddSourcePersonError('');
  };

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
    // optional: read validation errors from formData.errors if available
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
    return `w-full px-3 py-2 ${hasError ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;
  };

  const residence = formData.residenceVerification || {};

  return (
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
            value={residence.dateOfReceipt || ''}
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
            value={residence.dateOfReport || ''}
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
            value={residence.referenceNo || ''}
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
          <div className="relative">
            <select
              value={residence.branchName || ''}
              onChange={(e) => handleChange('residenceVerification.branchName', e.target.value)}
              className={`${getInputClass('residenceVerification.branchName')} ${branchLoading ? 'bg-gray-100' : ''}`}
              disabled={branchLoading || !isConnected}
            >
              <option value="">
                {branchLoading ? 'Loading branches...' : 'Select a branch'}
              </option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.branchName}>
                  {branch.branchName} ({branch.code})
                </option>
              ))}
            </select>
            
            {/* Add New Branch Button */}
            <button
              type="button"
              onClick={() => setShowAddBranchModal(true)}
              disabled={branchLoading || !isConnected}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200"
              title="Add new branch"
            >
              + Add
            </button>
            
            {/* Loading indicator */}
            {branchLoading && (
              <div className="absolute right-3 top-3">
                <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {/* Connection status indicator */}
            {!isConnected && !branchLoading && (
              <div className="absolute right-3 top-3">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Error messages */}
          {branchError && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {branchError}
            </p>
          )}
          
          {getFieldError('residenceVerification.branchName') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.branchName')}
            </p>
          )}
          
          {/* Branch info display */}
          {residence.branchName && branches.length > 0 && (
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              {(() => {
                const selectedBranch = branches.find(b => b.branchName === residence.branchName);
                if (selectedBranch) {
                  return (
                    <div className="text-xs text-blue-700">
                      <span className="font-medium">Code:</span> {selectedBranch.code} | 
                      <span className="font-medium"> Local:</span> ₹{selectedBranch.local} | 
                      <span className="font-medium"> Non-Local:</span> ₹{selectedBranch.nonLocal}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type Of Loan
          </label>
          <select
            value={residence.typeOfLoan || ''}
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
            value={residence.applicantName || ''}
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
            value={residence.relationshipOfPerson || ''}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Person *
          </label>
          <div className="relative">
            <select
              value={residence.sourcePerson || ''}
              onChange={(e) => handleChange('residenceVerification.sourcePerson', e.target.value)}
              className={`${getInputClass('residenceVerification.sourcePerson')} ${sourcePersonLoading ? 'bg-gray-100' : ''}`}
              disabled={sourcePersonLoading}
            >
              <option value="">
                {sourcePersonLoading ? 'Loading source persons...' : 'Select a source person'}
              </option>
              {sourcePersons.map((person) => (
                <option key={person._id} value={person.name}>
                  {person.name} ({person.mobile})
                </option>
              ))}
            </select>
            
            {/* Add New Source Person Button */}
            <button
              type="button"
              onClick={() => setShowAddSourcePersonModal(true)}
              disabled={sourcePersonLoading}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200"
              title="Add new source person"
            >
              + Add
            </button>
            
            {/* Loading indicator */}
            {sourcePersonLoading && (
              <div className="absolute right-3 top-3">
                <svg className="animate-spin h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          
          {/* Error messages */}
          {sourcePersonError && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {sourcePersonError}
            </p>
          )}
          
          {getFieldError('residenceVerification.sourcePerson') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getFieldError('residenceVerification.sourcePerson')}
            </p>
          )}
          
          {/* Source Person info display */}
          {residence.sourcePerson && sourcePersons.length > 0 && (
            <div className="mt-2 p-2 bg-green-50 rounded-md">
              {(() => {
                const selectedPerson = sourcePersons.find(p => p.name === residence.sourcePerson);
                if (selectedPerson) {
                  return (
                    <div className="text-xs text-green-700">
                      <span className="font-medium">Mobile:</span> {selectedPerson.mobile} | 
                      <span className="font-medium"> Email:</span> {selectedPerson.email || 'N/A'} | 
                      <span className="font-medium"> City:</span> {selectedPerson.city || 'N/A'}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Add Branch Modal */}
      {showAddBranchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Branch</h3>
              <button
                onClick={handleCloseBranchModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
                disabled={addBranchLoading}
              >
                ×
              </button>
            </div>

            {addBranchError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {addBranchError}
                </p>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleAddNewBranch(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name *
                </label>
                <input
                  type="text"
                  value={newBranchData.branchName}
                  onChange={(e) => handleNewBranchChange('branchName', e.target.value)}
                  className={getNewBranchInputClass('branchName')}
                  placeholder="Enter branch name"
                  required
                  disabled={addBranchLoading}
                />
                {validateNewBranchField('branchName', newBranchData.branchName) && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Branch name is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Code *
                </label>
                <input
                  type="text"
                  value={newBranchData.code}
                  onChange={(e) => handleNewBranchChange('code', e.target.value.toUpperCase())}
                  className={getNewBranchInputClass('code')}
                  placeholder="Enter branch code (e.g., BLR001)"
                  required
                  disabled={addBranchLoading}
                />
                {validateNewBranchField('code', newBranchData.code) && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Branch code is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Local Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={newBranchData.local}
                    onChange={(e) => handleNewBranchChange('local', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    disabled={addBranchLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Non-Local Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={newBranchData.nonLocal}
                    onChange={(e) => handleNewBranchChange('nonLocal', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    disabled={addBranchLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  value={newBranchData.gst}
                  onChange={(e) => handleNewBranchChange('gst', e.target.value.toUpperCase())}
                  className={getNewBranchInputClass('gst')}
                  placeholder="Enter GST number (e.g., 29AAAAA0000A1Z5)"
                  pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                  title="Please enter a valid GST number"
                  disabled={addBranchLoading}
                />
                {validateNewBranchField('gst', newBranchData.gst) && newBranchData.gst.trim().length > 0 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Please enter a valid GST number format
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newBranchData.status}
                  onChange={(e) => handleNewBranchChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={addBranchLoading}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseBranchModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={addBranchLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 flex items-center"
                  disabled={
                    addBranchLoading || 
                    !newBranchData.branchName.trim() || 
                    !newBranchData.code.trim() ||
                    validateNewBranchField('branchName', newBranchData.branchName) ||
                    validateNewBranchField('code', newBranchData.code) ||
                    validateNewBranchField('gst', newBranchData.gst)
                  }
                >
                  {addBranchLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {addBranchLoading ? 'Creating...' : 'Create Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Source Person Modal */}
      {showAddSourcePersonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Source Person</h3>
              <button
                onClick={handleCloseSourcePersonModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
                disabled={addSourcePersonLoading}
              >
                ×
              </button>
            </div>

            {addSourcePersonError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {addSourcePersonError}
                </p>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleAddNewSourcePerson(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newSourcePersonData.name}
                  onChange={(e) => handleNewSourcePersonChange('name', e.target.value)}
                  className={getNewSourcePersonInputClass('name')}
                  placeholder="Enter full name"
                  required
                  disabled={addSourcePersonLoading}
                />
                {validateSourcePersonField('name', newSourcePersonData.name) && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Full name is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={newSourcePersonData.mobile}
                    onChange={(e) => handleNewSourcePersonChange('mobile', e.target.value)}
                    className={getNewSourcePersonInputClass('mobile')}
                    placeholder="Enter mobile number"
                    required
                    disabled={addSourcePersonLoading}
                  />
                  {validateSourcePersonField('mobile', newSourcePersonData.mobile) && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Mobile number is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newSourcePersonData.email}
                    onChange={(e) => handleNewSourcePersonChange('email', e.target.value)}
                    className={getNewSourcePersonInputClass('email')}
                    placeholder="Enter email address"
                    disabled={addSourcePersonLoading}
                  />
                  {validateSourcePersonField('email', newSourcePersonData.email) && newSourcePersonData.email.trim().length > 0 && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Please enter a valid email format
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newSourcePersonData.city}
                    onChange={(e) => handleNewSourcePersonChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city"
                    disabled={addSourcePersonLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newSourcePersonData.state}
                    onChange={(e) => handleNewSourcePersonChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter state"
                    disabled={addSourcePersonLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    County
                  </label>
                  <input
                    type="text"
                    value={newSourcePersonData.county}
                    onChange={(e) => handleNewSourcePersonChange('county', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter county"
                    disabled={addSourcePersonLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newSourcePersonData.status}
                  onChange={(e) => handleNewSourcePersonChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={addSourcePersonLoading}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseSourcePersonModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={addSourcePersonLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-400 flex items-center"
                  disabled={
                    addSourcePersonLoading || 
                    !newSourcePersonData.name.trim() || 
                    !newSourcePersonData.mobile.trim() ||
                    validateSourcePersonField('name', newSourcePersonData.name) ||
                    validateSourcePersonField('mobile', newSourcePersonData.mobile) ||
                    validateSourcePersonField('email', newSourcePersonData.email)
                  }
                >
                  {addSourcePersonLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {addSourcePersonLoading ? 'Creating...' : 'Create Source Person'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrativeDetails;
