import React from 'react';
import '../../../styles/features/AddElementsSidebar.scss';

interface AddElementsSidebarProps {
  onSidebarToggle?: (isOpen: boolean) => void;
}

const AddElementsSidebar: React.FC<AddElementsSidebarProps> = ({ onSidebarToggle }) => {
  const handleAddElement = () => {
    onSidebarToggle?.(true);
  };

  return (
    <div className="add-elements-sidebar">
      <button className="add-elements-button" onClick={handleAddElement}>
        <div className="icon-container">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        Add Elements
      </button>
    </div>
  );
};

export default AddElementsSidebar;
