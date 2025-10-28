import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, Group, Section } from '../../types';

export interface FormFieldData extends FormField {
  // Additional properties specific to the store if needed
}

interface BuilderState {
  isDropped: boolean;
  isSidebarOpen: boolean;
  currentSection: Section;
  activeId: string | null;
}

const initialState: BuilderState = {
  isDropped: false,
  isSidebarOpen: false,
  currentSection: {
    id: 'section-1',
    type: 'section',
    title: 'Section Title Here',
    required: false,
    groups: [
      {
        id: 'group-1',
        type: 'group',
        title: 'Group Title',
        required: false,
        isMinimized: false,
        fields: [],
      },
    ],
  },
  activeId: null,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setDropped: (state, action: PayloadAction<boolean>) => {
      state.isDropped = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setActiveId: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
    setCurrentSection: (state, action: PayloadAction<Section>) => {
      state.currentSection = action.payload;
    },
    updateSectionTitle: (state, action: PayloadAction<string>) => {
      state.currentSection.title = action.payload;
    },
    updateGroupTitle: (state, action: PayloadAction<{ groupId: string; title: string }>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.title = action.payload.title;
      }
    },
    updateGroupRequired: (state, action: PayloadAction<{ groupId: string; required: boolean }>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.required = action.payload.required;
      }
    },
    toggleGroupMinimize: (state, action: PayloadAction<string>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload);
      if (group) {
        group.isMinimized = !group.isMinimized;
      }
    },
    addGroup: (state) => {
      const newGroup: Group = {
        id: `group-${Date.now()}`,
        type: 'group',
        title: 'Group Title',
        required: false,
        isMinimized: false,
        fields: [],
      };
      state.currentSection.groups.push(newGroup);
    },
    addFieldToGroup: (state, action: PayloadAction<{ groupId: string; field: FormFieldData }>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        if (!group.fields) {
          group.fields = [];
        }
        group.fields.push(action.payload.field);
      }
    },
    updateField: (state, action: PayloadAction<{ groupId: string; fieldId: string; updates: Partial<FormFieldData> }>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload.groupId);
      if (group && group.fields) {
        const field = group.fields.find(f => f.id === action.payload.fieldId);
        if (field) {
          Object.assign(field, action.payload.updates);
        }
      }
    },
    removeField: (state, action: PayloadAction<{ groupId: string; fieldId: string }>) => {
      const group = state.currentSection.groups.find(g => g.id === action.payload.groupId);
      if (group && group.fields) {
        group.fields = group.fields.filter(f => f.id !== action.payload.fieldId);
      }
    },
    reorderGroups: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;
      const groups = [...state.currentSection.groups];
      const [movedGroup] = groups.splice(oldIndex, 1);
      groups.splice(newIndex, 0, movedGroup);
      state.currentSection.groups = groups;
    },
    resetBuilder: (state) => {
      state.isDropped = false;
      state.isSidebarOpen = false;
      state.currentSection = initialState.currentSection;
      state.activeId = null;
    },
  },
});

export const {
  setDropped,
  setSidebarOpen,
  setActiveId,
  setCurrentSection,
  updateSectionTitle,
  updateGroupTitle,
  updateGroupRequired,
  toggleGroupMinimize,
  addGroup,
  addFieldToGroup,
  updateField,
  removeField,
  reorderGroups,
  resetBuilder,
} = builderSlice.actions;

export default builderSlice.reducer;
