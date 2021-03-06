const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const authUser = require('../middleware/authUser');
const multer = require("../middleware/multer");

router.post("/signup", authUser.checkUsername, authUser.validation, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/accounts", userCtrl.getAllUsers);
router.get("/accounts/:id", auth, userCtrl.getAccount);
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount);
router.delete('/accounts/:id', auth, userCtrl.deleteUser);

module.exports = router;