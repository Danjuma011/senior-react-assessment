// Builder feature types
import { FormField, Group, Section } from '../../../shared/types';

export interface BuilderState {
  isDropped: boolean;
  isSidebarOpen: boolean;
  currentSection: Section;
  activeId: string | null;
}

export interface FormState {
  activeTab: string;
  searchTerm: string;
  sections: FormSection[];
}

export interface FormSection {
  id: string;
  title: string;
  isExpanded: boolean;
  fields: Field[];
}

export interface Field {
  id: string;
  name: string;
  type: 'text' | 'radio' | 'checkbox' | 'photo';
  isSelected: boolean;
}

export interface DragEndEvent {
  active: {
    id: string;
    data: {
      current?: {
        type: string;
        fieldId: string;
        fieldName: string;
      };
    };
  };
  over: {
    id: string;
  } | null;
}

export interface GroupProps {
  id: string;
  title: string;
  required: boolean;
  isMinimized: boolean;
  fields: FormField[];
  onTitleChange: (title: string) => void;
  onRequiredChange: (required: boolean) => void;
  onDuplicate: () => void;
  onLink: () => void;
  onMoreOptions: () => void;
  onMinimize: () => void;
  onFieldAdd: (field: FormField) => void;
  onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
  onFieldRemove: (fieldId: string) => void;
}
