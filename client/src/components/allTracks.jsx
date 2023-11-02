import ReactPlayer from "react-player";
import { Component, useCallback, useEffect, useState } from "react";
import AllTracksMap from "./allTracksMap";
import "../styles/allTracks.css";

// here we display a map with the user's location as the center point with markers of all of the tracks
const AllTracks = () => {
  // url to get all tracks from db
  const baseUrl = `https://tracks-6983b3e8a59b.herokuapp.com`;
  // const baseUrl = `http://localhost:3000`;
  const route = `/api/tracks`;
  const endpoint = baseUrl + route;

  const [userCoords, setUserCoords] = useState([]);
  const [markers, setMarkers] = useState([]);

  // get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("the user's position is: ", position);
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  // get all the tracks data for the map markers
  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMarkers(data);
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log("Error connecting to db api: ", err);
      });
  }, []);

  // display the map centered on user's location with tracks map markers
  return (
    <div className="allTracksWrapper">
      <h1>All Nearby Tracks</h1>
      <AllTracksMap markers={markers} userCoords={userCoords} />
    </div>
  );
};

export default AllTracks;
