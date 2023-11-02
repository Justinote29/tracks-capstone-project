import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import AudioRecorder from "./audioRecorder";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/createTrack.css";

const CreateTrack = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  let userEmail = user.email;

  //state to show loading indicator to user after creating a track
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://tracks-6983b3e8a59b.herokuapp.com";
  const endpoint = `${baseUrl}/api/tracks`;
  //state variables.  audioUrl is passed as props to the audioRecorder child component so we can pull the audioBlob into this component to then send to the backend.
  const [audioUrl, setAudioUrl] = useState(null);
  const [coordinates, setCoordinates] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  //state to store userData
  const [data, setData] = useState({});

  //function to grab the user info.
  function getUser() {
    const endpoint = `${baseUrl}/api/users/${userEmail}`;

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
  //we run the getUser() function with useEffect hook and give it an empty array as the second argument so it runs when the page is initially rendered and not on every rerender.
  useEffect(() => {
    getUser();
    console.log(data);
  }, []);

  //this will take the audioBlob we get from the audioRecorder to set the AudioUrl
  const updateAudioUrl = (newAudioUrl) => {
    setAudioUrl(newAudioUrl);
  };
  //This useEffect hook will submit the form once we have the coordinates.  Before it was submitting before we got the coordinates from the GetCoords function and we needed to submit twice.
  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      submitForm();
    }
  }, [coordinates]);

  //Grabs the coordinates and uses the state variables to set them.
  const GetCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  //Takes what is entered in the inputs and uses the formData state variables to save them to formData.
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formData.title.length > 20) {
      return alert("Title must be less than 20 characters");
    }
    if (formData.description.length > 50) {
      return alert("Description must be less than 50 characters");
    }
  };

  //declare this outside of the submitForm so we can append the user email as postedBy first.
  const formDataForUpload = new FormData();

  //we take the audioblob and save it to a file.  This is called after the GetCoords has the lat/long in the useEffect.
  const submitForm = async () => {
    const audioblob = await fetch(audioUrl).then((r) => r.blob());
    const audioFile = new File([audioblob], "track.mp4", {
      type: "audio/mp4",
    });

    //prepares the data for upload, we use the FormData() constructor to make a new instance and append the formData plus the audioFile and the lat/long coordinates to send to back end.  We need to do it this way b/c of the audioFile.
    formDataForUpload.append("title", formData.title);
    formDataForUpload.append("description", formData.description);
    formDataForUpload.append("lat", coordinates.latitude);
    formDataForUpload.append("long", coordinates.longitude);
    formDataForUpload.append("audioFile", audioFile);
    formDataForUpload.append("postedBy", data._id);

    // formDataForUpload.append("postedBy", user.email);

    //We send the data to the backend.  We can't stringify it b/c of the audioFile.

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formDataForUpload,
      });

      if (response.ok) {
        console.log("audioFile", audioFile);
        console.log(formDataForUpload);
        const data = await response.json();
        console.log(data);

        navigate("/MyTracks");
      } else {
        throw Error(`Error with fetch`);
      }
    } catch (error) {
      console.log("Error coming from API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Prevents the default submit behavior and calls the GetCoords function, which takes a bit of time (async).  The rest of the submit work is done in the submitForm.
  const FormSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    GetCoords();
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Must be logged in to Create a Track</h1>
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <div className="pageDiv">
        <div className="createTrack">
          {/* <img src="/Tracks_Foot_Lockup_01.png" alt="" /> */}
          <Card className="createTrackCard">
            <h1 className="createHeading">Create a Track</h1>
            <form
              action=""
              onSubmit={FormSubmitHandler}
              encType="multipart/form-data"
            >
              <div>
                <label htmlFor="title">
                  <h5>Title:</h5>
                </label>
                <textarea
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label htmlFor="description">
                  <h5>Description:</h5>
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={changeHandler}
                  placeholder="optional"
                />
              </div>

              <AudioRecorder updateAudioUrl={updateAudioUrl} />
              <Button
                className="createButton"
                // variant="info"
                type="submit"
                aria-label="Create Track"
                disabled={isLoading} // Disable the button while loading
              ></Button>
              <h5>{isLoading ? "Creating Track..." : ""}</h5>
            </form>
          </Card>
          {/* <img src="/Tracks_Foot_Lockup_01.png" alt="" /> */}
        </div>
      </div>
    );
  }
};

export default CreateTrack;
