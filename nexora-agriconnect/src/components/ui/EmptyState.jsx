import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No records found',
  description = 'There are currently no items matching your criteria.',
  actionLabel,
  actionIcon,
  onAction,
  className = ''
}) => {
  return (
    <div className={`empty-state ${className}`}>
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={24} />
        </div>
      )}
      <h4 className="empty-state-title">{title}</h4>
      {description && <p className="empty-state-description">{description}</p>}
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="sm"
          icon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
