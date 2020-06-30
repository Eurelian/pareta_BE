const Parent = require("../models/parent");
const Article = require("../models/article");

//Get all articles
exports.all_articles = async (req, res) => {
	try {
		let allArticles = await Article.find({}).populate("author");
		res.send(allArticles);
	} catch (err) {
		res.send(err);
	}
};

//Get preview articles
exports.preview_articles = async (req, res) => {
	try {
		let allArticles = await Article.find({}).populate("author");
		res.send(allArticles);
	} catch (err) {
		res.send(err);
	}
};

//Get one article
exports.one_article = async (req, res) => {
	try {
		const { id } = req.params;
		let article = await Article.findById(id).populate("author");
		res.send(article);
	} catch (err) {
		res.send(err);
	}
};

//Favorite an article
exports.favorite_article = async (req, res) => {
	const { article_name } = req.params;
	const { _id } = req.user;
	const { id } = req.body;
	const user = await Parent.findById(_id);
	const article = await Article.findById(id);
	user.articles_favorite.push(article._id);
	await user.save();
	res.json(`${article_name} added to your favorites list`);
};
