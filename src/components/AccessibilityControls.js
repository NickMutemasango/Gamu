import React, { useState, useEffect } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/accessibility.css';

const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Apply accessibility settings to the whole document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.className = highContrast ? 'high-contrast' : '';
  }, [fontSize, highContrast]);

  const handleFontIncrease = () => {
    if (fontSize < 24) setFontSize(fontSize + 2);
  };

  const handleFontDecrease = () => {
    if (fontSize > 12) setFontSize(fontSize - 2);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (audioEnabled) textToSpeech(`High contrast mode ${highContrast ? 'off' : 'on'}`);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) textToSpeech('Audio descriptions enabled');
  };

  return (
    <div className="accessibility-controls" aria-label="Accessibility controls">
      <button onClick={handleFontIncrease} aria-label="Increase font size">
        A+
      </button>
      <button onClick={handleFontDecrease} aria-label="Decrease font size">
        A-
      </button>
      <button 
        onClick={toggleHighContrast} 
        aria-label={`Toggle high contrast mode, currently ${highContrast ? 'on' : 'off'}`}
      >
        High Contrast
      </button>
      <button 
        onClick={toggleAudio} 
        aria-label={`Toggle audio descriptions, currently ${audioEnabled ? 'on' : 'off'}`}
      >
        Audio {audioEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default AccessibilityControls;