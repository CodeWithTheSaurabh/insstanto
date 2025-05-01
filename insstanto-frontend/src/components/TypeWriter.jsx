import React, { useState, useEffect, useRef } from 'react';

const TypeWriter = ({ texts, delay = 100, pauseTime = 1500, loop = true, className = '' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(delay);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      
      // Set typing speed based on whether we're typing or deleting
      setTypingSpeed(isDeleting ? delay / 2 : delay);
      
      if (!isDeleting && currentText === fullText) {
        // Pause at the end of typing before deleting
        setTypingSpeed(pauseTime);
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        // Move to the next text after deleting
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => 
          loop ? (prevIndex + 1) % texts.length : Math.min(prevIndex + 1, texts.length - 1)
        );
      } else {
        // Update the current text
        setCurrentText(prevText => {
          if (isDeleting) {
            return prevText.substring(0, prevText.length - 1);
          } else {
            return fullText.substring(0, prevText.length + 1);
          }
        });
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentTextIndex, delay, isDeleting, loop, pauseTime, texts, typingSpeed]);

  return (
    <span className={`typewriter ${className}`}>
      {currentText}
      <span className="cursor"></span>
    </span>
  );
};

export default TypeWriter;
