import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Bell, Languages, ChevronDown, Check, Menu, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';

export const Topbar = ({ title, simplified = false, showAvatar = true }) => {
  const {
    langCode,
    currentLanguage,
    availableLanguages,
    setLanguage,
    openTranslator,
    t,
    alerts,
    farmer,
    showToast,
    toggleMobileMenu,
    isAuthenticated,
    currentUser
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadAlertsCount =
    alerts.priorityAlerts.filter(a => !a.read).length +
    alerts.weatherUpdates.filter(w => !w.read).length +
    alerts.marketShifts.filter(m => !m.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code, name, native) => {
    setLanguage(code);
    setIsLangDropdownOpen(false);
    showToast(`Language switched to ${native} (${name})`, 'success');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Open Navigation Menu"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        {title && <h2 className="topbar-title">{t(title, title)}</h2>}
      </div>

      <div className="topbar-right">
        {/* Quick AgriTranslate Tool Button */}
        <button
          type="button"
          onClick={() => openTranslator('')}
          className="language-btn"
          style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
          title="Open AgriTranslate Tool"
        >
          <Languages size={15} />
          <span>AgriTranslate</span>
        </button>

        {/* Multi-Language Dropdown Switcher */}
        <div className="language-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="language-btn"
            title="Choose Regional Language"
            aria-expanded={isLangDropdownOpen}
          >
            <Globe size={15} />
            <span>{currentLanguage.flag} {currentLanguage.native}</span>
            <ChevronDown size={13} style={{ opacity: 0.7 }} />
          </button>

          {isLangDropdownOpen && (
            <div className="language-dropdown-menu">
              <div className="language-dropdown-header">Select Language / भाषा चुनें</div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-option-btn ${langCode === lang.code ? 'is-active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code, lang.name, lang.native)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{lang.flag}</span>
                    <span>{lang.native} ({lang.name})</span>
                  </span>
                  {langCode === lang.code && <Check size={14} color="#15803d" />}
                </button>
              ))}

              <div className="language-translate-action">
                <button
                  type="button"
                  className="open-translator-btn"
                  onClick={() => {
                    setIsLangDropdownOpen(false);
                    openTranslator('');
                  }}
                >
                  <Languages size={15} />
                  <span>Translate Text & Speech</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications / Alerts */}
        <Link
          to="/farmer/alerts"
          className="topbar-icon-btn"
          title="Alert Center"
          aria-label="Alerts"
        >
          <Bell size={18} />
          {unreadAlertsCount > 0 && <span className="topbar-badge-count" />}
        </Link>

        {/* Profile Avatar / Link */}
        {showAvatar && !simplified && (
          <Link to="/farmer/profile" style={{ display: 'inline-flex' }} title={farmer.name}>
            <Avatar src={farmer.avatarUrl} name={farmer.name} size="sm" />
          </Link>
        )}
      </div>
    </header>
  );
};
