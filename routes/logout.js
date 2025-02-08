const express = require("express");
const router = express.Router();
const { checkUser } = require("../middleware");
const connectMySQL = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries/account");

router.delete("/", checkUser, async (req, res) => {
  console.log(deleteToken);
  try {
    await connectMySQL(deleteToken, [req.headers.token]);
    return res.send({ status: 1, reason: "User Logged out" });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, reason: "User not logged out" });
  }
});

module.exports = router;
