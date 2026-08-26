import React from 'react';

export const Avatar = ({
  src,
  name = '',
  initials,
  size = 'md', // sm | md | lg
  className = '',
  ...props
}) => {
  const displayInitials = initials || (name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?');

  return (
    <div className={`avatar avatar-${size} ${className}`} title={name} {...props}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} onError={(e) => { e.target.style.display = 'none'; }} />
      ) : (
        <span>{displayInitials}</span>
      )}
    </div>
  );
};
