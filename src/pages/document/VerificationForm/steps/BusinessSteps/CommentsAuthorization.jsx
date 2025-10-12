import React from 'react';

const CommentsAuthorization = ({ formData, setFormData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments & Authorization</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
        <textarea value={formData.comments || ''} onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
      </div>
    </div>
  );
};

export default CommentsAuthorization;
