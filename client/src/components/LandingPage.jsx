import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import SignUpButton from "./SignupButton";
import "../styles/LandingPage.css";

const LandingPage = () => {
  // const baseUrl = "http://localhost:3000";
   const baseUrl = "https://tracks-6983b3e8a59b.herokuapp.com";
  const endpoint = `${baseUrl}/api/user`;
  // To get user info when they're authenticated
  const { user, isAuthenticated } = useAuth0();
  let userEmail = user ? user.email : null; // Check if user is defined

  // State to store userData
  const [data, setData] = useState({});

  // Function to grab the user info.
  const getUser = () => {
    if (isAuthenticated && userEmail) {
      // Check if isAuthenticated and userEmail are defined
      const userEndpoint = `${baseUrl}/api/users/${userEmail}`;
      fetch(userEndpoint, {
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
  };

  // useEffect to call getUser when the component is mounted
  useEffect(() => {
    getUser();
  }, [isAuthenticated, userEmail]);

  // Function to create a user
  const createUser = async () => {
    try {
      if (isAuthenticated && userEmail) {
        // Check if isAuthenticated and userEmail are defined
        // Create the data object to send in the request
        const requestData = {
          first: user.given_name,
          last: user.family_name,
          name: user.nickname,
          email: userEmail, // Use userEmail here
          picture:
            "https://tracks-audio.s3.amazonaws.com/tracksLogos/Tracks_Foot_Circle_01.png",
        };

        // Check if user.picture exists before adding it to the requestData
        // if (user.picture) {
        //   requestData.picture = user.picture;
        // }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
        } else {
          // Handle the case where the user already exists or there was an error
          // You can customize this error handling based on your server's response
          console.error("Error creating user:", response.statusText);
        }
      }
    } catch (error) {
      console.log("Error coming from API:", error);
    }
  };

  // Call createUser only when the user is authenticated and userEmail is available
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      createUser();
    }
  }, [isAuthenticated, userEmail]);

  return (
    <>
      <div className="landingDiv">
        {/* <Profile /> */}
        <div>
          {" "}
          <img
            src="/Tracks_University_01.png"
            alt="Tracks Share Your Path"
            className="landingImage"
          />
        </div>
      </div>
      <div className="landingButtons">
        <div className="landingSignIn">
      <LoginButton />
      </div>
      <div className="landingSignUp">
      <SignUpButton />
      </div>
      </div>
    </>
  );
};

export default LandingPage;
