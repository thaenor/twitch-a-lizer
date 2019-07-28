import { TWITCH_KEY, BASE_URL } from "./TwitchKey";
import axios from "axios";

let isRequestInProgress = false;

const requestManager = searchTerm => {
  if (
    typeof searchTerm === "string" &&
    searchTerm.length > 2 &&
    !isRequestInProgress
  ) {
    const query = createQuery(searchTerm);
    isRequestInProgress = true;
    makeRequest(query);
  }
};

function createQuery(searchParam) {
  return `${BASE_URL}?client_id=${TWITCH_KEY}&query=${encodeURIComponent(
    searchParam
  )}`;
}

function makeRequest(url) {
  var config = {
    headers: { "Access-Control-Allow-Origin": "https://api.twitch.tv" }
  };

  axios
    .get(url, config)
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      isRequestInProgress = false;
    });
}

export default requestManager;
