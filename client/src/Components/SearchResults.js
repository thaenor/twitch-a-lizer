import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    textAlign: 'center',
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  link: {
    textDecoration: 'none'
  }
}));

const SearchResults = props => {
  const classes = useStyles();

  const streamList = (
    <List className={classes.root}>
      {props.data.map(stream => {
        const linkTo = {
          pathname: `/watch/${stream.channel.name}`,
          state: stream
        };

        return (
          <div key={stream._id} id={stream._id} onClick={handleClick}>
            <Link to={linkTo} className={classes.link}>
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
            </Link>
          </div>
        );
      })}
    </List>
  );

  function handleClick(event) {
    const clickedStreamId = event.currentTarget.id;
    const stream = props.data.find(element => {
      return element._id == clickedStreamId; // eslint-disable-line eqeqeq
    });
    props.handleListClick(stream);
  }

  return streamList;
};

export default SearchResults;
