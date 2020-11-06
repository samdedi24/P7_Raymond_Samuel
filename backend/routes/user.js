const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const authUser = require('../middleware/authUser');

router.post("/signup", authUser.checkUsername, authUser.validation, userCtrl.signup);
router.post("/login", authUser.validation, userCtrl.login);
router.get("/accounts", userCtrl.getAllUsers);
router.get("/accounts/:id", userCtrl.getAccount);
router.delete('/accounts/:id', auth, userCtrl.deleteUser);

module.exports = router;