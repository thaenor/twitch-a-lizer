import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 350,
    margin: '0 auto',
    marginBottom: '30px'
  }
}));

const SearchBar = props => {
  const classes = useStyles();
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
      className={classes.root}
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
