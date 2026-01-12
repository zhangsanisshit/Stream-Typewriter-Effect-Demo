import { useState, useEffect, useCallback } from 'react';
import './StreamText.css';

interface StreamTextProps {
  text: string;
  speed?: number;
  cursorColor?: string;
  onComplete?: () => void;
}

export function StreamText({
  text,
  speed = 50,
  cursorColor = '#a855f7',
  onComplete,
}: StreamTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedText('');
    setIsComplete(false);

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  return (
    <span className="stream-text-container">
      <span className="stream-text-content">{displayedText}</span>
      {!isComplete && (
        <span className="stream-text-cursor">
          <span className="cursor-bar" style={{ color: cursorColor }}>|</span>
          <span className="ai-badge">
            <span className="ai-badge-text">AI</span>
            <svg className="ai-badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L17.27 18.9L12 15.47L6.73 18.9L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </span>
        </span>
      )}
    </span>
  );
}
