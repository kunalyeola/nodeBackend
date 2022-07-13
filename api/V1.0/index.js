const express = require("express");
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  res.send("Hello v1.0 GET API");
});

router.use("/user", require("./user/routes"));
router.use("/web3", require("./web3/routes"));
// router.use("/hospital", require("./hospital/routes"));
module.exports = router;
