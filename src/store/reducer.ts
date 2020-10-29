import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  appId: string;
  cannel: string;
  token: string;
}

const initialState: IState = {
  appId: '',
  cannel: '',
  token: '',
};

const module = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setAppID(state, action: PayloadAction<string>) {
      state.appId = action.payload;
    },
    setChannel(state, action: PayloadAction<string>) {
      state.cannel = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setAppID, setChannel, setToken } = module.actions;

export default module.reducer;
