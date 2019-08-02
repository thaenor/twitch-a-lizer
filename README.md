# TWitch-A-Lizer

This is a Twitch application, made as part of a coding challenge.

The goal is to create a simple page application that can search Twitch for streams.

The list of features:

- search streams
- allow the user to set X ammount of results (stored in local storage)
- show the results in a pretty way
- allow the user to view a stream
- see a total viewers count updated in real time

## Before you beguin

Step 0: clone the repo `git clone https://github.com/thaenor/twitch-a-lizer.git`.

You need to request a client key from Twitch developer website.
Or some mock data. To use these create a `config` folder at the root level of the project.

It should look like this

```JSON
{
  "BASE_URL": "https://api.twitch.tv/kraken/search/streams",
  "TWITCH_KEY": "YOU TWITCH KEY",
  "USE_MOCK_DATA": true
}
```

where:

- base url is the root endpoint to access the Twitch API
- twitch key is the client key
- use mock data is a boolean flag that determines whether you should use mock data for development or really access Twitch API as in a live environment

### How to run

1. `npm install` or `yarn` inside the project folder
2. `npm install` or `yarn` inside the `client` folder
3. `npm run build` inside the `client` folder
4. `npm start` at the project folder

## Main structure of the app

This project is mainly comprised of two parts:

The "front end" is a create-react-app application that renders the UI components. It uses Material UI for a design library.

The "back end" is an Express server application used primarially to serve as a proxy to Twitch service. It implements the basic routes and serves the react application.
The Express assumes the react application is built and ready "for production".

For development you may run the two components separately. Create-react-app already provides hot reload, and the nodemon on the Express server also provides a similar feature for the API.

## Front End - Routes

The UI relies on "react-router" for basic routing features. Two routes are provided:

- / - the home route is the search page, it displays a basic search for streams
- /watch/{username} - the watch route expects a username and plays that users stream

## Communication

Communication between the components is handled in two different ways:

A GET endpoint serves as a proxy to the Twitch's search streams API. It expects a search term and a limit of max results.

### Getting a live count of people watching the stream

The Twitch API does not provide a webhook or service to get a live viewer count for a specific stream. It does however provide a "stream" HTTP GET endpoint that gives details regarding a certain stream.

In order to solve this, the Express needs to pool the endpoint - requesting the data every 2 seconds and reporting any updates to the UI.
In order to regulate communication in real time with the UI - webSockets are used with Socket.io
When the watch component is mounted it establishes a communication and sends in the stream id to track. It then listens for updates and changes the state accordingly.

## Libraries used

### UI

- react
- material-ui
- axios
- react-router
- react-spinners
- react-twitch-embed-video
- socket.io-client

### Express

- axios
- socket.io
- config
- nodemon
