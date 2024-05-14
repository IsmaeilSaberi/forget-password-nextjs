const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserCtrl");

router.post("/add-user", UserCtrl.add_user);

router.post("/reset-password", UserCtrl.reset_password);

module.exports = router;
