const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const validator = require("validator");
const { salt } = require("../../config.js");
const { getRandom } = require("../../utils.js");
const connectMySQL = require("../../mysql/driver.js");
const { findUser, addToken } = require("../../mysql/queries/account.js");

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
  password = sha256(password + salt);

  let results;

  //try and find user in database
  try {
    results = await connectMySQL(findUser, [email, password]);
  } catch (e) {
    return res.send({ status: 0, reason: "Can't find user" });
  }

  if (results.length > 0) {
    const token = getRandom();

    try {
      await connectMySQL(addToken, [results[0].id, token]);
      console.log(results);
      res.send({
        status: 1,
        token,
        email: results[0].email,
        username: results[0].username,
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, reason: "Can't login" });
    }
  } else {
    return res.send({ status: 0, reason: "Incorrect Password or Email" });
  }
});

module.exports = router;
