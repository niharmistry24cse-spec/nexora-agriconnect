import { LANGUAGES, TRANSLATIONS, AGRI_GLOSSARY } from '../data/translations';

/**
 * Fast offline dictionary-based translation helper
 */
export function getStaticTranslation(key, langCode) {
  if (!key) return '';
  if (langCode === 'en' || !langCode) return key;

  // Direct match in translations
  if (TRANSLATIONS[key] && TRANSLATIONS[key][langCode]) {
    return TRANSLATIONS[key][langCode];
  }

  // Lowercase match in agricultural glossary
  const lowerKey = key.trim().toLowerCase();
  if (AGRI_GLOSSARY[lowerKey] && AGRI_GLOSSARY[lowerKey][langCode]) {
    return AGRI_GLOSSARY[lowerKey][langCode];
  }

  return null;
}

/**
 * Live dynamic translation function with API integration & intelligent offline fallback
 */
export async function translateText(text, targetLang = 'hi', sourceLang = 'en') {
  if (!text || !text.trim()) return '';
  if (targetLang === sourceLang) return text;

  // Check static lookup first
  const staticResult = getStaticTranslation(text.trim(), targetLang);
  if (staticResult) return staticResult;

  // Attempt live free Translation API (MyMemory)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        const translated = data.responseData.translatedText;
        // Verify we didn't just get an error string
        if (!translated.toUpperCase().includes('INVALID') && !translated.toUpperCase().includes('MYMEMORY WARNING')) {
          return translated;
        }
      }
    }
  } catch (err) {
    // Fallback gracefully on network error/timeout
    console.debug('Online translator fallback:', err?.message);
  }

  // Smart local word/phrase replacement fallback
  let translatedText = text;
  Object.keys(AGRI_GLOSSARY).forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (regex.test(translatedText)) {
      const replacement = AGRI_GLOSSARY[term][targetLang] || AGRI_GLOSSARY[term]['hi'];
      if (replacement) {
        translatedText = translatedText.replace(regex, replacement);
      }
    }
  });

  return translatedText;
}

/**
 * Text-to-Speech in regional language voice
 */
export function playTextSpeech(text, langCode = 'hi', onEnd = () => {}) {
  if (!('speechSynthesis' in window) || !text) return false;

  window.speechSynthesis.cancel();
  const langObj = LANGUAGES.find(l => l.code === langCode || l.name.toLowerCase() === langCode.toLowerCase());
  const speechLang = langObj ? langObj.speechLang : 'hi-IN';

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechLang;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  // Try to find a matching voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchVoice = voices.find(v => v.lang.startsWith(speechLang.slice(0, 2)) || v.lang === speechLang);
  if (matchVoice) {
    utterance.voice = matchVoice;
  }

  utterance.onend = onEnd;
  utterance.onerror = onEnd;

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Stop active speech synthesis
 */
export function stopTextSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
