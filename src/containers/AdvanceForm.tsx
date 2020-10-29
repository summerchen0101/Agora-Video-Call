import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Radio, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  setUid,
  setCamara,
  setMicrophone,
  setMode,
  setCodec,
  useTypedSelector,
} from '@/store/reducer';
import AgoraRTC from '@/utils/AgoraEnhancer';
import FormWrapper from '../components/FormWrapper';
import { useForm } from 'antd/lib/form/Form';

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
  const { camara, microphone, uid, mode, codec } = useTypedSelector(
    (state) => state,
  );
  const [form] = useForm();
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
      console.log(result);
      setCamaraList(result.videoinput);
      console.log(result.videoinput[0]?.value);
      dispatch(setCamara(result.videoinput[0]?.value));
      setMicrophoneList(result.audioinput);
      dispatch(setMicrophone(result.audioinput[0]?.value));
      console.log({ camara, microphone, mode, codec });
      form.setFieldsValue({ camara, microphone, mode, codec });
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
      form={form}
    >
      <Form.Item label="UID" name="uid">
        <Input
          onBlur={(e) => dispatch(setUid(+e.target.value))}
          type="number"
          defaultValue={uid}
        />
      </Form.Item>

      <Form.Item label="Camara" name="camara">
        <Select
          defaultValue={camara}
          onChange={(value) => dispatch(setCamara(value))}
        >
          {camaraList.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Microphone" name="microphone">
        <Select
          defaultValue={microphone}
          onChange={(value) => dispatch(setMicrophone(value))}
        >
          {microphoneList.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Camara Resolution" name="resolution">
        <Select defaultValue="default">
          {resolutionOptions.map((t) => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Mode" name="mode">
        <Radio.Group
          defaultValue={mode}
          onChange={(e) => dispatch(setMode(e.target.value))}
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
          defaultValue={codec}
          onChange={(e) => dispatch(setCodec(e.target.value))}
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
