const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../config");
const { getRandom } = require("../utils");
const connectMySQL = require("../mysql/driver");
const { addUser, addToken } = require("../mysql/queries/account");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!password) {
    res.send({ status: 0, reason: "Missing passsword" });
    return;
  }

  if (!email) {
    res.send({ status: 0, reason: "Missing email" });
    return;
  }

  //hash password
  password = sha256(password + salt);

  //generate  token
  const token = getRandom();

  //insert user, password into the DB, catch error
  //adds token, auto
  try {
    const result = await connectMySQL(addUser, [email, password]);
    // await connectMySQL(addToken, [result.insertId, token]);
    res.send({ status: 1, email });
    return;
  } catch (e) {
    res.send({ status: 1, reason: "Duplicate user" });
  }
});

module.exports = router;
