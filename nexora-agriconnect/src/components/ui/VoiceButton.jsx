import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceButton = ({ textToRead, title = 'Read aloud', className = '' }) => {
  const { speakText, isSpeaking, speakingText } = useApp();
  const isThisActive = isSpeaking && speakingText === textToRead;

  const handleClick = (e) => {
    e.stopPropagation();
    speakText(textToRead);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`voice-btn ${isThisActive ? 'is-active' : ''} ${className}`}
      title={isThisActive ? 'Stop reading' : title}
      aria-label={title}
    >
      {isThisActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
};
