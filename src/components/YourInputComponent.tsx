import React, { useState, useRef } from 'react';
import MentionDropdown from './MentionDropdown';


const YourInputComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Check for @ mentions
    const lastAtIndex = newValue.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const textAfterAt = newValue.slice(lastAtIndex + 1);
      const hasSpaceAfterMention = textAfterAt.includes(' ');
      
      if (!hasSpaceAfterMention) {
        setMentionSearch(textAfterAt);
        setShowMentions(true);
        updateDropdownPosition(lastAtIndex);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const updateDropdownPosition = (atIndex: number) => {
    if (inputRef.current) {
      // const { top, left } = getCaretCoordinates(inputRef.current, atIndex);
      setDropdownPosition({
        top: 20, // Adjust these values based on your layout
        left: 0,
      });
    }
  };

  const handleSelectUser = (user: any) => {
    const lastAtIndex = value.lastIndexOf('@');
    const newValue = 
      value.slice(0, lastAtIndex) + 
      `@${user.displayName} ` + 
      value.slice(lastAtIndex + mentionSearch.length + 1);
    
    setValue(newValue);
    setShowMentions(false);
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleInput}
        className="w-full p-2 border rounded"
        placeholder="Type @ to mention someone..."
      />
      
      {showMentions && (
        <MentionDropdown
          searchTerm={mentionSearch}
          position={dropdownPosition}
          onSelect={handleSelectUser}
        />
      )}
    </div>
  );
};

export default YourInputComponent; 

