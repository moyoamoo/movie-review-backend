const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const validator = require("validator");
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { updateEmail } = require("../../mysql/queries/account");

router.patch("/", checkUser, async (req, res) => {
  const { email } = req.body;
  let results;

  //validate req body
  if (!email) {
    return res.send({ status: 0, reason: "Missing Email" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.send({ status: 0, reason: "Invalid Email" });
  }

  try {
    results = await connectMySQL(updateEmail, [email, req.headers.token]);
    return res.send({ status: 1, reason: "Email Changed" });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, reason: "Failed to change email" });
  }
});

module.exports = router;
