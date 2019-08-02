import axios from "axios";

function createQuery(searchParam, totalResults) {
  const param = encodeURIComponent(searchParam);
  return `/api/search?term=${param}&limit=${totalResults}`;
}

async function requestManager(searchTerm, totalResults) {
  if (typeof searchTerm === "string" && searchTerm !== "") {
    const query = createQuery(searchTerm, totalResults);
    return makeRequest(query);
  } else {
    console.warn(`request not made, the search term was: ${searchTerm}`);
    return {
      streams: []
    };
  }
}

async function makeRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export default requestManager;
