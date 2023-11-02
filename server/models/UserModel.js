const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    trim: true,
    // required: "Name is required"
    //May have to be like....
    // required: [true, 'Name is required']
  },
  last: {
    type: String,
    trim: true,
    // required: "Name is required"
    //May have to be like....
    // required: [true, 'Name is required']
  },
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: true,
    // enforces uniqueness for the indexed fields
    unique: true,
    //May have to be done like so
    //unique: [true, 'Email is required]
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://tracks-audio.s3.amazonaws.com/tracksLogos/Tracks_Foot_Circle_01.png",
  },
  password: {
    type: String,
    //required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Tracks" }], // Array [{}, {}]
  //Same ideas as likes
  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
