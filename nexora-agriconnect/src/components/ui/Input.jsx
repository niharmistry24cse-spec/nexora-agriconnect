import React from 'react';

export const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  unitChip,
  helperText,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>{label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}</span>
        </label>
      )}
      <div className="form-control-wrapper">
        {Icon && (
          <span className="input-leading-icon">
            <Icon size={16} />
          </span>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-input ${Icon ? 'has-leading-icon' : ''} ${unitChip ? 'has-trailing-chip' : ''} ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {unitChip && <span className="input-trailing-chip">{unitChip}</span>}
      </div>
      {error ? (
        <span className="form-error">{error}</span>
      ) : helperText ? (
        <span className="form-helper">{helperText}</span>
      ) : null}
    </div>
  );
};
