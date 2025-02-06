const express = require("express");
const { getRSSData } = require("../controllers/rssController.js");
const router = express.Router();

router.get("/", getRSSData);

module.exports = router;
