const express = require("express");
const { Router } = express;
const router = new Router();
const Web3Controller = require("./controller");

router.get("/event", Web3Controller.getAllEvent);

module.exports = router;
