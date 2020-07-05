const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: { type: String, max: 85, text: true },
	text: { type: String, text: true },
	author: { type: Schema.Types.ObjectId, ref: "Parent", text: true },
});

module.exports = mongoose.model("Article", articleSchema);
