import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const MapsWithMarker = () => {
  const containerStyle = {
    width: "100%",
    height: "200px",
    maxWidth: "600px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD0BkNlFyWlSW9ksDof1TCsx6uuQuEP-zw",
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Unable to retrieve your location.");
        }
      );
    }
  }, []);

  const onLoad = (map) => {
    if (currentLocation) {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);
    }
  };

  return isLoaded && currentLocation ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fadeIn">
        Your Current Location
      </h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={12}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
        className="rounded-lg shadow-lg animate-zoomIn"
      >
        <MarkerF position={currentLocation} />
      </GoogleMap>
      <button
        onClick={() =>
          navigator.geolocation.getCurrentPosition((position) =>
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          )
        }
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300 animate-bounce"
      >
        Update Location
      </button>

      {/* Responsive Your Addresses Button */}
      <button
        onClick={() => window.location.href = "/addresses"}
        className="fixed lg:top-4 lg:right-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-300"
      >
        Your Addresses
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default MapsWithMarker;
