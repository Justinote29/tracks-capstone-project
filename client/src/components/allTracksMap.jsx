import { React, useCallback, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { GoogleMap, useJsApiLoader, InfoWindowF } from "@react-google-maps/api";
import Markers from "./markers";
import "../styles/Map.css";
import mapStyling from "../styles/MapStyles.js";

//Here, we set a marker's position and control it's info window to show when clicked.
function AllTracksMap(props) {
  const { markers, userCoords } = props;
  const [selectedMarker, setSelectedMarker] = useState(null);

  // load google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLEMAPS_API_KEY,
  });
  // show loading message if google map is still loading
  if (!isLoaded) return <div>Loading...</div>;

  // display stylized map with clickable markers
  return (
    // google map centered on user's location
    <GoogleMap
      zoom={14}
      center={{ lat: userCoords.latitude, lng: userCoords.longitude }}
      mapContainerClassName="map-container"
      options={{
        styles: mapStyling.THE_MAP_STYLES,
      }}
    >
      {/* map markers of all tracks */}
      <>
        <Markers markers={markers} setSelectedMarker={setSelectedMarker} />
      </>
      {/* info window with audio player opens when a marker is clicked on */}
      {selectedMarker && (
        <InfoWindowF
          position={{ lat: selectedMarker.lat, lng: selectedMarker.long }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div className="marker-container">
            <div className="marker-text">
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
              <p>Keywords: {selectedMarker.keywords}</p>
              <p>Created on: {selectedMarker.created}</p>
              <p>By: {selectedMarker.postedBy?.name}</p>
            </div>
            <div className="infoWindowAudioPlayer">
              <ReactPlayer
                className="audioPlayer"
                url={selectedMarker.file}
                type="audio/wav"
                width="300px"
                height="100px"
                controls={true}
              />
            </div>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default AllTracksMap;
