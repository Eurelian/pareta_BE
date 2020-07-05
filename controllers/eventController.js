const Event = require("../models/event");
const Parent = require("../models/parent");

//implemented
//Get All EVENTS
exports.events_all = async (req, res) => {
	try {
		let allEvents = await Event.find({})
			.populate("organizer", "name")
			.populate("attending");

		res.json(allEvents);
	} catch (err) {
		res.send(err);
	}
};

//implemented
//Get One Event
exports.event_one = async (req, res) => {
	try {
		const { id } = req.params;
		let oneEvent = await Event.findById(id)
			.populate("organizer")
			.populate("attending");
		res.send(oneEvent);
	} catch (err) {
		res.send(err);
	}
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

//DELETE EVENT
exports.events_delete = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id } = req.params;
		await Parent.findById(_id).updateOne({
			$pullAll: { events_created: [id] },
		});
		await Event.deleteOne(id);

		const created = await Parent.findById(_id, "events_created").populate(
			"events_created"
		);
		res.send(created);
	} catch (err) {
		res.send(err);
	}
};

//Search for EVENTS
exports.search_events = async (req, res) => {
	try {
		const { query } = req.body;
		if (!query) {
			let allEvents = await Event.find({}).populate("organizer");
			res.send(allEvents);
		}
		let events = await Event.find({ $text: { $search: query } }).populate(
			"organizer"
		);
		res.send(events);
	} catch (err) {
		res.send(err);
	}
};
