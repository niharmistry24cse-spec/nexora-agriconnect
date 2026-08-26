import React from 'react';
import { Check, Truck, Package } from 'lucide-react';

export const Stepper = ({
  steps = [], // [{ id, name, date, status: 'completed' | 'current' | 'upcoming', icon: 'truck' | 'package' }]
  className = ''
}) => {
  return (
    <div className={`stepper ${className}`}>
      <div className="stepper-line" />
      {steps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        const isUpcoming = step.status === 'upcoming';

        return (
          <div
            key={step.id || index}
            className={`stepper-item ${isCompleted ? 'is-completed' : isCurrent ? 'is-current' : 'is-upcoming'}`}
          >
            <div className="stepper-node">
              {isCompleted ? (
                <Check size={16} strokeWidth={2.5} />
              ) : step.icon === 'truck' ? (
                <Truck size={16} />
              ) : step.icon === 'package' ? (
                <Package size={16} />
              ) : (
                step.id || index + 1
              )}
            </div>
            <div className="stepper-label">{step.name}</div>
            {step.date && <div className="stepper-sublabel">{step.date || step.time}</div>}
            {step.time && !step.date && <div className="stepper-sublabel">{step.time}</div>}
          </div>
        );
      })}
    </div>
  );
};
