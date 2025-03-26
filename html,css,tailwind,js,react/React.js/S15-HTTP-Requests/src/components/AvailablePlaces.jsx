import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailblePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailblePlaces] = useState([]);
  const [isFetching, setIsfetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsfetching(true);

      try {
        const places = await fetchAvailblePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailblePlaces(sortedPlaces);
          setIsfetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places,please try again later.",
        });
        setIsfetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
