import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ToggleSwitch } from '../../../shared/components/ui';
import '../../../styles/features/DraggableSection.scss';

interface DraggableSectionProps {
  id: string;
  title: string;
  content: string;
  required: boolean;
  isDragging?: boolean;
  onClick?: () => void;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  id,
  title,
  content,
  required,
  isDragging = false,
  onClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRequiredToggle = (checked: boolean) => {
    // Handle required toggle logic here
    console.log('Required toggle changed:', checked);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle duplicate logic here
  };

  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle more options logic here
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger if not clicking on interactive elements
    if (onClick && !(e.target as HTMLElement).closest('.icon-button, .toggle-switch')) {
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-section ${isSortableDragging || isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="section-header">
        <div className="header-left">
          <span className="section-title">{title}</span>
        </div>
        <div className="header-right">
          <span className="required-label">Required</span>
          <ToggleSwitch
            checked={required}
            onChange={handleRequiredToggle}
          />
          <button
            className="icon-button duplicate-button"
            onClick={handleDuplicate}
            title="Duplicate"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          <button
            className="icon-button more-button"
            onClick={handleMoreOptions}
            title="More options"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="section-content">
        <div className="content-placeholder">{content}</div>
        <div className="drag-handle">
          <div className="drag-dots">
            <div className="dot-row">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="dot-row">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableSection;
