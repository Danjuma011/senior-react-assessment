// Application constants
import { isEmpty } from '../utils';

export const APP_CONFIG = {
  name: 'PaxPass',
  version: '1.0.0',
  description: 'Student Leave Request Form Builder',
} as const;

export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  PHOTO: 'photo',
} as const;

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
} as const;

export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const NAVIGATION_TABS = [
  'Details',
  'Identities',
  'Builder',
  'Settings',
  'Embed',
  'Theme',
  'PDF Filler',
  'API Mappings',
  'Workflow',
  'Digest',
] as const;

export const FIELD_OPTIONS = {
  RESIDENCY: ['Yes', 'No'],
  SALUTATION: ['Mr', 'Mrs', 'Alhaji', 'Dr'],
  STATE: ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun'],
  GENDER: ['Male', 'Female', 'Other'],
} as const;

export const STORAGE_KEYS = {
  BUILDER_STATE: 'paxpass_builder_state',
  FORM_STATE: 'paxpass_form_state',
  SESSION_STATE: 'paxpass_session_state',
} as const;

export const DRAG_AND_DROP = {
  SENSORS: {
    POINTER: 'pointer',
    KEYBOARD: 'keyboard',
  },
  STRATEGIES: {
    VERTICAL_LIST: 'verticalListSortingStrategy',
  },
} as const;

export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  FORMS: '/forms',
  SECTIONS: '/sections',
  GROUPS: '/groups',
  FIELDS: '/fields',
} as const;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  REQUIRED: (value: any) => !isEmpty(value),
} as const;

export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  SAVE: 1000,
  VALIDATION: 500,
} as const;
