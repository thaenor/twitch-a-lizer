import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";

const SearchBar = props => {
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.target.value !== ""
        ? props.onSearchChange(event.target.value)
        : alert("you need to search something!");
    }
  }

  return (
    <>
      <Input
        autoFocus
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        }
        type="text"
        placeholder="search streams"
      />
      <Button variant="contained">Search</Button>
    </>
  );
};

export default SearchBar;
