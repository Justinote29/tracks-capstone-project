const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tracksSchema = new mongoose.Schema({
	// email:{
	//     type: String,
	//     trim: true,
	//     lowercase: true,
	//     match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
	// },

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	first: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	last: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	username: {
		type: String,
		trim: true,
		lowercase: true,
		default: "testUser"
		// minLength: [4, "Must be at least 4 characters."],
		// unique: [true, "Sorry, that username is not available."],
	},
	location: {
		type: String
		//required: [true, "The address of your current location is required."]
	},
	title: {
		type: String,
		maxLength: [20, "Must be less than 20 characters."]
		//required: [true, "Must have a title."]
	},
	description: {
		type: String,
		maxLength: [50, "Must be less than 50 characters."],
		required: [true, "Must have a description."]
	},
	keywords: {
		type: String,
		maxLength: [20, "Must be less than 20 characters."]
	},
	createdOn: {
		type: Date,
		default: Date.now()
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = Tracks = mongoose.model("tracks", tracksSchema);
