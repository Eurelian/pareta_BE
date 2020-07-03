const Event = require("../models/event");
const Parent = require("../models/parent");

//implemented
//Get All EVENTS
exports.events_all = async (req, res) => {
	let allEvents = await Event.find({})
		.populate("organizer")
		.populate("attending");
	res.json(allEvents);
};

//implemented
//Get One Event
exports.event_one = async (req, res) => {
	const { id } = req.params;
	let oneEvent = await Event.findById(id);
	res.json(oneEvent);
};

//implemented
//SUBSCRIBE PARENT TO EVENT
exports.events_subscribe = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id } = req.body;
		const user = await Parent.findById(_id);
		const event = await Event.findById(id);

		if (user.events_subscribed.lenght > 7)
			res
				.status(403)
				.send("You can only attend a maximum of 8 events at a time");
		if (event.attending.includes(user._id))
			res.status(403).send("You are Already Subscribed to this Event.");

		event.attending.push(user._id);
		user.events_subscribed.push(event._id);

		const subscribed = await Parent.findById(_id, "events_subscribed").populate(
			"events_subscribed"
		);
		await event.save();
		await user.save();
		res.send(
			subscribed
			// `You are now Subscribed to ${event.name.slice(0, 30)}...`
		);
	} catch (err) {
		res.send(err);
	}
};
