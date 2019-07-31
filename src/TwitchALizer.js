import React from "react";
import SearchMode from "./features/SearchMode";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

export default class TwitchALizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchMode: false,
      watching: "",
      streamData: {},
      totalViewers: 0
    };
    this.handleSelectedStream = this.handleSelectedStream.bind(this);
  }

  handleSelectedStream(selectedStream) {
    this.setState({ watchMode: true, streamData: selectedStream });
  }

  render() {
    let view;
    if (this.state.watchMode) {
      view = (
        <ReactTwitchEmbedVideo channel={this.state.streamData.channel.name} />
      );
    } else {
      view = <SearchMode handleSelectedStream={this.handleSelectedStream} />;
    }

    return view;
  }
}
