 
// src/components/forms/FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate file upload
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const documents = [
    { name: 'Business License.pdf', uploaded: '2024-01-15', size: '2.4 MB' },
    { name: 'Tax Certificate.pdf', uploaded: '2024-01-10', size: '1.8 MB' },
    { name: 'Bank Agreement.docx', uploaded: '2024-01-05', size: '3.1 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          📁 Upload Document
        </label>
        <p className="text-sm text-gray-600 mt-2">Supported formats: PDF, DOC, JPG, PNG</p>
        
        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold mb-4">Uploaded Documents</h4>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-600">Uploaded: {doc.uploaded} • {doc.size}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;