const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const articleController = require("../controllers/articleController");

router.get("/", authenticator, articleController.all_articles);

router.get("/preview", authenticator, articleController.preview_articles);

router.get("/:id", authenticator, articleController.one_article);

router.post("/:id", authenticator, articleController.favorite_article);

module.exports = router;
