import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
type ModeType = 'live' | 'rtc';
type CodecType = 'h264' | 'vp8';
interface IRootState {
  appId: string;
  channel: string;
  token: string;
  uid: number;
  camara: string;
  microphone: string;
  mode: ModeType;
  codec: CodecType;
  streamPlayers: number[];
}

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;

const initialState: IRootState = {
  appId: '',
  channel: '',
  token: '',
  uid: undefined,
  camara: '',
  microphone: 'default',
  mode: 'live',
  codec: 'h264',
  streamPlayers: [],
};

const module = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setAppID(state, action: PayloadAction<string>) {
      state.appId = action.payload;
    },
    setChannel(state, action: PayloadAction<string>) {
      state.channel = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUid(state, action: PayloadAction<number>) {
      state.uid = action.payload;
    },
    setCamara(state, action: PayloadAction<string>) {
      state.camara = action.payload;
    },
    setMicrophone(state, action: PayloadAction<string>) {
      state.microphone = action.payload;
    },
    setMode(state, action: PayloadAction<ModeType>) {
      state.mode = action.payload;
    },
    setCodec(state, action: PayloadAction<CodecType>) {
      state.codec = action.payload;
    },
    addStreamPlayers(state, action: PayloadAction<number>) {
      state.streamPlayers.push(action.payload);
    },
    removeStreamPlayers(state, action: PayloadAction<number>) {
      state.streamPlayers = state.streamPlayers.filter(
        (id) => +id !== +action.payload,
      );
    },
    initializeState(state) {
      state.appId = '';
      state.channel = '';
      state.token = '';
      state.uid = undefined;
      state.camara = '';
      state.microphone = 'default';
      state.mode = 'live';
      state.codec = 'h264';
      state.streamPlayers = [];
    },
  },
});

export const {
  setAppID,
  setChannel,
  setToken,
  setUid,
  setCamara,
  setMicrophone,
  setMode,
  setCodec,
  addStreamPlayers,
  removeStreamPlayers,
  initializeState,
} = module.actions;

export default module.reducer;
