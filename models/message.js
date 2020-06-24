const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		text: { type: String },
		user: { type: Schema.Types.ObjectId, ref: "Parent" },
		sender: { type: Schema.Types.ObjectId, ref: "Parent" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
