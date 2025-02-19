const express = require("express");
const router = express.Router();
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { deleteRating } = require("../../mysql/queries/ratings");

router.delete("/", checkUser, async (req, res) => {
  let { ratingId } = req.body;

  if (!ratingId) {
    return res.send({ status: 0, reason: "No rating Id" });
  }
  try {
    await connectMySQL(deleteRating, [ratingId, req.authUserID]);
    return res.send({ status: 1, reason: "Rating deleted" });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, reason: "Unable to delete rating" });
  }
});

module.exports = router;
