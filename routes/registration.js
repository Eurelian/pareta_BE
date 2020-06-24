const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController");

router.get("/", (req, res) => res.send("ola campuione"));

router.post("/", parentController.parent_register);

module.exports = router;
