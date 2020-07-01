const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const articleController = require("../controllers/articleController");

//implemented
router.get("/", authenticator, articleController.all_articles);

//implemented
router.get("/preview", authenticator, articleController.preview_articles);

//implemented
router.get("/:id", authenticator, articleController.one_article);

//implemented
router.post("/favorite", authenticator, articleController.favorite_article);

module.exports = router;
