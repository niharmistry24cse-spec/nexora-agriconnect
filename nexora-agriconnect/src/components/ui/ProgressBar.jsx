import React from 'react';

export const ProgressBar = ({
  totalSteps = 5,
  currentStep = 1,
  className = ''
}) => {
  return (
    <div className={`progress-segmented ${className}`} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= currentStep;
        return (
          <div
            key={stepNum}
            className={`progress-segment ${isActive ? 'is-active' : ''}`}
            title={`Step ${stepNum}`}
          />
        );
      })}
    </div>
  );
};
