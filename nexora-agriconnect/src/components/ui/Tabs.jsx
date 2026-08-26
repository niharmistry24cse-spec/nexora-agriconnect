import React from 'react';

export const Tabs = ({
  tabs = [], // [{ id, label, count }]
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`tab-list ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tab-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span style={{
                marginLeft: '6px',
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: isActive ? 'var(--color-primary-soft)' : 'var(--color-neutral-soft)',
                color: isActive ? 'var(--color-primary-text)' : 'var(--color-text-muted)'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
