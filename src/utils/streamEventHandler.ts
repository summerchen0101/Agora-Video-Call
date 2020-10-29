import { addStreamPlayers, removeStreamPlayers } from '@/store/reducer';
export const handleEvent = (dispatch, client) => {
  const onStreamAdded = (stream, client) => {
    client.subscribe(stream);
  };
  const onRemoteClientAdded = (stream, client) => {
    dispatch(addStreamPlayers(stream.getId()));
    stream.play(`player-${stream.getId()}`);
  };
  const onPeerLeave = (stream, client) => {
    dispatch(removeStreamPlayers(stream.getId()));
    if (stream && stream.isPlaying()) {
      stream.stop();
    }
  };
  const onStreamRemoved = (stream, client) => {
    dispatch(removeStreamPlayers(stream.getId()));
    if (stream && stream.isPlaying()) {
      stream.stop();
    }
  };

  client.on('stream-added', (e) => onStreamAdded(e.stream, client));
  client.on('stream-subscribed', (e) => onRemoteClientAdded(e.stream, client));
  client.on('stream-removed', (e) => onStreamRemoved(e.stream, client));
  client.on('peer-leave', (e) => onPeerLeave(e.stream, client));
};
