import React from 'react';

export const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option…',
  icon: Icon,
  helperText,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          <span>{label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}</span>
        </label>
      )}
      <div className="form-control-wrapper">
        {Icon && (
          <span className="input-leading-icon">
            <Icon size={16} />
          </span>
        )}
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-select ${Icon ? 'has-leading-icon' : ''} ${error ? 'is-invalid' : ''}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
      </div>
      {error ? (
        <span className="form-error">{error}</span>
      ) : helperText ? (
        <span className="form-helper">{helperText}</span>
      ) : null}
    </div>
  );
};
