import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch } from '../../../shared/store/hooks';
import { useSelector } from 'react-redux';
import { setActiveTab, setSearchTerm, toggleSection, toggleField, FormSection } from '../../../shared/store/slices/formSlice';
// import { RootState } from '../../../shared/store';
import '../../../styles/features/ElementsSidebar.scss';

interface Field {
  id: string;
  name: string;
  selected: boolean;
}

// interface Section {
//   id: string;
//   title: string;
//   fields: Field[];
//   expanded: boolean;
// }

interface DraggableFieldItemProps {
  field: Field;
  sectionId: string;
  onToggle: (sectionId: string, fieldId: string) => void;
}

const DraggableFieldItem: React.FC<DraggableFieldItemProps> = ({ field, sectionId, onToggle }) => {
  console.log('Rendering draggable field:', field.name);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `field-${field.id}`,
    data: {
      type: 'field',
      fieldId: field.id,
      fieldName: field.name,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // const getFieldType = (fieldName: string) => {
  //   switch (fieldName) {
  //     case 'Last Name':
  //     case 'Email Address':
  //     case 'First Name':
  //     case 'Mobile Number':
  //     case 'State':
  //     case 'Gender':
  //     case 'Date of Birth':
  //       return 'text';
  //     case 'Do you have residency?':
  //       return 'radio';
  //     case 'Salutation':
  //       return 'checkbox';
  //     case 'Photo':
  //       return 'photo';
  //     default:
  //       return 'text';
  //   }
  // };

  // const getFieldOptions = (fieldName: string) => {
  //   switch (fieldName) {
  //     case 'Do you have residency?':
  //       return ['Yes', 'No'];
  //     case 'Salutation':
  //       return ['Mr', 'Mrs', 'Alhaji', 'Dr'];
  //     case 'State':
  //       return ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun'];
  //     case 'Gender':
  //       return ['Male', 'Female', 'Other'];
  //     default:
  //       return [];
  //   }
  // };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`field-item ${field.selected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => onToggle(sectionId, field.id)}
      {...listeners}
      {...attributes}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9"/>
      </svg>
      <span className="field-name">{field.name}</span>
    </div>
  );
};

interface ElementsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ElementsSidebar: React.FC<ElementsSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector((state: any) => state.form.activeTab);
  const searchTerm = useSelector((state: any) => state.form.searchTerm);
  const sections = useSelector((state: any) => state.form.sections);

  const handleToggleSection = (sectionId: string) => {
    dispatch(toggleSection(sectionId));
  };

  const handleToggleField = (sectionId: string, fieldId: string) => {
    dispatch(toggleField({ sectionId, fieldId }));
  };

  const filteredSections = sections.filter((section: FormSection) =>
    section.fields.some((field: Field) =>
      field.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!isOpen) return null;

  return (
    <div className="elements-sidebar-overlay" onClick={onClose}>
      <div className="elements-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sidebar-header">
          <button className="close-button" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <h2 className="sidebar-title">Elements</h2>
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'standard' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('standard'))}
            >
              Standard Fields
            </button>
            <button 
              className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('custom'))}
            >
              Custom Fields
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="sections-container">
          {filteredSections.map((section: FormSection) => (
            <div key={section.id} className="section">
              <div 
                className="section-header"
                onClick={() => handleToggleSection(section.id)}
              >
                <span className="section-title">{section.title}</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={`arrow ${section.expanded ? 'expanded' : ''}`}
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
              
              {section.expanded && (
                <div className="fields-grid">
                  {section.fields.map((field: Field) => (
                    <DraggableFieldItem
                      key={field.id}
                      field={field}
                      sectionId={section.id}
                      onToggle={handleToggleField}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsSidebar;
