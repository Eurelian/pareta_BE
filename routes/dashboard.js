const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");

const parentController = require("../controllers/parentController");

//Get User Data
router.get("/", authenticator, parentController.parent_dashboard);

//User post interactions
router.post("/posts", authenticator, parentController.parent_article_post);

router.delete("/posts", authenticator, parentController.parent_article_delete);

router.get("/posts", authenticator, parentController.parent_created_articles);

//User Favorite Posts Interactions
router.get(
	"/posts/favorite",
	authenticator,
	parentController.parent_favorite_article_list
);

router.delete(
	"/posts/favorite",
	authenticator,
	parentController.parent_favorite_article_remove
);

//User Events Interactions
router.post("/events", authenticator, parentController.parent_event_create);

router.delete(
	"/events",
	authenticator,
	parentController.parent_event_unsubscribe
);

router.get(
	"/events/subscribed",
	authenticator,
	parentController.parent_events_subscribed
);
router.get(
	"/events/created",
	authenticator,
	parentController.parent_events_created
);

module.exports = router;
