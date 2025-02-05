import React, { useState, useRef } from 'react';
import MentionDropdown from './MentionDropdown';
import { fetchUsers } from '../lib/firebase';

interface YourInputComponentProps {
  content: string;
  setContent: (content: string) => void;
  className?: string;
  placeholder?: string;
}

const YourInputComponent: React.FC<YourInputComponentProps> = ({
  content,
  setContent,
  className = "w-full p-2 border rounded",
  placeholder = "What's on your mind? Type @ to mention someone..."
}) => {
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);

    // Check for @ mentions
    const lastAtIndex = newValue.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const textAfterAt = newValue.slice(lastAtIndex + 1);
      const hasSpaceAfterMention = textAfterAt.includes(' ');
      
      if (!hasSpaceAfterMention) {
        setMentionSearch(textAfterAt);
        setShowMentions(true);
        updateDropdownPosition();
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.height + 5,
        left: 0,
      });
    }
  };

  const handleSelectUser = (user: any) => {
    const lastAtIndex = content.lastIndexOf('@');
    const newValue = 
      content.slice(0, lastAtIndex) + 
      `@${user.username} ` + 
      content.slice(lastAtIndex + mentionSearch.length + 1);
    
    setContent(newValue);
    setShowMentions(false);
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={content}
        onChange={handleInput}
        className={className}
        placeholder={placeholder}
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

