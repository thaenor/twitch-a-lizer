import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    textAlign: "center",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const SearchResults = props => {
  const classes = useStyles();

  const streamList = (
    <List className={classes.root}>
      {props.data.streams.map(stream => {
        return (
          <div key={stream._id} id={stream._id} onClick={handleClick}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={stream.game} src={stream.preview.small} />
              </ListItemAvatar>
              <ListItemText
                primary={stream.game}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {stream.channel.display_name}
                    </Typography>
                    <br />
                    {stream.channel.status}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );

  function handleClick(event) {
    const clickedStreamId = event.currentTarget.id;
    const stream = props.data.streams.find(element => {
      return element._id == clickedStreamId; // eslint-disable-line eqeqeq
    });
    props.handleListClick(stream);
  }

  return streamList;
};

export default SearchResults;
