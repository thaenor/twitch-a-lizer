import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import socketIOClient from 'socket.io-client';

const WatchMode = props => {
  const channelName = props.match.params.name;
  const state = props.location.state;
  const socket = socketIOClient('localhost:5001');
  socket.on('connection', data => console.log(data));
  socket.emit('subscribeWatchNow', state._id);
  socket.on('subscribeWatchNow', data => console.log(data));

  function handleData(data) {
    let result = JSON.parse(data);
    console.log(result);
  }

  return (
    <>
      {/*<ReactTwitchEmbedVideo channel={channelName} /> */}
      <h1>Watching Now: {state.viewers}</h1>
    </>
  );
};

export default WatchMode;
