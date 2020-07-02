const express = require("express");
const routes = express.Router();
const authenticator = require("../utils/verifyToken");
const messageController = require("../controllers/messageController");

//Send Meessage
routes.post("/", authenticator, messageController.message_sent);

//Get Messages
routes.get("/", authenticator, messageController.message_get);

module.exports = routes;
