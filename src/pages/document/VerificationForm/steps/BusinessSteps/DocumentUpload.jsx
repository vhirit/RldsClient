import React from 'react';

const DocumentUpload = ({ formData, setFormData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, documents: files }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Upload</h2>
      <input type="file" multiple onChange={handleFiles} />
    </div>
  );
};

export default DocumentUpload;
