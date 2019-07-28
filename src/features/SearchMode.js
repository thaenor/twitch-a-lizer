import React from "react";
import SearchBar from "../Components/SearchBar";
import SearchResults from "../Components/SearchResults";
import requestManager from "../Services/TwitchConnect";

class SearchMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", endSearch: false, isLoading: false };
  }

  render() {
    const results = <SearchResults search={this.state.searchTerm} />;

    return (
      <div>
        <SearchBar
          onSearchChange={search => {
            this.setState((state, props) => {
              return { searchTerm: search, endSearch: false, isLoading: true };
            });
            requestManager(search);
          }}
        />
        {this.state.endSearch && results}
      </div>
    );
  }
}

export default SearchMode;
