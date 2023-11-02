//Belinda:  This is file Belinda is using to
//test her routes and database
// we can't see Justin's env file

//require dotenv at topmost as possible
require("dotenv").config();

//call mongoose
const mongoose = require("mongoose");

// get our "secret" info from dotenv config process
const { DB_URI } = process.env;

//connect db
mongoose
	.connect(DB_URI)
	.then(() => {
		console.log(`Connected to TRACKS database`);
	})
	.catch((err) => {
		console.log(`Error coming from TRACKS database`, err);
	});

//module.exports = connectDB;
