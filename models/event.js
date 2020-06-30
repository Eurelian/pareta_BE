const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const GeoSchema = new Schema({
// 	type: {
// 		type: String,
// 		enum: ["Point"],
// 		// required: true,
// 	},
// 	coordinates: {
// 		type: [Number],
// 		index: "2dsphere",
// 	},
// });

const EventSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please add an event name"],
		unique: true,
		trim: true,
	},

	geometry: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
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

// //Geocode & create location

// EventSchema.pre("save", async (next) => {
// 	try {
// 		const loc = await this.address;
// 		console.log(loc);
// 	} catch (err) {
// 		console.log(err);
// 	}
// 	// const loc = await EventSchema.address;

// 	// this.location = {
// 	// 	type: "Point",
// 	// 	coordinates: [loc[0].longitude, loc[0].latitude],
// 	// 	formattedAddress: loc[0].formattedAddress,
// 	// };
// 	// this.address = undefined;
// 	// next();
// });

module.exports = mongoose.model("Event", EventSchema);
