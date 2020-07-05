const Parent = require("../models/parent");
const Article = require("../models/article");

//Get all articles
//implemented
exports.all_articles = async (req, res) => {
	try {
		let allArticles = await Article.find({}).populate("author");
		res.send(allArticles);
	} catch (err) {
		res.send(err);
	}
};

//Get preview articles
//implemented
exports.preview_articles = async (req, res) => {
	try {
		let preview = await Article.find({}).populate("author");
		res.send(preview);
	} catch (err) {
		res.send(err);
	}
};

//Get one article
//implemented
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
//implemented
exports.favorite_article = async (req, res) => {
	try {
		const { id } = req.body;
		const { _id } = req.user;
		const user = await Parent.findById(_id);
		const article = await Article.findById(id);
		const isArticle = user.articles_favorite.filter(
			(favorite_id) => favorite_id === article._id
		);
		if (isArticle.length < 1) return res.send("Article already favorited");

		user.articles_favorite.push(article._id);
		await user.save();
		res.send(`${article_name} added to your favorites list`);
	} catch (err) {
		res.send(err);
	}
};
