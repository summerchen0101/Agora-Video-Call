import React from 'react';
import { Card, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import BasicFrom from './BasicForm';
import AdvanceForm from './AdvanceForm';
import styled from 'styled-components';

import AgoraRTC from 'agora-rtc-sdk';

console.log(
  'agora sdk version: ' +
    AgoraRTC.VERSION +
    ' compatible: ' +
    AgoraRTC.checkSystemRequirements(),
);

const { Panel } = Collapse;

const CardWrapper = styled(Card)`
  width: 480px;
  background-color: #fff;
  margin-top: 40px;
  margin-bottom: 15px;
`;

const App: React.FC = () => {
  return (
    <>
      <CardWrapper title="一對一視頻" extra={<QuestionCircleOutlined />}>
        <BasicFrom />
      </CardWrapper>
      <Collapse>
        <Panel header="Advence Setting" key="1">
          <AdvanceForm />
        </Panel>
      </Collapse>
    </>
  );
};

export default App;
