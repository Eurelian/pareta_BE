const express = require("express");
const router = express.Router();
const authenticator = require("../utils/verifyToken");
const eventController = require("../controllers/eventController");

router.get("/", authenticator, eventController.events_all);

router.post("/subscribe", authenticator, eventController.events_subscribe);

module.exports = router;
