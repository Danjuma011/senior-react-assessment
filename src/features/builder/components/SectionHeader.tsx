import React from 'react';
import '../../../styles/features/SectionHeader.scss';

interface SectionHeaderProps {
  title: string;
  onTitleChange?: (title: string) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onTitleChange,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTitleChange) {
      onTitleChange(e.target.value);
    }
  };

  return (
    <div className="section-header">
      <div className="section-header-content">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="section-title-input"
          placeholder="Section Title Here"
        />
        <div className="section-indicator">
          <div className="indicator-line"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
