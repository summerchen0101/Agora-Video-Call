import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModeType = 'live' | 'rtc';
type CodecType = 'h264' | 'vp8';
interface IState {
  appId: string;
  cannel: string;
  token: string;
  uid: string;
  camara: string;
  microphone: string;
  resolution: string;
  mode: ModeType;
  codec: CodecType;
}

const initialState: IState = {
  appId: '',
  cannel: '',
  token: '',
  uid: '',
  camara: '',
  microphone: '',
  resolution: '',
  mode: 'live',
  codec: 'h264',
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
    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
    setCamara(state, action: PayloadAction<string>) {
      state.camara = action.payload;
    },
    setMicrophone(state, action: PayloadAction<string>) {
      state.microphone = action.payload;
    },
    setResolution(state, action: PayloadAction<string>) {
      state.resolution = action.payload;
    },
    setMode(state, action: PayloadAction<ModeType>) {
      state.mode = action.payload;
    },
    setCodec(state, action: PayloadAction<CodecType>) {
      state.codec = action.payload;
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
  setResolution,
  setMode,
  setCodec,
} = module.actions;

export default module.reducer;
