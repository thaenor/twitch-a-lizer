import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import SearchBar from "../Components/SearchBar";
import TotalResultsSlider from "../Components/TotalResultsSlider";
import SearchResults from "../Components/SearchResults";
import requestManager from "../Services/TwitchConnect";

class SearchMode extends React.Component {
  constructor(props) {
    super(props);
    //reads local storage for number of total items to return from search. If nothing is found 30 is the default value
    let m = localStorage.getItem('totalResults');
    m = m === null ? 30 : parseInt(m);
    this.state = {
      searchTerm: "",
      totalResults: m,
      isLoading: false,
      loadingDone: false,
      searchResults: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleStreamSelection = this.handleStreamSelection.bind(this);
    this.handleMaxResults = this.handleMaxResults.bind(this);
  }

  handleChange(term) {
    this.setState(
      prevState => ({
        ...prevState,
        searchTerm: term,
        isLoading: true,
        loadingDone: false
      }),
      () => {
        this.handleSearch();
      }
    );
  }

  handleMaxResults(value) {
    localStorage.setItem('totalResults',value);
    this.setState(prevState => ({
      ...prevState,
      totalResults: value
    }));
  }

  handleSearch() {
    requestManager(this.state.searchTerm, this.state.totalResults)
      .then(result => {
        this.setState(prevState => ({
          ...prevState,
          searchResults: result,
          isLoading: false,
          loadingDone: true
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleStreamSelection(selectedStream) {
    this.props.handleSelectedStream(selectedStream);
  }

  renderResults() {
    if (this.state.loadingDone) {
      if (this.state.searchResults.streams.length > 0) {
        return (
          <SearchResults
            data={this.state.searchResults}
            handleListClick={this.handleStreamSelection}
          />
        );
      } else {
        return <p>No Results. Sorry.</p>;
      }
    }
    return null;
  }

  render() {
    return (
      <>
        <SearchBar onSearchChange={this.handleChange} />
        <TotalResultsSlider
          currentValue={this.state.totalResults}
          changeValue={this.handleMaxResults}
        />
        {this.state.isLoading ? (
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        ) : null}

        {this.renderResults()}
      </>
    );
  }
}

export default SearchMode;
