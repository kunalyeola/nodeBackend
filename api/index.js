const express = require("express");
const { Router } = express;
const router = new Router();

router.use("/V1.0", require("./V1.0"));

router.get("/", (req, res) => {
  res.send("Hello GET API");
});

module.exports = router;
