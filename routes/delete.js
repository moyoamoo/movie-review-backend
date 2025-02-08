const express = require("express");
const router = express.Router();
const { checkUser } = require("../middleware");
const connectMySQL = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries/account");

router.delete("/", checkUser, async (req, res) => {
  let results;
  try {
    results = await connectMySQL(deleteUser, req.headers.token);
    return res.send({ status: 1, reason: "User account deleted" });
  } catch (e) {
    return res.send({ status: 0, reason: "User account failed to be deleted" });
  }
});

module.exports = router;
