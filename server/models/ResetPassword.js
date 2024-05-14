const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  token: {
    required: true,
    type: String,
  },
  expire_time: {
    required: true,
    type: String,
    expires: 118,
  },
});
module.exports = mongoose.model("ResetPassword", ResetPasswordSchema);
