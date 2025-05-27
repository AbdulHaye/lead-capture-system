const express = require("express");
const router = express.Router();
const { createLead } = require("../controllers/leadsController");

router.post("/", createLead);

module.exports = router;
