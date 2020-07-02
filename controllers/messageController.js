const Message = require("../models/message");
const Parent = require("../models/parent");

//MESSAGE SENDING
exports.message_sent = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id, text } = req.body;
		if (!text) res.status(400).send("Message can't be blank");

		const user = await Parent.findById(id);
		const sender = await Parent.findById(_id);

		const message = new Message({
			text: text,
			user: id,
			sender: _id,
		});

		user.messages_received.push(message._id);
		if (!user.messages_from.includes(sender._id))
			user.messages_from.push(sender._id);

		sender.messages_sent.push(message._id);
		await message.save();
		await user.save();
		await sender.save();
		res.json(`Message Succesfully Sent to ${user.name} `);
	} catch (err) {
		res.send(err);
	}
};

//GET CURRENT CONVERSATION DATA

exports.message_get = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id } = req.body;

		const messages = await Parent.findById(_id, "messages_received").populate({
			path: "messages_received",
			populate: { path: "sender" },
		});

		const received = messages.messages_received.filter(
			(item) => item.sender._id == id
		);

		if (received) await res.send(received);
	} catch (err) {
		res.send(err);
	}
};
