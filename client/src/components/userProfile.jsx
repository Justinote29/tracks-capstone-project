import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/userProfile.css";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // Store the selected profile picture

  let userEmail = user.email;
  const baseUrl = "https://tracks-6983b3e8a59b.herokuapp.com";
  // const baseUrl = `http://localhost:3000`;
  const endpoint = `${baseUrl}/api/users/${userEmail}`;

  function getUser() {
    fetch(endpoint, {
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

  useEffect(() => {
    getUser();
  }, []);
  //If a user clicks on button to update photo without uploading a phot they'll get an alert
  const FormPicSubmitHandler = async (e) => {
    e.preventDefault();
    if (!profilePicture) {
      return alert("Must choose photo to update profile photo");
    }

    // Create a FormData object to send files
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("profilePicture", profilePicture);
    console.log(profilePicture);

    //updating user info with profile pic
    try {
      let user = data._id;

      const endpoint = `${baseUrl}/api/users/profilePic/${user}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        mode: "cors",
        body: formDataToSend,

        // Send FormData object
      });
      if (formDataToSend.has("profilePicture")) {
        console.log("Profile picture exists");
      } else {
        console.log("Profile picture does not exist");
      }
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.location.reload();
      } else {
        throw Error(`Error sending data to update user`);
      }
    } catch (err) {
      console.log("Error updating user in client", err);
    }
  };
  //to update username
  const FormUsernameSubmitHandler = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files

    let name;
    if (formData.name.trim() !== "") {
      name = formData.name;
    } else {
      return alert("To update, username cannot be empty");
    }
    try {
      let user = data._id;

      const endpoint = `${baseUrl}/api/users/username/${user}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },

        // Send FormData object
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.location.reload();
      } else {
        throw Error(`Error sending data to update user`);
      }
    } catch (err) {
      console.log("Error updating user in client", err);
    }
  };
  //to capture what's entered in input
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //to capture file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  // if user's not signed in, display message
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Must be logged in to see Profile</h1>
      </div>
    );
    // if user's signed in, display the user's profile
  } else if (isAuthenticated) {
    return (
      <div className="pageDiv">
        <Card className="userProfile">
          <div className="profileContainer">
            <div className="profileImageBackground">
              <Card.Img
                className="userProfileImg"
                src={data.picture}
                alt="your profile picture"
                variant="top"
              />
            </div>
            <Card.Body>
              <Card.Title className="profileTitle">
                {data.first}'s Profile
              </Card.Title>
              <div className="userInfoContainer">
                <Card.Text className="profileCategory">
                  Email: <span className="profileInfo">{data.email}</span>
                </Card.Text>
                <Card.Text className="profileCategory">
                  Current Username:{" "}
                  <span className="profileInfo">{data.name}</span>
                </Card.Text>
                {/* update username */}
                <form action="" onSubmit={FormUsernameSubmitHandler}>
                  <label htmlFor="name">
                    <h3 className="profileHeading">Username:</h3>
                  </label>
                  <input
                    className="profileInput"
                    name="name"
                    id="name"
                    type="text"
                    placeholder={data.name}
                    value={formData.name}
                    onChange={changeHandler}
                    // handle keypress events in input/get what's in the input
                  />
                  <Button className="userProfileButton" type="submit">
                    Update Username
                  </Button>
                </form>
                {/* update profile photo */}
                <form action="" onSubmit={FormPicSubmitHandler}>
                  <label htmlFor="profilePicture">
                    <h3 className="profileHeading">Change Profile Photo:</h3>
                  </label>
                  <input
                    className="profileInput"
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleFileChange}
                    // Handle file change
                  />
                  <Button className="userProfileButton" type="submit">
                    Update Profile Picture
                  </Button>
                </form>

                {/* <Button onClick={onClickHandler}>Delete Account</Button> */}
              </div>
            </Card.Body>
          </div>
        </Card>
      </div>
    );
  }
};

export default UserProfile;
