import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoleSwitcher = () => {
  const { role, setRole, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Hide RoleSwitcher on Login and Register pages
  if (
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/auth')
  ) {
    return null;
  }

  const roles = [
    { key: 'farmer', label: 'Farmer', homeRoute: '/farmer/dashboard' },
    { key: 'buyer', label: 'Buyer', homeRoute: '/buyer/marketplace' },
    { key: 'authority', label: 'Authority', homeRoute: '/authority/dashboard' },
    { key: 'admin', label: 'Admin', homeRoute: '/admin/users' }
  ];

  const handleRoleChange = (newRoleKey, homeRoute) => {
    setRole(newRoleKey);
    showToast(`Switched active view to ${newRoleKey.toUpperCase()}`, 'info');
    navigate(homeRoute);
  };

  return (
    <div className="role-switcher-widget">
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={16} color="var(--color-primary)" />
        <span className="role-tag">ROLE:</span>
      </div>

      <div className="role-pills">
        {roles.map((r) => (
          <button
            key={r.key}
            type="button"
            className={`role-pill-btn ${role === r.key ? 'is-active' : ''}`}
            onClick={() => handleRoleChange(r.key, r.homeRoute)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}
        title="Quick links"
      >
        {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {expanded && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          marginBottom: '8px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          padding: '12px',
          width: '260px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ fontWeight: 700, fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Quick Reference Screens
          </div>
          <a href="/onboarding/2" style={{ fontSize: '12px' }}>1. Onboarding Step 2</a>
          <a href="/authority/dashboard" style={{ fontSize: '12px' }}>2. Authority Dashboard</a>
          <a href="/farmer/marketplace" style={{ fontSize: '12px' }}>3. Marketplace Browse (Seeds/Tools)</a>
          <a href="/farmer/profile" style={{ fontSize: '12px' }}>4. Farmer Profile (Parcels)</a>
          <a href="/marketplace/product/prod-golden-wheat" style={{ fontSize: '12px' }}>5. Product Detail (Wheat)</a>
          <a href="/farmer/marketplace/sell" style={{ fontSize: '12px' }}>6. Sell a Product Listing</a>
          <a href="/farmer/certification" style={{ fontSize: '12px' }}>7. Certification Request</a>
          <a href="/buyer/orders/AC-8492-MK" style={{ fontSize: '12px' }}>8. Buyer Order Tracking</a>
          <a href="/buyer/marketplace" style={{ fontSize: '12px' }}>9. Buyer Marketplace</a>
          <a href="/farmer/news" style={{ fontSize: '12px' }}>10. Agriculture News Feed</a>
          <a href="/farmer/advisories" style={{ fontSize: '12px' }}>11. Advisories (Dry Spell)</a>
          <a href="/farmer/alerts" style={{ fontSize: '12px' }}>12. Unified Alert Center</a>
          <a href="/authority/certifications/DOC-8892-REV" style={{ fontSize: '12px' }}>13. Authority Cert Review</a>
          <a href="/authority/alerts/publish" style={{ fontSize: '12px' }}>14. Authority Publish Alert</a>
          <a href="/admin/users" style={{ fontSize: '12px' }}>15. Admin User Management</a>
        </div>
      )}
    </div>
  );
};
