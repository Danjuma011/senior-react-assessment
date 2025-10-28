import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Field {
  id: string;
  name: string;
  selected: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  fields: Field[];
  expanded: boolean;
}

interface FormState {
  activeTab: 'standard' | 'custom';
  searchTerm: string;
  sections: FormSection[];
}

const initialState: FormState = {
  activeTab: 'standard',
  searchTerm: '',
  sections: [
    {
      id: 'prf-account',
      title: 'PRF - Account Profile',
      expanded: true,
      fields: [
        { id: 'photo', name: 'Photo', selected: false },
        { id: 'state', name: 'State', selected: false },
        { id: 'gender', name: 'Gender', selected: false },
        { id: 'email', name: 'Email Address', selected: false },
        { id: 'lastname', name: 'Last Name', selected: false },
        { id: 'dob', name: 'Date of Birth', selected: true },
        { id: 'residency', name: 'Do you have residency?', selected: false },
        { id: 'salutation', name: 'Salutation', selected: false },
        { id: 'mobile', name: 'Mobile Number', selected: false },
        { id: 'firstname', name: 'First Name', selected: false },
      ]
    },
    {
      id: 'bio-biodata',
      title: 'BIO - Biodata',
      expanded: false,
      fields: [
        { id: 'bio1', name: 'Bio Field 1', selected: false },
        { id: 'bio2', name: 'Bio Field 2', selected: false },
      ]
    },
    {
      id: 'con-contact',
      title: 'CON - Contact Info',
      expanded: false,
      fields: [
        { id: 'con1', name: 'Contact Field 1', selected: false },
        { id: 'con2', name: 'Contact Field 2', selected: false },
      ]
    },
    {
      id: 'pas-passports',
      title: 'PAS - Passports',
      expanded: false,
      fields: [
        { id: 'pas1', name: 'Passport Field 1', selected: false },
        { id: 'pas2', name: 'Passport Field 2', selected: false },
      ]
    },
    {
      id: 'idc-cards',
      title: 'IDC - ID Cards',
      expanded: false,
      fields: [
        { id: 'idc1', name: 'ID Card Field 1', selected: false },
        { id: 'idc2', name: 'ID Card Field 2', selected: false },
      ]
    }
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'standard' | 'custom'>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleSection: (state, action: PayloadAction<string>) => {
      const section = state.sections.find(s => s.id === action.payload);
      if (section) {
        section.expanded = !section.expanded;
      }
    },
    toggleField: (state, action: PayloadAction<{ sectionId: string; fieldId: string }>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId);
      if (section) {
        const field = section.fields.find(f => f.id === action.payload.fieldId);
        if (field) {
          field.selected = !field.selected;
        }
      }
    },
    resetForm: (state) => {
      state.activeTab = 'standard';
      state.searchTerm = '';
      state.sections = initialState.sections;
    },
  },
});

export const {
  setActiveTab,
  setSearchTerm,
  toggleSection,
  toggleField,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
