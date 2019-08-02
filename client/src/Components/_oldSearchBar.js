import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

const SearchBar = props => {
  let typingTimer;
  const typingInterval = 500;
  const [value, setValue] = useState();

  function handleChange(event) {
    setValue(event.target.value);
  }

  function doneTyping() {
    props.onSearchChange(value);
  }

  return (
    <Input
      autoFocus
      onKeyDown={() => {
        clearTimeout(typingTimer);
      }}
      onKeyUp={() => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, typingInterval);
      }}
      onChange={handleChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlined />
        </InputAdornment>
      }
      type="text"
      placeholder="search streams"
    />
  );
};

export default SearchBar;
