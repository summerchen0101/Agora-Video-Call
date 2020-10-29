import React, { useEffect, useState } from 'react';
import { message, Form, Input, Button, Row, Col } from 'antd';
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
  removeStreamPlayers,
} from '@/store/reducer';
import AgoraRTC from '@/utils/AgoraEnhancer';
import FormWrapper from './FormWrapper';
import { rtc } from '@/utils/rtc';

const randomUserId = Math.floor(Math.random() * 1000000001);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
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
  const onStreamAdded = (stream, client) => {
    console.log('onStreamAdded' + stream.getId());
    setRemoteStreams(remoteStreams.concat(stream));
    client.subscribe(stream);
  };
  const onRemoteClientAdded = (stream, client) => {
    dispatch(addStreamPlayers(stream.getId()));
    stream.play(`player-${stream.getId()}`);
  };
  const onPeerLeave = (stream, client) => {
    console.log('onPeerLeave');
    dispatch(removeStreamPlayers(stream.getId()));
    if (stream && stream.isPlaying()) {
      stream.stop();
    }
  };
  const onStreamRemoved = (stream, client) => {
    console.log('onStreamRemoved');
    dispatch(removeStreamPlayers(stream.getId()));
    if (stream && stream.isPlaying()) {
      stream.stop();
    }
  };
  const handleEvent = (client) => {
    client.on('stream-added', (e) => onStreamAdded(e.stream, client));
    client.on('stream-subscribed', (e) =>
      onRemoteClientAdded(e.stream, client),
    );
    client.on('stream-removed', (e) => onStreamRemoved(e.stream, client));
    client.on('peer-leave', (e) => onPeerLeave(e.stream, client));
  };
  const onJoin = async () => {
    rtc.client = AgoraRTC.createClient({ mode, codec });
    try {
      await rtc.client.init(appId);
      console.log('AgoraRTC client initialized');
    } catch (err) {
      console.log('AgoraRTC client init failed', err);
    }
    handleEvent(rtc.client);
    const userId = uid ? +uid : randomUserId;
    await rtc.client.join(token, channel, userId);

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
    dispatch(addStreamPlayers(+stream.getId()));
    await stream.init();

    stream.play(`player-${stream.getId()}`);
    await rtc.client.publish(stream);
    setIsPublished(true);
    setisJoined(true);
  };
  const onLeave = async () => {
    await rtc.client.leave();
    if (localStream.isPlaying()) {
      localStream.stop();
    }
    localStream.close();
    dispatch(removeStreamPlayers(+localStream.getId()));
  };
  const onPublish = async () => {
    try {
      await rtc.client.publish(localStream);
    } catch (err) {
      message.error('publish failed');
      console.error(err);
    }
    message.info('published');
  };
  const onUnPublish = async () => {
    try {
      await rtc.client.unpublish(localStream);
    } catch (err) {
      message.error('unpublish failed');
      console.error(err);
    }
    message.info('unpublish');
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
            <Button block onClick={onLeave}>
              Leave
            </Button>
          </Col>
          <Col span={6}>
            <Button block onClick={onPublish}>
              Publish
            </Button>
          </Col>
          <Col span={6}>
            <Button block onClick={onUnPublish}>
              Unpublish
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </FormWrapper>
  );
};

export default App;
