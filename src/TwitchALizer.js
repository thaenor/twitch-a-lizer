import React from "react";
import SearchMode from "./features/SearchMode";

export default class TwitchALizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      totalResults: 10,
      watchMode: false,
      watching: "",
      totalViewers: 0
    };
  }

  render() {
    let view;
    if (this.state.watchMode) {
      view = <h1>View Mode</h1>;
    } else {
      view = <SearchMode />;
    }

    return view;
  }
}
