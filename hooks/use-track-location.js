import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [latlong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMessage("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
  };

  const handlerTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latlong,
    locationErrorMessage,
    handlerTrackLocation,
    isFindingLocation,
  };
};

export default useTrackLocation;
