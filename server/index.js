require("dotenv").config();
const cors = require("cors");
const express = require("express");

//const { tracksItemsModel } = require("./models/tracksItemsModel");
const app = express();
const PORT = process.env.PORT || 3000;
const AWS = require("aws-sdk");
const multer = require("multer");

//BODY PARSER- lets us pull data out of req.body-
//We need this to get data in req.body in a POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//1)Connection- in mongoconnection.js, this pulls ALL code from mongoconnection and inserts it into the file.
require("./connections/mongoconnection");

//TODO Import our TracksModel from the models folder
app.use(cors());

// Configure Multer to specify where to store uploaded files

const storage = multer.memoryStorage(); // Store files in memory, not on disk

const upload = multer({ storage: storage });

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

// brings in aws-sdk library
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});
//Middleware
app.use(express.json()); //lets us pull data out of req.body- We need this for POST requests because they are send req.body-
app.use(express.urlencoded({ extended: false }));

//1)Connection- in mongoconnection.js, this pulls ALL code from mongoconnection and inserts it into the file.
require("./connections/mongoconnection");

//Import Models
const User = require("./models/UserModel"); //Bring in userModel
const Tracks = require("./models/tracksItemsModel"); //Bring in Post Model

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.send("I am Home");
});

//Routes- in case we want to split up the routes into diff files
//We can implement something like this
// app.use("/users", require("./routes/api/users"));
// app.use("/auth", require("./routes/api/auth"));
// app.use("/profile", require("./routes/api/profile"));
// app.use("/tracks", require("./routes/api/tracks"));

//TODO Build the following Routes
// Create - Create User Route
app.post("/api/user", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const { first, last, email, name, picture } = req.body;

  //Check to make sure there are values
  if (name && email) {
    const newUser = new User({ first, last, email, name, picture });

    newUser
      .save()
      .then((createdUser) => {
        res.status(200).json(createdUser); //Show the receipt the newlyCreated user
      })
      //Handle the sad case
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
      });
  }
});

//Read - Get ALL Users
app.get("/api/users", async (req, res) => {
  try {
    // Query the database to get all users
    const users = await User.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Read - Get ONE User - This idea/pattern Could be used to Update profile or delete user
app.get("/api/users/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Query the database to find the user by their email
    const user = await User.findOne({ email: `${userEmail}` });

    if (!user) {
      // If no user with that id is found
      return res.status(404).json({ error: "User not found" });
    }
    // Respond with the user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//multer storage for profilePic (separate from audio)
const profilePicUpload = multer({ storage: storage });
// Update user Profile pic
app.put(
  "/api/users/profilePic/:userId",
  profilePicUpload.single("profilePicture"),
  async (req, res) => {
    try {
      // Set CORS headers
      res.set("Access-Control-Allow-Origin", "*");

      // Get the uploaded profile picture
      const profilePicture = req.file;
      console.log(profilePicture);

      // Pull name out of the request body
      const { name } = req.body;

      // Check if a profile picture is uploaded
      if (profilePicture) {
        // Define S3 upload parameters
        const s3ProfilePicParams = {
          Bucket: "tracks-audio",
          Key: `/userProfilePics/${Date.now()}${profilePicture.originalname}`, // Set S3 key to a desired location
          Body: profilePicture.buffer,
        };

        // Upload the profile picture to S3
        s3.upload(s3ProfilePicParams, async (err, data) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to upload profile picture to S3" });
          }

          // S3 upload was successful, get the S3 object URL
          const s3ProfilePicUrl = data.Location;
          console.log(data);

          try {
            // Get userId from params
            const { userId } = req.params;

            // Update user in the database, query by userId, and update name and profile picture URL
            const user = await User.findByIdAndUpdate(
              userId,
              {
                $set: { picture: s3ProfilePicUrl },
              },
              {
                new: true,
              }
            );

            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error updating User" });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// update username
app.put("/api/users/username/:userId", async (req, res) => {
  console.log(req.body);
  try {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");

    // Pull name out of the request body
    const { name } = req.body;

    // Get userId from params
    const { userId } = req.params;

    // Update user in the database, query by userId, and update name
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { name: name },
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error updating User" });
  }
});

//============= DELETE USER ==================//
//delete user
app.delete("/api/users/:userId", async (req, res) => {
  try {
    //pull out userId from params
    const { userId } = req.params;
    //communicate to db that we want to delete one user, with the _id of userId
    const user = await User.deleteOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting User" });
  }
});

//=============== TRACKS ROUTES ===============//

//TODO convert wav files to mp3 b/c wav is causing issues on iphone

// Create - Create a Post (Track)  //upload.single("file")
app.post("/api/tracks", upload.single("audioFile"), async (req, res) => {
  try {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");

    // Get the uploaded audio file
    const audioFile = req.file;

    // Check if the audio file exists
    if (!audioFile) {
      return res.status(400).json({ error: "Audio file is missing" });
    }

    // Define parameters for uploading to S3

    const s3Params = {
      Bucket: "tracks-audio",
      Key: `audio/${Date.now()}${audioFile.originalname}`, // Set S3 key to a desired location
      Body: audioFile.buffer,
      ContentType: "audio/mp4",
    };

    // Upload the audio file to S3
    s3.upload(s3Params, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload to S3" });
      }

      // S3 upload was successful, return the S3 object URL
      const s3Url = data.Location;
      console.log(data);

      try {
        const { postedBy, title, description, keywords, track, lat, long } =
          req.body;

        // Create a new track item document with the S3 URL
        const newTrackItem = new Tracks({
          postedBy,
          lat,
          long,
          title,
          description,
          keywords,
          track,
          file: s3Url,
        });

        try {
          // Save the new track item to the database
          const savedTrackItem = await newTrackItem.save();
          res.status(201).json(savedTrackItem); // Respond with the newly created track item
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Read - Read tracks for a user
app.get("/api/tracks/user/:userId", async (req, res) => {
  try {
    const tracks = await Tracks.find({ postedBy: req.params.userId });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read - Read ALL tracks in DB
app.get("/api/tracks", (req, res) => {
  Tracks.find({ isDeleted: false })
    .populate("postedBy")
    .then((results) => {
      console.log(results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error - Cannot Read DB" });
    });
});

//Delete a track

app.delete("/api/tracks/user/:trackId", async (req, res) => {
  try {
    //pull out trackId from params
    const { trackId } = req.params;
    //communicate to db that we want to delete a track, with the _id of trackId
    const tracks = await Tracks.deleteOne({ _id: trackId });

    if (!tracks) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting Track" });
  }
});

//Update a track

app.put("/api/tracks/user/:trackId", async (req, res) => {
  try {
    //pull out trackId from params
    const { title, description } = req.body;
    const { trackId } = req.params;
    //communicate to db that we want to update a track, with the _id of trackId and we pass it the items we want to update.
    const tracks = await Tracks.updateOne(
      { _id: trackId },
      {
        $set: { title: title, description: description },
      }
    );

    if (!tracks) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error updating Track" });
  }
});

// Read tracks from current users location - nearMe - Method: Get Route: /api/tracks/nearMe - req.query ?lat=23423&long=234234 or req.body
// Like a post  Method: PUT route /api/track/:trackId/user/:userId
// Unlike a post
// Follow a user
// Unfollow a user
// Edit a post

app.listen(PORT, () => {
  console.log(`TRACKS Server running on Port: ${PORT}`);
});
