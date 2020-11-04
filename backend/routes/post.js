const router = require("express").Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");

router.post("/add", auth, multer, postCtrl.createPost);


module.exports = router;