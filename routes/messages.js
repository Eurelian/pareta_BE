const express = require("express");
const routes = express.Router();
const authenticator = require("../utils/verifyToken");
const messageController = require("../controllers/messageController");

routes.post("/", authenticator, messageController.message_sent);

module.exports = routes;
