import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral', // success | warning | danger | info | neutral | solid-success | solid-warning | solid-danger
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};
