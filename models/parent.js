const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema({
	name: { type: String, min: 5, max: 255, require },
	email: { type: String, min: 5, max: 255, require },
	password: { type: String, min: 5, max: 255, require },
	parents_favorite: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
	articles_created: [{ type: Schema.Types.ObjectId, ref: "Article" }],
	articles_favorite: [{ type: Schema.Types.ObjectId, ref: "Article" }],
	events_created: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	events_subscribed: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	messages_sent: [{ type: Schema.Types.ObjectId, ref: "Message" }],
	messages_received: [{ type: Schema.Types.ObjectId, ref: "Message" }],
	messages_from: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
});

module.exports = mongoose.model("Parent", parentSchema);
