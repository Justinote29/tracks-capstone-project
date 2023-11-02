const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this really should get merged with profile or posts/tracks

// if a user deletes their account, 
// do we delete all their comments and like?


const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
	],
		following: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
		followers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
});


module.exports = Profile = mongoose.model("profile", profileSchema);
