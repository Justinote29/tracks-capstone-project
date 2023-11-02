import React from "react";
import { MarkerF } from "@react-google-maps/api";

//making markers with the props (tracks data from db)
function Markers(props) {
  let { markers, setSelectedMarker } = props;

  // display custom map marker and an info window when clicked
  return markers.map((marker) => {
    return (
      <MarkerF
        onClick={() => {
          setSelectedMarker(marker);
        }}
        position={{ lat: marker.lat, lng: marker.long }}
        title={marker.title}
        content={{
          description: marker.description,
          keywords: marker.keywords,
          created: marker.created,
          postedBy: marker.postedBy,
        }}
        key={marker._id}
        icon={{
          url: "/fm_green.png",
          scaledSize: new window.google.maps.Size(35, 40),
        }}
      ></MarkerF>
    );
  });
}

export default Markers;
