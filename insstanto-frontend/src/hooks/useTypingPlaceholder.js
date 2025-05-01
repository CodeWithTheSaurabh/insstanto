import { useState, useEffect, useRef } from 'react';

const useTypingPlaceholder = (phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);
  
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      // Set typing speed based on whether we're typing or deleting
      setTypingDelay(isDeleting ? deletingSpeed : typingSpeed);
      
      if (!isDeleting && currentPlaceholder === currentPhrase) {
        // Pause at the end of typing before deleting
        setTypingDelay(pauseTime);
        setIsDeleting(true);
      } else if (isDeleting && currentPlaceholder === '') {
        // Move to the next phrase after deleting
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      } else {
        // Update the current placeholder
        setCurrentPlaceholder(prevPlaceholder => {
          if (isDeleting) {
            return prevPlaceholder.substring(0, prevPlaceholder.length - 1);
          } else {
            return currentPhrase.substring(0, prevPlaceholder.length + 1);
          }
        });
      }
    };
    
    timeoutRef.current = setTimeout(handleTyping, typingDelay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPlaceholder, currentPhraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseTime, typingDelay]);
  
  return currentPlaceholder;
};

export default useTypingPlaceholder;
