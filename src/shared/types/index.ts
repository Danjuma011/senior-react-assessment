// Common types used across the application
export interface BaseComponent {
  id: string;
  type: string;
}

export interface FormField extends BaseComponent {
  type: 'text' | 'radio' | 'checkbox' | 'photo';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  fullWidth?: boolean;
}

export interface Group extends BaseComponent {
  type: 'group';
  title: string;
  required: boolean;
  isMinimized?: boolean;
  fields?: FormField[];
}

export interface Section extends BaseComponent {
  type: 'section';
  title: string;
  required: boolean;
  groups: Group[];
}

export interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
}
