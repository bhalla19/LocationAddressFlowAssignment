import React, { useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";

const MapWithSearch = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0BkNlFyWlSW9ksDof1TCsx6uuQuEP-zw",
    libraries: ["places"],
  });

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selected, setSelected] = useState(null);
  const autocompleteRef = useRef();

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    const location = place.geometry.location;
    setCenter({ lat: location.lat(), lng: location.lng() });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search a place"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </Autocomplete>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ width: "100%", height: "500px" }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};

export default MapWithSearch;
