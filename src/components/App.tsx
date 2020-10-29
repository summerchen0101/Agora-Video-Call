import React from 'react';
import { Card, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import BasicFrom from './BasicForm';
import AdvanceForm from './AdvanceForm';
import styled from 'styled-components';

import AgoraRTC from 'agora-rtc-sdk';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/store/reducer';
import { rtc } from '@/utils/rtc';
import StreamPlayer from 'agora-stream-player';

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
        <CardWrapper title="一對一視頻" extra={<QuestionCircleOutlined />}>
          <BasicFrom />
        </CardWrapper>
        <Collapse>
          <Panel header="Advence Setting" key="1">
            <AdvanceForm />
          </Panel>
        </Collapse>
      </div>
      <div style={{ flex: 1, margin: 20 }}>
        {streamPlayers.map((uid) => (
          <div id={`player-${uid}`} style={{ width: 300, height: 200 }}></div>
        ))}
      </div>
    </div>
  );
};

export default App;
