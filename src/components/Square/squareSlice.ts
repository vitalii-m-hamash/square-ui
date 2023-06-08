import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TMode, TNotification } from './types';
import { getModes } from './services/squareServices';
import { RootState } from '../../store/store';

interface ModesState {
  modes: TMode[];
  notifications: TNotification[];
  loading: boolean;
  mode: number;
}

const initialState = {
  modes: [],
  notifications: [],
  loading: true,
  mode: 0,
} as ModesState;

const squareSlice = createSlice({
  name: 'square',
  initialState,
  reducers: {
    addNewNotification: (state, action: PayloadAction<TNotification>) => {
      state.notifications.push(action.payload);
      return state;
    },
    resetNotifications: (state) => {
      state.notifications = [];
      return state;
    },
    changeMode: (state, action: PayloadAction<number>) => {
      state.mode = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getModes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getModes.fulfilled, (state, { payload }) => {
      state.modes = payload;
      state.loading = false;
    });
    builder.addCase(getModes.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export const selectModes = (state: RootState) => state.square;

export const { addNewNotification, resetNotifications, changeMode } =
  squareSlice.actions;

export default squareSlice.reducer;
