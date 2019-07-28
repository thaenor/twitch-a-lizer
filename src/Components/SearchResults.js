import React from "react";

import "./SearchResults.css";

const SearchResults = props => {
  return (
    <div className="flex-container">
      <div className="box"> 1</div>
      <div className="box"> 2</div>
      <div className="box"> {props.search}</div>
      <div className="box"> 4</div>
      <div className="box"> 5</div>
      <div className="box"> 6</div>
    </div>
  );
};

export default SearchResults;
