import "./App.css";
import CreateTrack from "./components/createTrack";
import FaqPage from "./components/faq";
import AllTracks from "./components/allTracks";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import MyTracks from "./components/myTracks";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import UserProfile from "./components/userProfile";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./components/LandingPage";
import TracksNavbar from "./components/tracksNavbar";
import TracksFooter from "./components/tracksFooter"

function App() {
  const { isLoading, error, user, isAuthenticated } = useAuth0();

  return (
    <main>
      {/* //conditional stuff- if there's an error, it will show authentication error.  If there's not and error and it's loading, it will show loading (TODO-put a loading animation here), and it will show the rest if no error or isn't loading */}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && (
        <>
          {/* <p>Loading!!! </p>{" "} */}
          <img
            className="loadingFoot"
            src="/Tracks_Footprint_Loading.png"
            alt="tracks foot logo"
          />{" "}
        </>
      )}
      {!error && !isLoading && (
        <>
          {" "}
          {/* <Profile /> */}
          <TracksNavbar />

          <TracksFooter />
        </>
      )}
    </main>
  );
}

export default App;
