import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start fade out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Hide completely after fade out animation completes (3s + 1s for animation)
    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 4000);

    // Clean up timers
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <h1>insstanto<span>+</span></h1>
        </div>
        <div className="loading-spinner"></div>
        <div className="developer-credit">
          <p>Developed by <span>Sourabh Sharma</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
