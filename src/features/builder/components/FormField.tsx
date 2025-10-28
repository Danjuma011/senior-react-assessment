import React from 'react';
import { ToggleSwitch } from '../../../shared/components/ui';
import '../../../styles/features/FormField.scss';

interface FormFieldProps {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'photo';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  fullWidth?: boolean;
  onRequiredChange?: (required: boolean) => void;
  onFullWidthChange?: (fullWidth: boolean) => void;
  onDuplicate?: () => void;
  onLink?: () => void;
  onMoreOptions?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  options = [],
  required = false,
  fullWidth = false,
  onRequiredChange,
  onFullWidthChange,
  onDuplicate,
  onLink,
  onMoreOptions,
}) => {
  const handleRequiredChange = (checked: boolean) => {
    if (onRequiredChange) {
      onRequiredChange(checked);
    }
  };

  const handleFullWidthChange = (checked: boolean) => {
    if (onFullWidthChange) {
      onFullWidthChange(checked);
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

  const renderFieldContent = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={placeholder || label}
            className="field-input"
          />
        );
      case 'radio':
        return (
          <div className="radio-group">
            {options.map((option, index) => (
              <label key={index} className="radio-option">
                <input type="radio" name={id} value={option} />
                <span className="radio-label">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="checkbox-group">
            {options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input type="checkbox" />
                <span className="checkbox-label">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'photo':
        return (
          <div className="photo-upload">
            <div className="upload-icon">
              <img 
                src="/images/upload.svg" 
                alt="Upload" 
                width="42" 
                height="42"
              />
            </div>
            <p className="upload-text">Drag your image to start uploading  <br /> JPEG, PNG and GIF formats</p>
            <button className="browse-button">Browse files</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <div className="field-header">
        <span className="field-label">{label}</span>
        <div className="field-controls">
          <div className="control-item">
            <span className="control-label">Full</span>
            <ToggleSwitch
              checked={fullWidth}
              onChange={handleFullWidthChange}
            />
          </div>
          <div className="control-item">
            <span className="control-label">Required</span>
            <ToggleSwitch
              checked={required}
              onChange={handleRequiredChange}
            />
          </div>
          <button className="icon-button" onClick={handleDuplicate} title="Duplicate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          <button className="icon-button" onClick={handleLink} title="Link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
          <button className="icon-button" onClick={handleMoreOptions} title="More options">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="field-content">
        {renderFieldContent()}
      </div>
    </div>
  );
};

export default FormField;
