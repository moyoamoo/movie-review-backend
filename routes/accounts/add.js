const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../config");
const validator = require("validator");
const { getRandom } = require("../../utils");
const connectMySQL = require("../../mysql/driver");
const { addUser, addToken } = require("../../mysql/queries/account");

router.post("/", async (req, res) => {
  let { email, password, username } = req.body;

  if (!password) {
    return res.send({ status: 0, reason: "Missing passsword" });
  }

  if(password.length < 4){
    return res.send({ status: 0, reason: "Password is too short" });
  }

  if (!email) {
    return res.send({ status: 0, reason: "Missing email" });
  }

  if (!username) {
    return res.send({ status: 0, reason: "Missing username" });
  }



  if (username.length < 4) {
    return res.send({ status: 0, reason: "Username is too short" });
  }

  if (username.length > 18) {
    return res.send({ status: 0, reason: "Username is too long" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.send({ status: 0, reason: "Invalid Email" });
  }

 
  //hash password
  password = sha256(password + salt);

  //generate  token
  const token = getRandom();

  //insert user, password into the DB, catch error
  //adds token, auto
  try {
    const result = await connectMySQL(addUser, [email, username, password]);
    // await connectMySQL(addToken, [result.insertId, token]);
    res.send({ status: 1, email, username });
    return;
  } catch (e) {
    res.send({ status: 1, reason: "Duplicate user" });
  }
});

module.exports = router;
