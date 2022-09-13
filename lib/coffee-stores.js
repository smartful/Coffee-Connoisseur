import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
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
    perPage: 40,
    orientation: "landscape",
  });
  const photos = unsplashResults?.response?.results;

  return photos.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latlong = "47.2227%2C2.0666",
  limit = 6
) => {
  const photos = await getImagesOfCoffeeStores();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  try {
    const response = await fetch(
      getUrlForCoffeeStores(latlong, "coffee", limit),
      options
    );
    const data = await response.json();

    return data.results.map((result, index) => ({
      id: result?.fsq_id,
      name: result?.name,
      address: result?.location?.formatted_address,
      region: result?.location?.region,
      imgUrl: photos.length > 0 ? photos[index] : null,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};
