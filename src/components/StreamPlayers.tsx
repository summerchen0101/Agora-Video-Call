import React from 'react';
import styled from 'styled-components';

const Player = styled.div`
  width: 350px;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 50%);
`;

const StreamPlayers: React.FC<{ uids: number[] }> = ({ uids }) => {
  return (
    <>
      {uids.map((uid) => (
        <Player key={uid} id={`player-${uid}`} />
      ))}
    </>
  );
};
export default StreamPlayers;
