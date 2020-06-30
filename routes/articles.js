const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const articleController = require("../controllers/articleController");

router.get("/", authenticator, articleController.all_articles);

router.get("/preview", authenticator, articleController.preview_articles);

router.post(
	"/:article_name",
	authenticator,
	articleController.favorite_article
);

module.exports = router;
