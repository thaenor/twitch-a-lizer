import { TWITCH_KEY, BASE_URL } from "./TwitchKey";
import axios from "axios-jsonp-pro";
import { isDev } from "./constants";
import { mockdata } from "./mockdata";

let isRequestInProgress = false;

async function requestManager(searchTerm, totalResults) {
  if (
    typeof searchTerm === "string" &&
    searchTerm !== "" &&
    !isRequestInProgress
  ) {
    const query = createQuery(searchTerm, totalResults);
    isRequestInProgress = true;
    return makeRequest(query);
  } else {
    console.warn(
      `request not made, either there is already a request queued (isRequestInProgress: ${isRequestInProgress}) or the search term was empty (search term: ${searchTerm}`
    );
  }
}

function createQuery(searchParam, totalResults) {
  return `${BASE_URL}?client_id=${TWITCH_KEY}&query=${encodeURIComponent(
    searchParam
  )}&limit=${totalResults}`;
}

function makeRequest(url) {
  var config = {
    headers: { "Access-Control-Allow-Origin": "*" }
  };

  if (isDev) {
    //For DEV only - this is just so I don't flood Twitch API while developping (or in the unlikely event Twitch is down)
    isRequestInProgress = false;
    return mockdata;
  }

  //https://github.com/justintv/Twitch-API/issues/133
  return axios
    .jsonp(url, config)
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      isRequestInProgress = false;
    });
}

export default requestManager;
