import { useState, useRef, useEffect } from 'react';

export default function AutocompleteInput({
  value,
  onChange,
  onAdd,
  suggestions = [],
  placeholder = "Type to search or add new...",
  className = ""
}) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue.trim()) {
      const lowerInput = inputValue.toLowerCase();
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(lowerInput) &&
        s.toLowerCase() !== lowerInput
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions(suggestions.slice(0, 10)); // Show first 10 when empty
      setShowSuggestions(suggestions.length > 0);
    }
  }, [inputValue, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSelectSuggestion = (suggestion) => {
    onAdd(suggestion);
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
        setInputValue('');
        setShowSuggestions(false);
      }
    }
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            className={`w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
            placeholder={placeholder}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-white dark:bg-darkTheme-surface border border-light-border dark:border-darkTheme-border rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-accent/10 dark:hover:bg-accent/20 text-dark dark:text-cream transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddClick}
          className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-colors whitespace-nowrap"
        >
          Add
        </button>
      </div>
    </div>
  );
}

