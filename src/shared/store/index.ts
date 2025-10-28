import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './slices/builderSlice';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
