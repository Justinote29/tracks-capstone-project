const mongoose = require("mongoose");

const tracksItemsSchema = new mongoose.Schema({
  // Reference the 'User' Collection, can get the data with using .populate while query the track collection
  // uses the mongoose.Schema.ObjectId type, which means it will store the MongoDB ObjectId of a user document from the 'User' collection. This establishes a reference to the 'User' collection.
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }], // Array of user that like the post
  lat: {
    type: Number,
    required: [true, "The latitude of your location are required"],
  },
  long: {
    type: Number,
    required: [true, "The longitude of your location are required"],
  },
  title: {
    type: String,
    maxLength: [20, "Must be less than 20 characters."],
    required: [true, "Must have a title."],
  },
  description: {
    type: String,
    maxLength: [50, "Must be less than 50 characters."],
  },
  //Comma separated values for keyword or hashtags?
  keywords: {
    type: String,
    maxLength: [20, "Must be less than 20 characters."],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  track: {
    data: String,
    // Not entirely sure how the mp3 or audio would be stored if uploading
    //Also would you want small selection of audio like install or tiktok - MVP would just be able to store audio at all
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("Tracks", tracksItemsSchema);
