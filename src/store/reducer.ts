import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
type ModeType = 'live' | 'rtc';
type CodecType = 'h264' | 'vp8';
interface IRootState {
  appId: string;
  channel: string;
  token: string;
  uid: string;
  camara: string;
  microphone: string;
  resolution: string;
  mode: ModeType;
  codec: CodecType;
  streamPlayers: number[];
}

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;

const initialState: IRootState = {
  appId: '246a5190e9c544f5973e41237cc100f5',
  channel: 'A cool channel',
  token:
    '006246a5190e9c544f5973e41237cc100f5IACSPTUJ0OI2yNhVQTyFKOdIWfnm8LUWWHXbWcnzZxRzC5Hmy34AAAAAEABO10qJuW6bXwEAAQC5bptf',
  uid: '',
  camara: '',
  microphone: '',
  resolution: '',
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
      state.uid = '';
      state.camara = '';
      state.microphone = '';
      state.resolution = '';
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
  setResolution,
  setMode,
  setCodec,
  addStreamPlayers,
  removeStreamPlayers,
  initializeState,
} = module.actions;

export default module.reducer;
