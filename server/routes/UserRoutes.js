const express = require("express");
const router = express();

const UserCtrl = require("../controllers/UserCtrl");

router.post("/add user", UserCtrl.add_user);

module.exports = router;
