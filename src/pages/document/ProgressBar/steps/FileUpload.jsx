import React, { useCallback, useState } from 'react';

const FileUpload = ({ onFilesChange, multiple = true, accept = "image/*,.pdf,.doc,.docx", maxSizeMB = 10, error = null }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const maxSize = maxSizeMB * 1024 * 1024;
    const validFiles = files.filter(file => {
      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum size is ${maxSizeMB}MB.`);
        return false;
      }
      
      // Check file type based on accept prop
      if (accept !== "*" && accept !== "*/*") {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const fileType = file.type.toLowerCase();
        
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return type.toLowerCase() === fileExtension;
          } else if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return fileType.startsWith(category + '/');
          } else {
            return fileType === type.toLowerCase();
          }
        });
        
        if (!isAccepted) {
          alert(`File type not supported for "${file.name}". Accepted types: ${accept}`);
          return false;
        }
      }
      
      return true;
    });
    
    const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
    
    // Limit files if multiple is false
    if (!multiple && newFiles.length > 1) {
      setSelectedFiles([newFiles[0]]);
      onFilesChange([newFiles[0]]);
      return;
    }
    
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const removeAllFiles = () => {
    setSelectedFiles([]);
    onFilesChange([]);
  };

  const getFileIcon = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const fileType = file.type.toLowerCase();
    
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('word') || extension === 'doc' || extension === 'docx') {
      return '📝';
    } else if (fileType.includes('excel') || extension === 'xls' || extension === 'xlsx') {
      return '📊';
    } else {
      return '📎';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAcceptedTypesText = () => {
    if (accept === "*" || accept === "*/*") return "Any files";
    
    const types = accept.split(',').map(type => {
      if (type.startsWith('.')) {
        return type.toUpperCase();
      } else if (type.endsWith('/*')) {
        return type.split('/')[0].toUpperCase() + ' files';
      } else {
        return type;
      }
    });
    
    return types.join(', ');
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 shadow-inner' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          onChange={handleChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className={`p-3 rounded-full ${
              dragActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center text-sm text-gray-600 gap-1">
              <span className="font-medium text-gray-700">Click to upload</span>
              <span>or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">
              {getAcceptedTypesText()} up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Selected Files ({selectedFiles.length})
            </h4>
            {multiple && selectedFiles.length > 1 && (
              <button
                type="button"
                onClick={removeAllFiles}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Remove All
              </button>
            )}
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <span className="text-lg flex-shrink-0">{getFileIcon(file)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
                  title={`Remove ${file.name}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center text-sm text-blue-700">
            <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected. 
              Files will be uploaded when you submit the form.
            </span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-sm text-red-600">
            <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;