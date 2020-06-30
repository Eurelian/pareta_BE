const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const articleController = require("../controllers/articleController");

//done
router.get("/", authenticator, articleController.all_articles);

//done
router.get("/preview", authenticator, articleController.preview_articles);

//done
router.get("/:id", authenticator, articleController.one_article);

router.post("/favorite", authenticator, articleController.favorite_article);

module.exports = router;
