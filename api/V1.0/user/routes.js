const express = require("express");
const { Router } = express;
const router = new Router();
const userController = require("./controller");

router.get("/get-data", userController.getUser);
router.post("/login", userController.submitData);
router.post("/file-handle", userController.getFiles);
router.post("/sign-up",userController.signUp);
router.get("/get-data1", userController.getData);

module.exports = router;
