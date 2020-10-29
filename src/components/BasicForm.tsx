import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAppID,
  setChannel,
  setToken,
  useTypedSelector,
  addRemoteStreams,
  addStreamPlayers,
} from '@/store/reducer';
import AgoraRTC from '@/utils/AgoraEnhancer';
import FormWrapper from './FormWrapper';
import { rtc } from '@/utils/rtc';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [agoraClient, setClient] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const {
    mode,
    codec,
    appId,
    token,
    channel,
    uid,
    microphone,
    camara,
  } = useTypedSelector((state) => state);
  const userId = uid || Math.floor(Math.random() * 1000000001);
  const onStreamAdded = (e) => {
    console.log('onStreamAdded' + e.stream.getId());
    dispatch(addRemoteStreams(e.stream));
  };
  const onRemoteClientAdded = () => console.log('onRemoteClientAdded');
  const onStreamRemoved = () => console.log('onStreamRemoved');
  const onPeerLeave = () => console.log('onPeerLeave');
  const handleEvent = (client) => {
    client.on('stream-added', onStreamAdded);
    client.on('stream-subscribed', onRemoteClientAdded);
    client.on('stream-removed', onStreamRemoved);
    client.on('peer-leave', onPeerLeave);
  };
  const onJoin = async () => {
    const client = AgoraRTC.createClient({ mode, codec });
    setClient(client);
    try {
      await client.init(appId);
      console.log('AgoraRTC client initialized');
    } catch (err) {
      console.log('AgoraRTC client init failed', err);
    }
    handleEvent(client);
    await client.join(token, channel, userId);

    // create a ne stream
    const stream = AgoraRTC.createStream({
      streamID: userId,
      video: true,
      audio: true,
      screen: false,
      microphoneId: microphone,
      cameraId: camara,
    });
    setLocalStream(stream);
    dispatch(addStreamPlayers(+userId));
    await stream.init();

    stream.play(`player-${userId}`);
    await client.publish(stream);
    setIsPublished(true);
    setisJoined(true);
  };
  return (
    <FormWrapper
      name="basic"
      initialValues={{ remember: true }}
      size="large"
      layout="vertical"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="App ID"
        name="app-id"
        rules={[{ required: true, message: 'Please input App ID!' }]}
      >
        <Input
          onBlur={(e) => dispatch(setAppID(e.target.value))}
          defaultValue={appId}
        />
      </Form.Item>

      <Form.Item
        label="Channel Name"
        name="channel"
        rules={[{ required: true, message: 'Please input Cannel Name!' }]}
      >
        <Input
          onBlur={(e) => dispatch(setChannel(e.target.value))}
          defaultValue={channel}
        />
      </Form.Item>
      <Form.Item
        label="Token"
        name="token"
        rules={[{ required: true, message: 'Please input the Token!' }]}
      >
        <Input
          onBlur={(e) => dispatch(setToken(e.target.value))}
          defaultValue={token}
        />
      </Form.Item>

      <Form.Item className="form-footer">
        <Row gutter={8}>
          <Col span={6}>
            <Button block onClick={onJoin}>
              Join
            </Button>
          </Col>
          <Col span={6}>
            <Button block>Leave</Button>
          </Col>
          <Col span={6}>
            <Button block>Publish</Button>
          </Col>
          <Col span={6}>
            <Button block>Unpublish</Button>
          </Col>
        </Row>
      </Form.Item>
    </FormWrapper>
  );
};

export default App;
