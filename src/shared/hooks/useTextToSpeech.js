import { useState, useEffect, useRef } from 'react';

const stripMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[_*]{1,3}([^_*]+)[_*]{1,3}/g, '$1') // bold/italics
    .replace(/^#{1,6}\s*(.*)$/gm, '$1') // headers
    .replace(/[#*>_`~-]/g, '') // remaining markdown chars
    // Optionally strip emojis as some TTS engines struggle
    .replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
};

export const useTextToSpeech = (language = 'en') => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const chunkQueue = useRef([]);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakNextChunk = (langOverride) => {
    if (!isSpeakingRef.current || chunkQueue.current.length === 0) {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      return;
    }

    const chunk = chunkQueue.current.shift();
    const utterance = new SpeechSynthesisUtterance(chunk);

    // Map languages
    const languageMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN'
    };
    
    // langOverride is used to lock in the passed language from speak() start
    const currentLang = langOverride || language;
    const mappedLang = languageMap[currentLang] || languageMap['en'];
    utterance.lang = mappedLang;
    
    // Configure voice
    const voices = window.speechSynthesis.getVoices();
    const langCode = mappedLang.split('-')[0];
    
    let preferredVoice = voices.find(voice => voice.lang === mappedLang);
    if (!preferredVoice) {
       preferredVoice = voices.find(voice => voice.lang.startsWith(langCode));
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      // Small timeout prevents Chrome TTS from skipping chunks
      setTimeout(() => {
        speakNextChunk(langOverride);
      }, 50);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error on chunk:', e);
      if (e.error !== 'interrupted') {
          // If interrupted naturally (e.g. by our own cancel or chunk boundary flush), just stop safely.
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          chunkQueue.current = [];
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    stop(); // Cancels any current speech

    const cleanText = stripMarkdown(text);
    
    // Basic chunking: split by newlines, which mostly separates paragraphs beautifully
    const newChunks = cleanText
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 2); // Ignore totally empty traces
    
    chunkQueue.current = newChunks;
    
    if (chunkQueue.current.length > 0) {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      speakNextChunk(language);
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      chunkQueue.current = [];
    }
  };

  return { speak, stop, isSpeaking, isSupported };
};

export default useTextToSpeech;
