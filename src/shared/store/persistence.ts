import { RootState } from './index';

// localStorage keys
const BUILDER_STATE_KEY = 'builder-state';
const FORM_STATE_KEY = 'form-state';

// sessionStorage keys
const SESSION_STATE_KEY = 'session-state';

export const saveToLocalStorage = (state: RootState) => {
  try {
    // Save builder state to localStorage (persistent)
    localStorage.setItem(BUILDER_STATE_KEY, JSON.stringify(state.builder));
    
    // Save form state to localStorage (persistent)
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(state.form));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): Partial<RootState> => {
  try {
    const builderState = localStorage.getItem(BUILDER_STATE_KEY);
    const formState = localStorage.getItem(FORM_STATE_KEY);
    
    return {
      builder: builderState ? JSON.parse(builderState) : undefined,
      form: formState ? JSON.parse(formState) : undefined,
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {};
  }
};

export const saveToSessionStorage = (state: RootState) => {
  try {
    // Save current session state (temporary)
    const sessionState = {
      isDropped: state.builder.isDropped,
      isSidebarOpen: state.builder.isSidebarOpen,
      activeId: state.builder.activeId,
    };
    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify(sessionState));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
};

export const loadFromSessionStorage = () => {
  try {
    const sessionState = sessionStorage.getItem(SESSION_STATE_KEY);
    return sessionState ? JSON.parse(sessionState) : null;
  } catch (error) {
    console.error('Error loading from sessionStorage:', error);
    return null;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(BUILDER_STATE_KEY);
    localStorage.removeItem(FORM_STATE_KEY);
    sessionStorage.removeItem(SESSION_STATE_KEY);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
