const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: {
		type: String,
		text: true,
	},

	geometry: {
		type: {
			type: String,
			default: "Point",
			// required: true,
		},
		coordinates: {
			type: [Number],
			index: "2dsphere",
		},
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	date: { type: Date },
	organizer: { type: Schema.Types.ObjectId, ref: "Parent" },
	age_group: { type: Array },
	description: { type: String },
	size: { type: Number },
	attending: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
});

module.exports = mongoose.model("Event", EventSchema);
