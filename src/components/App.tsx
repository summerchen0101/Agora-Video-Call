import React from 'react';
import { Card, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import BasicFrom from '../containers/BasicForm';
import AdvanceForm from '../containers/AdvanceForm';
import styled from 'styled-components';

import AgoraRTC from 'agora-rtc-sdk';
import { useTypedSelector } from '@/store/reducer';
import StreamPlayers from '@/components/StreamPlayers';

console.log(
  'agora sdk version: ' +
    AgoraRTC.VERSION +
    ' compatible: ' +
    AgoraRTC.checkSystemRequirements(),
);

const { Panel } = Collapse;

const CardWrapper = styled(Card)`
  background-color: #fff;
  margin-bottom: 15px;
`;

const App: React.FC = () => {
  const streamPlayers = useTypedSelector((state) => state.streamPlayers);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 480, margin: 20 }}>
        <CardWrapper title="一对一视频通话" extra={<QuestionCircleOutlined />}>
          <BasicFrom />
        </CardWrapper>
        <Collapse>
          <Panel header="Advence Setting" key="1">
            <AdvanceForm />
          </Panel>
        </Collapse>
      </div>
      <div style={{ flex: 1, margin: 20 }}>
        <StreamPlayers uids={streamPlayers} />
      </div>
    </div>
  );
};

export default App;
