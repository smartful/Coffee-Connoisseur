export const getUrlForCoffeeStores = (latlong, query, limit) => {
  const DOMAIN = "https://api.foursquare.com/";
  const SEARCH_PLACE_API = "v3/places/search?";
  const url = `${DOMAIN}${SEARCH_PLACE_API}query=${query}&ll=${latlong}&limit=${limit}`;
  return url;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  try {
    const response = await fetch(
      getUrlForCoffeeStores("48.78%2C2.51", "coffee", 6),
      options
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
