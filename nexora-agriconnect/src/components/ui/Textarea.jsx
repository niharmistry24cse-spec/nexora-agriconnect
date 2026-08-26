import React from 'react';

export const Textarea = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  helperText,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          <span>{label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}</span>
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-textarea ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error ? (
        <span className="form-error">{error}</span>
      ) : helperText ? (
        <span className="form-helper">{helperText}</span>
      ) : null}
    </div>
  );
};
