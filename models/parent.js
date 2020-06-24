const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema({
	name: { type: String, min: 5, max: 255, require },
	email: { type: String, min: 5, max: 255, require },
	password: { type: String, min: 5, max: 255, require },
	parents_favorite: { type: Array },
	articles_created: [{ type: Schema.Types.ObjectId, ref: "Article" }],
	articles_favorite: [{ type: Schema.Types.ObjectId, ref: "Article" }],
	events_created: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	events_subscribed: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	messages_sent: { type: Array },
	messages_received: { type: Array },
});

module.exports = mongoose.model("Parent", parentSchema);
