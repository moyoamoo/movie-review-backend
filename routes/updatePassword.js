const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { checkUser } = require("../middleware");
const connectMySQL = require("../mysql/driver");
const { updatePassword } = require("../mysql/queries/account");

router.patch("/", checkUser, async (req, res) => {
  const { password } = req.body;
  let results;

  if (!password) {
    return res.send({ status: 0, reason: "Missing password" });
  }

  let hashedPassword = sha256(password + process.env.SALT);

  try {
    results = await connectMySQL(updatePassword, [
      hashedPassword,
      req.headers.token,
    ]);
    return res.send({ status: 1, reason: "Password Changed" });
  } catch (e) {
    return res.send({ status: 0, reason: "Failed to chnage password" });
  }
});

module.exports = router;
