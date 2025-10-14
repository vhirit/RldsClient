import React from 'react';
import { 
  Check, 
  ChevronRight, 
  Home, 
  Building, 
  Briefcase, 
  FileText,
  Clock,
  PlayCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

const titleCase = (s) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const ProgressBar = ({ 
  currentStep = 0, 
  currentTypeIndex = 0,
  selectedTypes = [],
  stepsPerType = [],
  completedSteps = {},
  variant = 'default',
  showLabels = true,
  showConnectors = true,
  onStepClick = () => {},
  formData = {}
}) => {
  const variants = {
    default: {
      active: 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200',
      completed: 'bg-blue-600 border-blue-600 text-white',
      upcoming: 'border-gray-300 bg-white text-gray-400 hover:border-blue-300 hover:shadow-md',
      text: 'text-blue-700 font-semibold',
      bar: 'bg-blue-600',
      type: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    green: {
      active: 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200',
      completed: 'bg-green-600 border-green-600 text-white',
      upcoming: 'border-gray-300 bg-white text-gray-400 hover:border-green-300 hover:shadow-md',
      text: 'text-green-700 font-semibold',
      bar: 'bg-green-600',
      type: 'bg-green-100 text-green-800 border-green-200'
    },
    modern: {
      active: 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-600 text-white shadow-lg shadow-blue-200',
      completed: 'bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white',
      upcoming: 'border-gray-200 bg-gray-50 text-gray-400 hover:border-blue-300 hover:bg-white hover:shadow-md',
      text: 'text-gray-800 font-semibold',
      bar: 'bg-gradient-to-r from-blue-600 to-purple-600',
      type: 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200'
    }
  };

  const currentVariant = variants[variant] || variants.modern;

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return currentVariant.completed;
      case 'active':
        return currentVariant.active;
      default:
        return currentVariant.upcoming;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'residence': return Home;
      case 'office': return Building;
      case 'business': return Briefcase;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'residence': return 'blue';
      case 'office': return 'green';
      case 'business': return 'purple';
      default: return 'gray';
    }
  };

  const calculateOverallProgress = () => {
    if (!selectedTypes.length || !stepsPerType.length) return 0;
    
    let totalSteps = 0;
    let completed = 0;
    
    selectedTypes.forEach((_, tIdx) => {
      const typeSteps = stepsPerType[tIdx]?.length || 0;
      totalSteps += typeSteps;
      completed += (completedSteps[tIdx]?.length || 0);
    });
    
    return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="bg-white rounded-2xl   p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Progress</h3>
          <p className="text-gray-600 text-sm mt-1">
            {selectedTypes.length > 1 
              ? `${selectedTypes.length} verification types selected` 
              : 'Track your verification progress'
            }
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{overallProgress}% Complete</span>
        </div>
      </div>

    

      <div className="space-y-4">
       
        {selectedTypes.map((type, tIdx) => {
          if (tIdx < currentTypeIndex) {
            const TypeIcon = getTypeIcon(type);
            const typeColor = getTypeColor(type);
            const isCompleted = (completedSteps[tIdx]?.length || 0) >= ((stepsPerType[tIdx] || []).length);
            
            return (
              <div 
                key={tIdx}
                onClick={() => onStepClick(tIdx, 0)}
                className="group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors duration-200`}>
                        <TypeIcon className={`w-5 h-5 text-green-600`} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-200">
                          {titleCase(type)} 
                        </div>
                        <div className="text-sm text-green-600 font-medium flex items-center space-x-1">
                          <Check className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}

        {/* Current Type Steps */}
        {selectedTypes.length > 0 && selectedTypes[currentTypeIndex] && (
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50">
            {/* Current Type Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedTypes[currentTypeIndex]);
                      return <TypeIcon className="w-5 h-5 text-blue-600" />;
                    })()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {currentTypeIndex + 1}. {titleCase(selectedTypes[currentTypeIndex])} 
                    </div>
                    <div className="text-sm text-blue-600 font-medium flex items-center space-x-1">
                      <PlayCircle className="w-4 h-4" />
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Step {Math.max(1, currentStep)} of {stepsPerType[currentTypeIndex]?.length || 0}
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="p-4 space-y-3">
              {(stepsPerType[currentTypeIndex] || []).map((step, sIdx) => {
                const zeroBasedCurrentStep = Math.max(0, currentStep - 1);
                let status = 'upcoming';
                if (sIdx < zeroBasedCurrentStep) status = 'completed';
                else if (sIdx === zeroBasedCurrentStep) status = 'active';
                
                const stepStyles = getStepStyles(status);
                const isClickable = status === 'completed' || sIdx === zeroBasedCurrentStep;

                return (
                  <div 
                    key={sIdx}
                    onClick={() => isClickable && onStepClick(currentTypeIndex, sIdx)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      isClickable ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : 'cursor-not-allowed'
                    } ${
                      status === 'active' 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {/* Step Number/Status */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                      status === 'active' 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                        : status === 'completed'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}>
                      {status === 'completed' ? (
                        <Check className="w-4 h-4" />
                      ) : status === 'active' ? (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      ) : (
                        <span className="text-sm font-medium">{sIdx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium transition-colors duration-300 ${
                          status === 'active' 
                            ? 'text-blue-700' 
                            : status === 'completed'
                            ? 'text-green-700'
                            : 'text-gray-500'
                        }`}>
                          {step}
                        </span>
                        {status === 'completed' && (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'active' 
                            ? 'bg-blue-500 animate-pulse' 
                            : status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}></div>
                        <span className={`text-xs font-medium ${
                          status === 'active' 
                            ? 'text-blue-600' 
                            : status === 'completed'
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`}>
                          {status === 'completed' && 'Completed'}
                          {status === 'active' && 'In Progress'}
                          {status === 'upcoming' && 'Upcoming'}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Arrow */}
                    {isClickable && (
                      <ArrowRight className={`w-4 h-4 flex-shrink-0 ${
                        status === 'active' ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Types */}
        {selectedTypes.map((type, tIdx) => {
          if (tIdx > currentTypeIndex) {
            const TypeIcon = getTypeIcon(type);
            
            return (
              <div 
                key={tIdx}
                className="group opacity-60"
              >
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <TypeIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-500">
                        {tIdx + 1}. {titleCase(type)} 
                      </div>
                      <div className="text-sm text-gray-400 font-medium flex items-center space-x-1">
                        <Lock className="w-4 h-4" />
                        <span>Upcoming</span>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

     
    </div>
  );
};

export default ProgressBar;