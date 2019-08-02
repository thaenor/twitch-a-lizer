const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('config');
const axios = require('axios');

const base_url = config.get('BASE_URL');
const twitch_key = config.get('TWITCH_KEY');
const use_mock_data = config.get('USE_MOCK_DATA');

let mockData = {};
const axiosConfig = {
  headers: { 'Access-Control-Allow-Origin': '*' }
};

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { origins: '*:*' });

if (use_mock_data) {
  const rawdata = fs.readFileSync(path.resolve('./config/mockData.json'));
  mockData = JSON.parse(rawdata);
}

function createQuery(searchParam, totalResults) {
  return `${base_url}?client_id=${twitch_key}&query=${encodeURIComponent(
    searchParam
  )}&limit=${totalResults}`;
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.term;
  const totalItems = req.query.limit;

  const endpoint = createQuery(searchTerm, totalItems);

  if (use_mock_data) {
    res.json(mockData);
  } else {
    axios
      .get(endpoint, axiosConfig)
      .then(twitchResponse => {
        res.json(twitchResponse.data);
      })
      .catch(error => {
        // handle error
        console.error(error);
        res.sendStatus(500);
      });
  }
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('subscribeWatchNow', data => {
    console.log(data);
    io.emit('subscribeWatchNow', 'hello you');
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
http.listen(port + 1, function() {
  console.log('listening on ' + port + 1);
});

console.log('App is listening on port ' + port);
