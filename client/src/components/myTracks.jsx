import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactPlayer from "react-player";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import MyTracksMap from "./myTracksMap";
import "../styles/myTracks.css";

// gets the user's tracks and displays them in a list and on a map
const MyTracks = () => {
  const { user, isAuthenticated } = useAuth0();
  let userEmail = user.email;
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://tracks-6983b3e8a59b.herokuapp.com";
  const [data, setData] = useState({});
  const [tracks, setTracks] = useState([]);
  //const [loading, setLoading] = useState(true);

  const route = `/api/tracks/user/${data._id}`;

  const route2 = `/api/tracks/user`;

  // endpoint to fetch user tracks
  const endpoint = baseUrl + route;

  // endpoint2 for delete
  const endpoint2 = baseUrl + route2;

  // get the user's data with their email address
  function getUser() {
    const endpoint1 = `${baseUrl}/api/users/${userEmail}`;

    fetch(endpoint1, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(`Error with fetch`);
        }
      })
      .then((userData) => {
        setData(userData);
        console.log(userData);
      })
      .catch((error) => {
        console.log("Error coming from API:", error);
      });
  }
  //we run the getUser() function with useEffect hook and give it an empty array as the second argument so it runs when the page is initially rendered and not on every rerender.
  useEffect(() => {
    getUser();
    console.log(data);
  }, []); // Empty dependency array makes this effect run once on mount

  // Sorting tracks in descending and using data from useState as a dependency.
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => {
        const sortedTracks = results.sort((a, b) => {
          // Assuming 'created' is a timestamp or date string
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB - dateA; // Sort in descending order
        });

        setTracks(sortedTracks);
      })
      .catch((error) => {
        console.log("error coming from db:", error);
      });
  }, [data]); // data as a dependency from state

  // useEffect(() => {
  //   console.log(tracks);
  // }, []);

  // DELETE track
  const handleDelete = (_id) => {
    fetch(`${endpoint2}/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        setTracks([...tracks].filter((t) => t._id !== _id));
      })

      .catch((err) => console.log(err));
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Must be logged in to see your Tracks</h1>
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <div className="myTracks">
        <h1 className="myTracksTitle">My Tracks</h1>

        <div className="panelContainer">
          <Card className="leftPanel">
            {/* READ */}
            {tracks.map((dat) => (
              <div key={dat._id} style={{}} className="myTracksDiv">
                <div className="myTracksFootDiv">
                  <div>
                    <h2>{dat.title}</h2>
                    <p>{dat.description}</p>
                  </div>
                </div>
                <div className="playerDiv">
                  <ReactPlayer
                    className="audioPlayer"
                    url={dat.file}
                    type="audio/wav"
                    width="300px"
                    height="100px"
                    controls={true}
                  />
                </div>
                {/* <p>
            lat:{dat.lat} long:{dat.long}
          </p> */}
                <p className="myTracksInfo">created: {dat.created}</p>
                <Button
                  className="deleteBtn"
                  onClick={() => {
                    handleDelete(dat._id);
                  }}
                >
                  Delete
                </Button>
                <hr></hr>
              </div>
            ))}
          </Card>
          <div className="rightPanel">
            <MyTracksMap markers={tracks} />
          </div>
        </div>
      </div>
    );
  }
};

export default MyTracks;
