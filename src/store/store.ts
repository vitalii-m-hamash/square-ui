import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import squareReducer from '../components/Square/squareSlice';

export const store = configureStore({
  reducer: {
    square: squareReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
