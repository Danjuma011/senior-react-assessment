import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ToggleSwitch } from '../../../shared/components/ui';
import FormField from './FormField';
import '../../../styles/features/Group.scss';

interface FormFieldData {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'photo';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  fullWidth?: boolean;
}

interface GroupProps {
  id: string;
  title: string;
  required: boolean;
  isMinimized?: boolean;
  fields?: FormFieldData[];
  onTitleChange?: (title: string) => void;
  onRequiredChange?: (required: boolean) => void;
  onDuplicate?: () => void;
  onLink?: () => void;
  onMoreOptions?: () => void;
  onMinimize?: () => void;
  onFieldAdd?: (field: FormFieldData) => void;
  onFieldUpdate?: (fieldId: string, updates: Partial<FormFieldData>) => void;
  onFieldRemove?: (fieldId: string) => void;
}

const Group: React.FC<GroupProps> = ({
  id,
  title,
  required,
  isMinimized = false,
  fields = [],
  onTitleChange,
  onRequiredChange,
  onDuplicate,
  onLink,
  onMoreOptions,
  onMinimize,
  onFieldAdd,
  onFieldUpdate,
  onFieldRemove,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTitleChange) {
      onTitleChange(e.target.value);
    }
  };

  const handleRequiredChange = (checked: boolean) => {
    if (onRequiredChange) {
      onRequiredChange(checked);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate();
    }
  };

  const handleLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLink) {
      onLink();
    }
  };

  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMoreOptions) {
      onMoreOptions();
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMinimize) {
      onMinimize();
    }
  };

  return (
    <div className="group">
      {/* Group Header */}
      <div className="group-header">
        <div className="group-header-left">
          <div className="drag-handle">
            <div className="drag-dots">
              <div className="dot-row">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="dot-row">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="dot-row">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="group-title-input"
            placeholder="Group Title"
          />
        </div>
        <div className="group-header-right">
          <span className="required-label">Required</span>
          <ToggleSwitch
            checked={required}
            onChange={handleRequiredChange}
          />
          <button
            className="minimize-button"
            onClick={handleMinimize}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 9l4-4 4 4"/>
              <path d="M8 15l4 4 4-4"/>
            </svg>
          </button>
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
            className="icon-button link-button"
            onClick={handleLink}
            title="Link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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

      {/* Group Content - Drop Zone for Fields */}
      <div
        ref={setNodeRef}
        className={`group-content ${isOver ? 'drag-over' : ''} ${isMinimized ? 'minimized' : ''}`}
      >
        <div className="group-drop-zone">
          <div className="dot-pattern"></div>
          {fields.length > 0 && (
            <div className="fields-container">
              {fields.map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={field.options}
                  required={field.required}
                  fullWidth={field.fullWidth}
                  onRequiredChange={(required) => onFieldUpdate?.(field.id, { required })}
                  onFullWidthChange={(fullWidth) => onFieldUpdate?.(field.id, { fullWidth })}
                  onDuplicate={() => console.log('Duplicate field:', field.id)}
                  onLink={() => console.log('Link field:', field.id)}
                  onMoreOptions={() => console.log('More options for field:', field.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Group;
