const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
	type: { type: String, default: "Point" },
	coordinates: { type: [Number], index: "2dsphere" },
});

const eventSchema = new Schema({
	name: { type: String },
	geometry: GeoSchema,
	date: { type: Date },
	organizer: { type: Schema.Types.ObjectId, ref: "Parent" },
	age_group: { type: Array },
	description: { type: String },
	size: { type: Number },
	attending: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
});

module.exports = mongoose.model("Event", eventSchema);
