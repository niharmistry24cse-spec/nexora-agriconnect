import React, { useState, useEffect, useRef } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Volume2,
  Copy,
  Check,
  Mic,
  MicOff,
  Sparkles,
  X,
  BookOpen,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AGRI_GLOSSARY } from '../../data/translations';

export const AgriTranslateModal = () => {
  const {
    isTranslatorOpen,
    setIsTranslatorOpen,
    translatorInitialText,
    availableLanguages,
    langCode,
    translateDynamicText,
    speakText,
    isSpeaking,
    showToast
  } = useApp();

  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState(langCode === 'en' ? 'hi' : langCode);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeGlossaryTab, setActiveGlossaryTab] = useState('crops');

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (isTranslatorOpen) {
      if (translatorInitialText) {
        setInputText(translatorInitialText);
        handleTranslate(translatorInitialText, targetLang, sourceLang);
      }
      // sync target lang with app lang if different from en
      if (langCode !== 'en' && targetLang === 'hi' && langCode !== targetLang) {
        setTargetLang(langCode);
      }
    }
  }, [isTranslatorOpen, translatorInitialText]);

  const handleTranslate = async (textToTranslate = inputText, target = targetLang, source = sourceLang) => {
    if (!textToTranslate.trim()) {
      setTranslatedText('');
      return;
    }
    setIsLoading(true);
    try {
      const res = await translateDynamicText(textToTranslate, target, source);
      setTranslatedText(res);
    } catch (err) {
      showToast('Translation error, using fallback dictionary', 'info');
      setTranslatedText(textToTranslate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    const newSource = targetLang;
    const newTarget = sourceLang;
    setSourceLang(newSource);
    setTargetLang(newTarget);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    showToast('Translated text copied to clipboard!', 'success', 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice input is not supported in this browser. Please use Chrome/Edge.', 'warning');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const currentSrcObj = availableLanguages.find(l => l.code === sourceLang);
      recognition.lang = currentSrcObj ? currentSrcObj.speechLang : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening... Speak now into your microphone', 'info', 2500);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        handleTranslate(transcript, targetLang, sourceLang);
        setIsListening(false);
      };

      recognition.onerror = (err) => {
        console.error('Speech recognition error', err);
        setIsListening(false);
        showToast('Speech recognition stopped or not heard', 'info');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
      showToast('Could not start speech recognition', 'warning');
    }
  };

  if (!isTranslatorOpen) return null;

  const quickPhrases = [
    'Yellow rust disease in wheat crop',
    'Application for canal water allocation',
    'Organic certification inspection requirements',
    'Recommended urea dosage for paddy fields',
    'Mandi rate and MSP support for cotton'
  ];

  const glossaryEntries = Object.entries(AGRI_GLOSSARY);

  return (
    <div className="modal-backdrop" onClick={() => setIsTranslatorOpen(false)}>
      <div
        className="modal-container translator-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', width: '92%' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary-soft, #e8f5e9)',
              color: 'var(--color-primary, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Languages size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>
                AgriTranslate — कृषि अनुवादक
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted, #666)' }}>
                Multi-language speech & text translator for Indian agriculture
              </p>
            </div>
          </div>
          <button
            type="button"
            className="topbar-icon-btn"
            onClick={() => setIsTranslatorOpen(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Language Select Bar */}
        <div className="translator-lang-bar">
          <div className="lang-select-wrapper">
            <label className="lang-select-label">From</label>
            <select
              value={sourceLang}
              onChange={(e) => {
                setSourceLang(e.target.value);
                handleTranslate(inputText, targetLang, e.target.value);
              }}
              className="translator-select"
            >
              {availableLanguages.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="swap-lang-btn"
            onClick={handleSwapLanguages}
            title="Swap source and target language"
          >
            <ArrowRightLeft size={16} />
          </button>

          <div className="lang-select-wrapper">
            <label className="lang-select-label">To</label>
            <select
              value={targetLang}
              onChange={(e) => {
                setTargetLang(e.target.value);
                handleTranslate(inputText, e.target.value, sourceLang);
              }}
              className="translator-select"
            >
              {availableLanguages.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Boxes Grid */}
        <div className="translator-grid">
          {/* Source Box */}
          <div className="translator-box">
            <div className="translator-box-header">
              <span className="box-title">Source Text</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`translator-tool-btn ${isListening ? 'is-active-mic' : ''}`}
                  title={isListening ? 'Stop Listening' : 'Speak to input'}
                >
                  {isListening ? <MicOff size={15} color="#dc2626" /> : <Mic size={15} />}
                  <span>{isListening ? 'Listening...' : 'Voice'}</span>
                </button>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputText('');
                      setTranslatedText('');
                    }}
                    className="translator-tool-btn"
                    title="Clear text"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <textarea
              className="translator-textarea"
              placeholder="Type or speak agricultural terms, pesticide notes, weather questions, or government circulars..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleTranslate(e.target.value, targetLang, sourceLang);
              }}
              rows={4}
            />
            {/* Quick Prompts */}
            <div className="quick-prompts-container">
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>
                Try samples:
              </span>
              <div className="quick-prompts-scroll">
                {quickPhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quick-phrase-pill"
                    onClick={() => {
                      setInputText(phrase);
                      handleTranslate(phrase, targetLang, sourceLang);
                    }}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Box */}
          <div className="translator-box output-box">
            <div className="translator-box-header">
              <span className="box-title">
                Translation ({availableLanguages.find(l => l.code === targetLang)?.native})
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {translatedText && (
                  <>
                    <button
                      type="button"
                      onClick={() => speakText(translatedText, targetLang)}
                      className={`translator-tool-btn ${isSpeaking ? 'is-speaking-active' : ''}`}
                      title="Listen aloud in native voice"
                    >
                      <Volume2 size={15} />
                      <span>{isSpeaking ? 'Playing...' : 'Audio'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="translator-tool-btn"
                      title="Copy translated text"
                    >
                      {copied ? <Check size={15} color="#16a34a" /> : <Copy size={15} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="translator-output-content">
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Translating in real-time...</span>
                </div>
              ) : translatedText ? (
                <p className="translated-paragraph">{translatedText}</p>
              ) : (
                <p className="translated-placeholder">
                  Translation will appear here instantly with regional script & voice support.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Agricultural Glossary Section */}
        <div className="translator-glossary-section">
          <div className="glossary-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="var(--color-primary)" />
              <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>
                Agricultural Vocabulary & Quick Terms
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Click any term to translate & listen
            </span>
          </div>

          <div className="glossary-chips-grid">
            {glossaryEntries.slice(0, 12).map(([key, translations]) => {
              const localizedTerm = translations[targetLang] || translations['hi'] || translations['en'];
              return (
                <button
                  key={key}
                  type="button"
                  className="glossary-chip"
                  onClick={() => {
                    setInputText(translations.en);
                    handleTranslate(translations.en, targetLang, 'en');
                    speakText(localizedTerm, targetLang);
                  }}
                  title={`Click to translate "${translations.en}"`}
                >
                  <span className="chip-en">{translations.en}</span>
                  <span className="chip-arrow">→</span>
                  <span className="chip-local">{localizedTerm}</span>
                  <Volume2 size={12} className="chip-audio-icon" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsTranslatorOpen(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (inputText) handleTranslate(inputText, targetLang, sourceLang);
            }}
          >
            <Sparkles size={16} />
            <span>Translate Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
