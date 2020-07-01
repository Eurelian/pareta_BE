const Parent = require("../models/parent");
const Article = require("../models/article");
const Event = require("../models/event");
const Message = require("../models/message");
const schema = require("../utils/registerValidate");
const bcrypt = require("bcrypt");
const validation = require("../utils/loginValidate");
const eventValidation = require("../utils/eventValidate");
const jwt = require("jsonwebtoken");
const { favorite_article } = require("./articleController");

// PARENT REGISTRATION
exports.parent_register = async (req, res) => {
	const { name, email, password } = req.body;

	const { error } = schema.validate(req.body);
	if (error) res.send(error.details[0].message);

	const emailExist = await Parent.findOne({ email: email });
	if (emailExist) return res.status(400).send("E-mail address already exists.");

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const parent = new Parent({
		name: name,
		email: email,
		password: hashedPassword,
	});

	try {
		const savedParent = await parent.save();
		res.send(savedParent);
	} catch (err) {
		res.status(400).send("Invalid Request");
	}
};

//PARENT LOGIN
exports.parent_login = async (req, res) => {
	const { email, password } = req.body;

	const { error } = validation.validate(req.body);
	if (error) res.status(403).send(error.details[0].message);

	const user = await Parent.findOne({ email: email });
	if (!user) return res.status(400).send("Wrong e-mail address.");

	const passwordCheck = await bcrypt.compare(password, user.password);
	if (!passwordCheck) return res.status(400).send("Wrong password");

	const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
	res.header("auth-token", token).send(token);
};

//#####
//PARENT DASHBOARD ACTION LIST
//#####

//#####
//PARENT DATA FETCHING
exports.parent_dashboard = async (req, res) => {
	try {
		const { _id } = req.user;
		const data = await Parent.findById(_id)
			.populate("events_created")
			.populate("events_subscribed");
		// .populate("articles_created")
		// .populate("articles_favorite")
		// .populate("messages_from")
		// .populate("messages_received")
		// .populate("messages_sent")
		// .popuplate("parents_favorite");
		await res.send(data);
	} catch (err) {
		res.send(err);
	}
};

//#####
//ARTICLE CREATION MANAGEMENT
//#####

//PARENT CREATED_ARTICLES_GET
exports.parent_created_articles = async (req, res) => {
	const { _id } = req.user;
	const parent = await Parent.findById(_id).populate("articles_created");
	res.json(parent);
};

//implemented
//PARENT ARTICLE_CREATE
exports.parent_article_post = async (req, res) => {
	try {
		const { title, text } = req.body;
		const { _id } = req.user;
		let user = await Parent.findById(_id);
		const post = new Article({
			title: title,
			text: text,
			author: _id,
		});

		user.articles_created.push(post._id);
		await user.save();
		await post.save();
		res.send("Article succesfully submitted");
	} catch (err) {
		res.send(err);
	}
};

//PARENT Created_ARTICLE_DELETE
exports.parent_article_delete = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;

	await Parent.findById(_id).updateOne({
		$pullAll: { articles_created: [id], articles_favorited: [id] },
	});
	await Article.findByIdAndDelete(id);
	res.json("Article successfully Deleted");
};

//#####
//FAVORITE ARTICLES MANAGEMENT
//#####

//PARENT FAVORITE ARTICLES LIST
exports.parent_favorite_article_list = async (req, res) => {
	try {
		const { _id } = req.user;
		const parent = await Parent.findById(_id, "articles_favorite").populate();
		res.send(parent);
	} catch (err) {
		res.send(err);
	}
};

//PARENT DELETE FAVORITE FROM LIST
exports.parent_favorite_article_remove = async (req, res) => {
	try {
		const { _id } = req.user;
		const { id } = req.body;

		await Parent.findById(_id).updateOne({
			$pullAll: { articles_favorite: [id] },
		});

		res.send("Article Removed from Favorites");
	} catch (err) {
		res.send(err);
	}
};

//#####
//PARENT EVENTS MANAGEMENT
//#####

//EVENT CREATION
exports.parent_event_create = async (req, res) => {
	const { _id } = req.user;
	const { name, geometry, date, age_group, description, size } = req.body;
	// const { error } = eventValidation.validate(req.body);
	// if (error) res.status(403).send(error.details[0].message);

	try {
		const user = await Parent.findById(_id);
		const event = await new Event({
			name: name,
			geometry: geometry,
			date: date,
			age_group: age_group,
			description: description,
			size: size,
			organizer: user._id,
		});
		user.events_created.push(event._id);
		await user.save();
		await event.save();
		res.send(event);
	} catch (err) {
		res.send(err);
	}
};

//UNSUBSCRIBE FROM EVENT
exports.parent_event_unsubscribe = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;

	await Parent.findById(_id).updateOne({
		$pullAll: { events_subscribed: [id] },
	});
	await Event.findById(id).updateOne({ $pullAll: { attending: [_id] } });
	res.json("Unsubscribed");
};

//SUBSCRIBED EVENTS LISTING
exports.parent_events_subscribed = async (req, res) => {
	const { _id } = req.user;

	const subscribed = await Parent.findById(_id).populate("events_subscribed");
	res.send(subscribed);
};

//CREATED EVENTS lISTING
exports.parent_events_created = async (req, res) => {
	const { _id } = req.user;
	const events = await Parent.findById(_id).populate("events_created");
	res.send(events);
};

//#####
//PARENT MESSAGE MANAGEMENT
//#####

//SEE ALL USERS THAT SENT MESSAGES TO USER

//SEE ALL MESSSAGES SENT FROM A SPECIFIC USER
exports.parent_messages_received = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;
	const messages = await Parent.findById(_id).populate("messages_received");
	const received = messages.messages_received.filter((m) => m.sender == id);

	res.json(received);
	// res.send(users);
};

//SEE ALL MESSSAGES SENT TO A SPECIFIC USER

exports.parent_messages_sent = async (req, res) => {
	const { _id } = req.user;
	const { id } = req.body;
	const messages = await Parent.findById(_id).populate("messages_sent");
	const sent = messages.messages_sent.filter((m) => m.user == id);
	res.json(sent);
	// res.send(users);
};
