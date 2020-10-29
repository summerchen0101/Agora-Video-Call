import React from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAppID, setChannel, setToken } from '@/store/reducer';

const FormWrapper = styled(Form)`
  .ant-form-item {
    margin-bottom: 5px;
    .ant-form-item-label {
      padding-bottom: 0;
    }
    &.form-footer {
      margin-top: 30px;
    }
  }
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Card
      title="一對一視頻"
      extra={<QuestionCircleOutlined />}
      style={{ width: 480, backgroundColor: '#fff' }}
    >
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
          <Input onBlur={(e) => dispatch(setAppID(e.target.value))} />
        </Form.Item>

        <Form.Item
          label="Channel Name"
          name="cannel"
          rules={[{ required: true, message: 'Please input Cannel Name!' }]}
        >
          <Input onBlur={(e) => dispatch(setChannel(e.target.value))} />
        </Form.Item>
        <Form.Item
          label="Token"
          name="token"
          rules={[{ required: true, message: 'Please input the Token!' }]}
        >
          <Input onBlur={(e) => dispatch(setToken(e.target.value))} />
        </Form.Item>

        <Form.Item className="form-footer">
          <Row gutter={8}>
            <Col span={6}>
              <Button block>Join</Button>
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
    </Card>
  );
};

export default App;
