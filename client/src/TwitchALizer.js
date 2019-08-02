import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchMode from './features/SearchMode';
import WatchMode from './features/WatchMode';

export default class TwitchALizer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     watchMode: false,
  //     watching: '',
  //     streamData: {},
  //     totalViewers: 0
  //   };
  //   this.handleSelectedStream = this.handleSelectedStream.bind(this);
  // }

  // handleSelectedStream(selectedStream) {
  //   this.setState({ watchMode: true, streamData: selectedStream });
  // }

  render() {
    // let view;
    // if (this.state.watchMode) {
    //   view = (
    //     <ReactTwitchEmbedVideo channel={this.state.streamData.channel.name} />
    //   );
    // } else {
    //   view = <SearchMode handleSelectedStream={this.handleSelectedStream} />;
    // }

    return (
      <>
        <Switch>
          <Route exact path="/" component={SearchMode} />
          <Route path="/watch/:name" component={WatchMode} />
        </Switch>
      </>
    );
  }
}
