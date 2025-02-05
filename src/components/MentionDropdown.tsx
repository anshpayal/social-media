import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../lib/firebase';

interface MentionDropdownProps {
  searchTerm: string;
  position: { top: number; left: number };
  onSelect: (user: any) => void;
}

const MentionDropdown: React.FC<MentionDropdownProps> = ({
  searchTerm,
  position,
  onSelect,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const fetchedUsers = await fetchUsers(searchTerm);
      setUsers(fetchedUsers);
      setLoading(false);
    };

    if (searchTerm) {
      loadUsers();
    }
  }, [searchTerm]);

  if (!searchTerm) return null;

  return (
    <div
      className="absolute z-50 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto"
      style={{ top: position.top, left: position.left }}
    >
      {loading ? (
        <div className="p-2">Loading...</div>
      ) : users.length > 0 ? (
        <ul className="py-1">
          {users.map((user) => (
            <li
              key={user.uid}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(user)}
            >
              <div className="flex items-center">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                )}
                <span>{user.displayName}</span>
                <span className="text-gray-400 text-sm ml-2">{user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-2">No users found</div>
      )}
    </div>
  );
};

export default MentionDropdown; 