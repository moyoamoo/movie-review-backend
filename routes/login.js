const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const validator = require("validator");
const { getRandom } = require("../utils.js");
const connectMySQL = require("../mysql/driver.js");
const { findUser, addToken } = require("../mysql/queries/account");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!password) {
    return res.send({ status: 0, reason: "Missing passsword" });
  }

  if (!email) {
    return res.send({ status: 0, reason: "Missing email" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.send({ status: 0, reason: "Invalid Email" });
  }

  //hash password
  password = sha256(password + process.env.SALT);

  let results;

  //try and find user in database
  try {
    results = await connectMySQL(findUser, [email, password]);
  } catch (e) {
    res.send({ status: 0, reason: "Can't find user" });
    return;
  }

  if (results.length > 0) {
    const token = getRandom();

    try {
      await connectMySQL(addToken, [results[0].id, token]);
      res.send({ status: 1, token, email: results[0].email });
    } catch (e) {
      console.log(e);
      res.send({ status: 0, reason: "Can't login" });
      return;
    }
  } else {
    res.send({ status: 0, reason: "Incorrect Password or Email" });
  }
});

module.exports = router;
