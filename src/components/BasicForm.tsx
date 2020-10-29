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
  initializeState,
  addStreamPlayers,
  removeStreamPlayers,
} from '@/store/reducer';
import AgoraRTC from '@/utils/AgoraEnhancer';
import FormWrapper from './FormWrapper';
import { rtc } from '@/utils/rtc';
import { handleEvent } from '@/utils/streamEventHandler';
import { initial } from 'lodash';
import { useForm } from 'antd/lib/form/Form';

const randomUserId = Math.floor(Math.random() * 1000000001);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const {
    mode,
    codec,
    token,
    channel,
    uid,
    microphone,
    camara,
    appId,
  } = useTypedSelector((state) => state);
  const [form] = useForm();

  const clearData = () => {
    setisJoined(false);
    setIsPublished(false);
    rtc.client = null;
    setLocalStream(null);
    dispatch(initializeState());
    form.resetFields();
  };
  const onJoin = async () => {
    form.setFieldsValue({ token, channel, uid, appId });
    try {
      await form.validateFields();
    } catch (err) {
      message.error('Please fill up the form fields');
      return;
    }
    if (isJoined) {
      message.error('Your already joined');
      return;
    }
    rtc.client = AgoraRTC.createClient({ mode, codec });
    try {
      await rtc.client.init(appId);
      console.log('AgoraRTC client initialized');
    } catch (err) {
      message.error('client init failed, please open console see more detail');
      console.error(err);
      return;
    }
    handleEvent(dispatch, rtc.client);
    const userId = uid ? +uid : randomUserId;
    try {
      await rtc.client.join(token, channel, userId);
    } catch (err) {
      message.error('client join failed, please open console see more detail');
      console.error(err);
      return;
    }
    message.success('join channel: ' + channel + ' success, uid: ' + userId);

    setisJoined(true);

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
    try {
      await stream.init();
    } catch (err) {
      message.error('stream init failed, please open console see more detail');
      console.error(err);
    }

    stream.play(`player-${stream.getId()}`);
    await rtc.client.publish(stream);
    setIsPublished(true);
    setisJoined(true);
  };
  const onLeave = async () => {
    if (!rtc.client) {
      message.error('Please Join First!');
      return;
    }
    if (!isJoined) {
      message.error('You are not in channel');
      return;
    }
    try {
      await rtc.client.leave();
    } catch (err) {
      message.error('leave success');
      console.error(err);
    }
    if (localStream.isPlaying()) {
      localStream.stop();
    }
    localStream.close();
    dispatch(removeStreamPlayers(+localStream.getId()));
    clearData();
    message.success('leave success');
  };
  const onPublish = async () => {
    if (!rtc.client) {
      message.error('Please Join Room First');
      return;
    }
    if (isPublished) {
      message.error('Your already published');
      return;
    }
    try {
      await rtc.client.publish(localStream);
    } catch (err) {
      message.error('publish failed');
      console.error(err);
    }
    message.info('published');
    setIsPublished(true);
  };
  const onUnPublish = async () => {
    if (!rtc.client) {
      message.error('Please Join Room First');
      return;
    }
    if (!isPublished) {
      message.error("Your didn't publish");
      return;
    }
    try {
      await rtc.client.unpublish(localStream);
    } catch (err) {
      message.error('unpublish failed');
      console.error(err);
    }
    message.info('unpublish');
    setIsPublished(false);
  };
  return (
    <FormWrapper
      name="basic"
      initialValues={{ remember: true }}
      size="large"
      layout="vertical"
      form={form}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="App ID"
        name="appId"
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
            <Button block onClick={onJoin} htmlType="submit">
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
