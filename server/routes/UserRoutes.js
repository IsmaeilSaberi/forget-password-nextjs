const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserCtrl");

router.post("/add-user", UserCtrl.add_user);

router.post("/reset-password", UserCtrl.reset_password);

router.post("/new-password", UserCtrl.new_password);

module.exports = router;
