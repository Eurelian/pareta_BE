const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");

const parentController = require("../controllers/parentController");

//Get User Data
//implemented
router.get("/", authenticator, parentController.parent_dashboard);

//Get One Parent
router.get("/parent/:id", authenticator, parentController.parent_get_one);

//User post interactions
//implemented
router.post("/posts", authenticator, parentController.parent_article_post);

router.delete("/posts", authenticator, parentController.parent_article_delete);
//implemented
router.get("/posts", authenticator, parentController.parent_created_articles);

//User Favorite Posts Interactions
//implemented
router.get(
	"/posts/favorite",
	authenticator,
	parentController.parent_favorite_article_list
);
//implemented
router.delete(
	"/posts/favorite",
	authenticator,
	parentController.parent_favorite_article_remove
);

//User Events Interactions
//implemented
router.post("/events", authenticator, parentController.parent_event_create);

router.delete(
	"/events/:id",
	authenticator,
	parentController.parent_event_unsubscribe
);

//implemented
router.get(
	"/events/subscribed",
	authenticator,
	parentController.parent_events_subscribed
);

router.get(
	"/events/subscribed/:id",
	authenticator,
	parentController.parent_is_subscribed
);

router.get(
	"/events/created",
	authenticator,
	parentController.parent_events_created
);

// USER MESSAGING INTERACTIONS

router.post(
	"/favorite-parent",
	authenticator,
	parentController.favorite_parent
);

router.get(
	"/favorite-parents",
	authenticator,
	parentController.favorite_parents
);

router.get(
	"/messages/received",
	authenticator,
	parentController.parent_messages_received
);

router.get(
	"/messages/sent",
	authenticator,
	parentController.parent_messages_sent
);

module.exports = router;
