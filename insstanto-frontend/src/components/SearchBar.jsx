import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useTypingPlaceholder from '../hooks/useTypingPlaceholder';

const SearchBar = ({ className, iconSize = 16, iconColor = "#666" }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const searchPhrases = [
    "Search for salon services...",
    "Looking for plumbers?",
    "Need AC repair?",
    "Find cleaning services...",
    "Search for electricians...",
    "Need home painting?",
    "Find appliance repair..."
  ];
  
  const placeholder = useTypingPlaceholder(searchPhrases, 100, 50, 2000);
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  return (
    <div className={`search-bar ${className || ''} ${isFocused ? 'focused' : ''}`}>
      <FaSearch color={iconColor} size={iconSize} />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default SearchBar;
