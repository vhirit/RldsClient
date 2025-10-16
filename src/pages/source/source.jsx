
// export default PersonManager;
import React, { useState, useEffect } from 'react';
import { sourcePersonAPI } from '../services/api';
import { Plus  } from 'lucide-react';
const PersonManager = () => {
  const [persons, setPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    county: '',
    country: 'India',
    status: 'Active'
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch persons on component mount
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const response = await sourcePersonAPI.getAllPersons();
      if (response.success) {
        setPersons(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
      setApiError('Failed to load persons. Using demo data.');
      // Fallback to demo data if API fails
      setPersons([
        {
          id: 1,
          name: 'John Smith',
          mobile: '+91 9876543210',
          email: 'john.smith@example.com',
          city: 'Mumbai',
          state: 'Maharashtra',
          county: 'Mumbai Suburban',
          country: 'India',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          mobile: '+91 8765432109',
          email: 'priya.sharma@example.com',
          city: 'Delhi',
          state: 'Delhi',
          county: 'New Delhi',
          country: 'India',
          status: 'Active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    const requiredFields = ['name', 'mobile', 'email', 'city', 'state', 'county', 'country'];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    if (formData.mobile && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid mobile number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      if (editingPerson) {
        // Update existing person
        const personId = editingPerson._id || editingPerson.id;
        const response = await sourcePersonAPI.updatePerson(personId, formData);
        if (response.success) {
          await fetchPersons(); // Refresh the list after update
        }
      } else {
        // Register new person
        const response = await sourcePersonAPI.register(formData);
        if (response.success) {
          await fetchPersons(); // Refresh the list after creation
        }
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving person:', error);
      setApiError(error.message || 'Failed to save person. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setFormData(person);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      city: '',
      state: '',
      county: '',
      country: 'India',
      status: 'Active'
    });
    setFormErrors({});
    setApiError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await sourcePersonAPI.deletePerson(id);
      if (response.success) {
        await fetchPersons(); // Refresh the list after deletion
        // Adjust current page if needed
        const updatedPersons = persons.filter(person => (person._id || person.id) !== id);
        const totalPages = Math.ceil(updatedPersons.length / itemsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages || 1);
        }
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      setApiError('Failed to delete person. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Calculate stats
  const totalActive = persons.filter(person => person.status === 'Active').length;
  const totalInactive = persons.filter(person => person.status === 'Inactive').length;
  const indiaCount = persons.filter(person => person.country === 'India').length;
  const internationalCount = persons.filter(person => person.country !== 'India').length;

  // Pagination calculations
  const totalItems = persons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPersons = persons.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Helper function to get input border class based on validation
  const getInputBorderClass = (fieldName) => {
    return formErrors[fieldName] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Source Person Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage person information with contact details
          </p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              {apiError}
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Persons</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">{persons.length}</p>
              </div>
              <div className="bg-blue-500 text-white p-3 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">Active</p>
                <p className="text-2xl font-bold text-green-800 mt-1">{totalActive}</p>
              </div>
              <div className="bg-green-500 text-white p-3 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-2xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">Inactive</p>
                <p className="text-2xl font-bold text-red-800 mt-1">{totalInactive}</p>
              </div>
              <div className="bg-red-500 text-white p-3 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Countries</p>
                <p className="text-2xl font-bold text-purple-800 mt-1">{indiaCount + internationalCount > 0 ? new Set(persons.map(p => p.country)).size : 0}</p>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Person Details</h2>
              <p className="text-gray-600 mt-1">Manage all person information and contact details</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add New Person
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-purple-50">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Personal Info
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPersons.map((person) => (
                  <tr key={person._id || person.id} className="hover:bg-purple-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {person.name?.charAt(0)?.toUpperCase() || 'N'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {person.name || 'N/A'}
                          </div>
                          <div className="text-gray-500 text-sm">
                            ID: {person._id || person.id || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {person.mobile || 'N/A'}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {person.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {person.city || 'N/A'}, {person.state || 'N/A'}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {person.county || 'N/A'}, {person.country || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        person.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {person.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(person)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                          title="Edit Person"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(person._id || person.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                          title="Delete Person"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Items per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <PersonModal
          formData={formData}
          formErrors={formErrors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isEditing={!!editingPerson}
          loading={loading}
          getInputBorderClass={getInputBorderClass}
        />
      )}
    </div>
  );
};

// Updated PersonModal Component with Validation
const PersonModal = ({ 
  formData, 
  formErrors, 
  onInputChange, 
  onSubmit, 
  onClose, 
  isEditing, 
  loading,
  getInputBorderClass 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditing ? 'Edit Person' : 'Add New Person'}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {isEditing ? 'Update person details' : 'Create a new person entry'}
          </p>
        </div>
        
        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('name')}`}
                placeholder="Enter full name"
                disabled={loading}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => onInputChange('mobile', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('mobile')}`}
                placeholder="Enter mobile number"
                disabled={loading}
              />
              {formErrors.mobile && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {formErrors.mobile}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('email')}`}
                placeholder="Enter email address"
                disabled={loading}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* City Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => onInputChange('city', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('city')}`}
                  placeholder="Enter city"
                  disabled={loading}
                />
                {formErrors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {formErrors.city}
                  </p>
                )}
              </div>

              {/* State Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => onInputChange('state', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('state')}`}
                  placeholder="Enter state"
                  disabled={loading}
                />
                {formErrors.state && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {formErrors.state}
                  </p>
                )}
              </div>

              {/* County Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  County *
                </label>
                <input
                  type="text"
                  required
                  value={formData.county}
                  onChange={(e) => onInputChange('county', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('county')}`}
                  placeholder="Enter county"
                  disabled={loading}
                />
                {formErrors.county && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {formErrors.county}
                  </p>
                )}
              </div>
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => onInputChange('country', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-colors ${getInputBorderClass('country')}`}
                disabled={loading}
              >
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.country && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {formErrors.country}
                </p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => onInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                disabled={loading}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              {isEditing ? 'Update Person' : 'Create Person'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add new icons for error states
const ExclamationTriangleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const ExclamationCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ... (keep all other existing icons) ...

export default PersonManager;