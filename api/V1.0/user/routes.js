const express = require("express");
const { Router } = express;
const router = new Router();
const userController = require("./controller");
const {validateToken} =require("../../../utils/index")

router.get("/get-data", userController.getUser);
// router.post("/login", userController.submitData);
router.post("/file-handle", userController.getFiles);
router.post("/sign-up",userController.signUp);
router.post("/login", userController.login);
router.post("/profile", validateToken ,userController.submitProfile);
router.get("/get-data1", userController.getData);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword)

module.exports = router;
