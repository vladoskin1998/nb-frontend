import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";

type Library = "core" | "maps" | "places" | "geocoding" | "routes" | "marker" | "geometry" | "elevation" | "streetView" | "journeySharing" | "drawing" | "visualization";

const libraries:Library[] = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0, 
  lng: 0,
};

const options = {
  disableDefaultUI: true, 
  zoomControl: true, 
};

const MapWithSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(center);

  const onPlaceSelected = (place:any) => {
    const { lat, lng } = place?.geometry.location || center;
    setSelectedLocation({ lat, lng });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAlAsqqCPOjsCE5itdhU0t-c41dUCIVw3c" libraries={libraries}>
        {/* <Autocomplete
         options={{ types: ['(regions)'] }} 
          onPlaceSelected={onPlaceSelected}
        >
          <input
            type="text"
            placeholder="Enter a location"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
            }}
          />
        </Autocomplete> */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedLocation}
          zoom={15}
          options={options}
        >
          <Marker position={selectedLocation} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithSearch;

