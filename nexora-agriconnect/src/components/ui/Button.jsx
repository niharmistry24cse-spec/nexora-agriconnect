import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | outline-danger | ghost | danger
  size = 'md',        // sm | md | lg
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </button>
  );
};
