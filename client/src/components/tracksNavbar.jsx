import CreateTrack from "./createTrack";
import FaqPage from "./faq";
import AllTracks from "./allTracks";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";
import MyTracks from "./myTracks";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import UserProfile from "./userProfile";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";
import "../styles/tracksNavbar.css"

// the Navbar
function TracksNavbar() {
  const { isLoading, error, user, isAuthenticated } = useAuth0();

  return (
    <div>
      <Router>
        <div>
          <Navbar
            fixed="top"
            data-bs-theme="dark"
            expand="sm"
            className="nav"
            collapseOnSelect="true"
          >
            <Container>
              {/* Left side navbar logo link to root route */}
              <Navbar.Brand href="/">
                <img
                  className="navLogo"
                  src="/Tracks_Foot_Circle_White.png"
                  alt="track logo"
                />
              </Navbar.Brand>
              {/* Navbar Links */}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  {isAuthenticated && (
                    <>
                      <Nav.Link as={Link} to="/MyTracks" className="navLink ms-auto" collapseOnSelect="true">
                        My Tracks
                      </Nav.Link>
                    </>
                  )}
                  <Nav.Link as={Link} to="/AllTracks" className="navLink ms-auto">
                    All Tracks
                  </Nav.Link>
                  {isAuthenticated && (
                    <>
                      <Nav.Link as={Link} to="/CreateTrack" className="navLink ms-auto">
                        Create Track
                      </Nav.Link>
                    </>
                  )}
                </Nav>
                </Navbar.Collapse>
                {/* Dropdown Menu */}
                <NavDropdown title="More" id="collapsible-nav-dropdown" className="ms-auto">
                  {isAuthenticated && (
                    <>
                      <NavDropdown.Item as={Link} to="/Profile">Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                  <NavDropdown.Item as={Link} to="/">
                    Home
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Faq" className="navLink">
                    FAQs
                  </NavDropdown.Item>
                  {/* Sign in/Sign out button */}
                  <NavDropdown.Item>
                    <LoginButton />
                    <LogoutButton />
                  </NavDropdown.Item>
                </NavDropdown>
                {/* {isAuthenticated && (
                    <>
                      <Nav.Link as={Link} to="/MyTracks" className="navLink">
                        My Tracks
                      </Nav.Link>
                      <Nav.Link as={Link} to="/CreateTrack" className="navLink">
                        Create Track
                      </Nav.Link>
                      <Nav.Link as={Link} to="/Profile" className="navLink">
                        Profile
                      </Nav.Link>
                    </>
                  )} */}


              
            </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/Faq" element={<FaqPage />}></Route>
            <Route path="/CreateTrack" element={<CreateTrack />}></Route>
            <Route path="/AllTracks" element={<AllTracks />}></Route>
            <Route path="/MyTracks" element={<MyTracks />}></Route>
            <Route path="/Profile" element={<UserProfile />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default TracksNavbar;
