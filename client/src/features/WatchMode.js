import React, { useState, useEffect } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const WatchMode = props => {
  const [watchingNow, setWatchingNow] = useState(0);
  const channelName = props.match.params.name;
  const state = props.location.state;

  useEffect(() => {
    const socket = socketIOClient("localhost:5001");
    socket.on("connection", data => console.log(data));
    socket.emit("subscribeWatchNow", state.channel._id);
    socket.on("noViewers", data => {
      console.log("No viewers: ", data.viewers);
      setWatchingNow(data.viewers);
    });
    socket.on("viewersCount", data => {
      console.log("viewersCount: ", data.viewers);
      setWatchingNow(data.viewers);
    });

    return function cleanup() {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <ReactTwitchEmbedVideo channel={channelName} />
      <h1>Watching Now: {watchingNow}</h1>
    </>
  );
};

export default WatchMode;
