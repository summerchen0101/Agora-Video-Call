import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Radio, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  setUid,
  setCamara,
  setMicrophone,
  setResolution,
  setMode,
  setCodec,
} from '@/store/reducer';
import AgoraRTC from '@/utils/AgoraEnhancer';
import FormWrapper from './FormWrapper';

const { Option } = Select;

const resolutionOptions = [
  {
    name: 'default',
    value: 'default',
  },
  {
    name: '480p',
    value: '480p',
  },
  {
    name: '720p',
    value: '720p',
  },
  {
    name: '1080p',
    value: '1080p',
  },
];

const App: React.FC = () => {
  const [camaraList, setCamaraList] = useState([]);
  const [microphoneList, setMicrophoneList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    AgoraRTC.getDevices((devices) => {
      const result = devices
        .filter((t) => ['audioinput', 'videoinput'].includes(t.kind))
        .reduce((obj, device) => {
          if (!obj[device.kind]) obj[device.kind] = [];
          obj[device.kind].push({
            name: device.label || 'default',
            value: device.deviceId || 'default',
            kind: device.kind,
          });
          return obj;
        }, {}) as { videoinput: any[]; audioinput: any[] };
      setCamaraList(result.videoinput);
      setMicrophoneList(result.audioinput);
    });
  }, []);
  const modeOptions = ['live', 'rtc'];
  const codecOptions = ['h264', 'vp8'];
  return (
    <FormWrapper
      name="advance"
      initialValues={{ remember: true }}
      size="large"
      layout="vertical"
    >
      <Form.Item label="UID" name="uid">
        <Input onBlur={(e) => dispatch(setUid(e.target.value))} />
      </Form.Item>

      <Form.Item label="Camara" name="camara">
        <Select defaultValue="default" onChange={(value) => setCamara(value)}>
          {camaraList.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Microphone" name="microphone">
        <Select
          defaultValue="default"
          onChange={(value) => setMicrophone(value)}
        >
          {microphoneList.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Camara Resolution" name="resolution">
        <Select
          defaultValue="default"
          onChange={(value) => setResolution(value)}
        >
          {resolutionOptions.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Mode" name="mode">
        <Radio.Group
          defaultValue="live"
          onChange={(e) => setMode(e.target.value)}
        >
          {modeOptions.map((value) => (
            <Radio.Button key={value} value={value}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Codec" name="codec">
        <Radio.Group
          defaultValue="h264"
          onChange={(e) => setCodec(e.target.value)}
        >
          {codecOptions.map((value) => (
            <Radio.Button key={value} value={value}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </FormWrapper>
  );
};

export default App;
