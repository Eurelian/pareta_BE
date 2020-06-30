const Event = require("../models/event");
const Parent = require("../models/parent");

//Get All EVENTS
exports.events_all = async (req, res) => {
	let allEvents = await Event.find({}).populate("organizer");
	res.json(allEvents);
};

//Get One Event
exports.event_one = async (req, res) => {
	const { id } = req.params;
	let oneEvent = await Event.findById(id);
	res.json(oneEvent);
};

//SUBSCRIBE PARENT TO EVENT
exports.events_subscribe = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;
	try {
		const user = await Parent.findById(_id);
		const event = await Event.findById(id);

		event.attending.push(user._id);
		user.events_subscribed.push(event._id);
		await event.save();
		await user.save();
		res.send(`${user.name} has subscribed to ${event.name}`);
	} catch (err) {
		res.send(err);
	}
};
