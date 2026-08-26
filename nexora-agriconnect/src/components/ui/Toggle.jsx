import React from 'react';

export const Toggle = ({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  id
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={`toggle-wrapper ${className}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {(label || description) && (
        <div style={{ flex: 1 }}>
          {label && <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)' }}>{label}</div>}
          {description && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>{description}</div>}
        </div>
      )}
      <div className={`toggle-switch ${checked ? 'is-checked' : ''} ${disabled ? 'is-disabled' : ''}`}>
        <div className="toggle-switch-thumb" />
      </div>
    </div>
  );
};
