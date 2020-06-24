const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: { type: String, max: 85 },
	text: { type: String },
	author: { type: Schema.Types.ObjectId, ref: "Parent" },
});

module.exports = mongoose.model("Article", articleSchema);
