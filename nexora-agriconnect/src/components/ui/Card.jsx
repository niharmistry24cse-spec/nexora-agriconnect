import React from 'react';
import { VoiceButton } from './VoiceButton';

export const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  enableVoice = true,
  voiceText,
  headerBorder = true,
  className = '',
  bodyClassName = '',
  footer,
  ...props
}) => {
  const computedVoiceText = voiceText || (title ? `${title}. ${subtitle || ''}` : '');

  return (
    <div className={`card ${className}`} {...props}>
      {(title || Icon || action || (enableVoice && computedVoiceText)) && (
        <div className={`card-header ${!headerBorder ? 'border-none' : ''}`}>
          <div className="card-header-title">
            {Icon && <Icon size={18} className="card-header-icon" />}
            <div>
              <span className="card-title-text">{title}</span>
              {subtitle && <p className="form-helper" style={{ marginTop: '2px' }}>{subtitle}</p>}
            </div>
            {enableVoice && computedVoiceText && (
              <VoiceButton textToRead={computedVoiceText} />
            )}
          </div>
          {action && <div className="card-header-action">{action}</div>}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
