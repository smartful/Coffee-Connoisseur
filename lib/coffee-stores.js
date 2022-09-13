import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export const getUrlForCoffeeStores = (latlong, query, limit) => {
  const DOMAIN = "https://api.foursquare.com/";
  const SEARCH_PLACE_API = "v3/places/search?";
  const url = `${DOMAIN}${SEARCH_PLACE_API}query=${query}&ll=${latlong}&limit=${limit}`;
  return url;
};

export const getImagesOfCoffeeStores = async () => {
  const unsplashResults = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
    orientation: "landscape",
  });
  const photos = unsplashResults?.response?.results;

  return photos.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getImagesOfCoffeeStores();
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

    return data.results.map((result, index) => ({
      ...result,
      imgUrl: photos[index],
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};
