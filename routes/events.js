const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const eventController = require("../controllers/eventController");

router.get("/", authenticator, eventController.events_all);
router.get("/:id", authenticator, eventController.event_one);
router.post("/subscribe", authenticator, eventController.events_subscribe);
router.delete("/:id", authenticator, eventController.events_delete);

module.exports = router;
