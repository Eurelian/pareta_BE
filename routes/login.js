const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController");

router.post("/", parentController.parent_login);

module.exports = router;
