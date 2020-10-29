import React from 'react';
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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = () => {
    /**/
  };
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
        <Select defaultValue="1" onChange={(value) => setCamara(value)}>
          <Option value="1">default</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Microphone" name="microphone">
        <Select defaultValue="1" onChange={(value) => setMicrophone(value)}>
          <Option value="1">default</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Camara Resolution" name="resolution">
        <Select defaultValue="1" onChange={(value) => setResolution(value)}>
          <Option value="1">default</Option>
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
