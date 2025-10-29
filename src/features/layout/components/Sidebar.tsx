import React from 'react';
import '../../../styles/features/Sidebar.scss';

interface SidebarProps {
  activeSection?: number;
  onSectionChange?: (section: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection = 1, onSectionChange }) => {
  const sections = [1, 2, 3, 4, 5, 6, 7];

  const handleSectionClick = (section: number) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className="sidebar">
      {/* Top Navigation */}
      <div className="sidebar-top">
        <div className="sidebar-nav-container">
          <button className="sidebar-nav-button">
            <img src="/icons/al.svg" alt="Back" width="32" height="32" />
          </button>
          <button className="sidebar-nav-button">
            <img src="/icons/round.svg" alt="Forward" width="64" height="64" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-main">
        {/* Home Icon */}
        <div className="sidebar-home">
          <button className="home-button active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </button>
        </div>

        {/* Up Arrow */}
        <button className="sidebar-arrow-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18,15 12,9 6,15"/>
          </svg>
        </button>

        {/* Numbered Sections */}
        <div className="sidebar-sections">
          {sections.map((section) => (
            <button
              key={section}
              className={`section-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleSectionClick(section)}
            >
              {section.toString().padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* Down Arrow */}
        <button className="sidebar-arrow-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="sidebar-bottom">
        <button className="control-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <div className="control-display">100</div>
        <button className="control-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
