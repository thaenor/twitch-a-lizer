import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: "0 auto"
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const TotalResultsSlider = props => {
  const classes = useStyles();

  function valuetext(value) {
    return `${value} results`;
  }

  function handleChange(event, value) {
    props.changeValue(value);
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Total Results {props.currentValue}
      </Typography>
      <Slider
        defaultValue={props.currentValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={handleChange}
        step={10}
        marks
        min={1}
        max={100}
      />
    </div>
  );
};

export default TotalResultsSlider;
