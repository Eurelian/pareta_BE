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

exports.messages_get = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id } = req.params;
		let data = [];

		Promise.all([
			await Parent.findById(_id, "messages_received").populate({
				path: "messages_received",
				populate: { path: "sender", select: { name: 1 } },
			}),
			await Parent.findById(_id, "messages_sent").populate({
				path: "messages_sent",
				populate: { path: "sender", select: { name: 1 } },
			}),
		]).then((results) => {
			const [received, sent] = results;
			const got = received.messages_received.filter(
				(item) => item.sender._id == id
			);
			const send = sent.messages_sent.filter((item) => item.user == id);

			const data = received.messages_received.concat(sent.messages_sent);
			const sorted = data.sort((a, b) => {
				return a.createdAt < b.createdAt
					? -1
					: a.createdAt > b.createdAt
					? 1
					: 0;
			});
			res.json(sorted);
		});

		// const mReceived = await Parent.findById(_id, "messages_received").populate({
		// 	path: "messages_received",
		// 	populate: { path: "sender", select: { name: 1 } },
		// });

		// const received = mReceived.messages_received.filter(
		// 	(item) => item.sender._id == id
		// );

		// const mSent = await Parent.findById(_id, "messages_sent")
		// 	.select({ sender: 1 })
		// 	.populate({
		// 		path: "messages_sent",
		// 		populate: { path: "sender", select: { name: 1 } },
		// 	});

		// const sent = mSent.messages_sent.filter((item) => item.user == id);
		// data.push(sent);
		// data.push(received);
		// res.json(data);
	} catch (err) {
		res.send(err);
	}
};
