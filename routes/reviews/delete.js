const express = require("express");
const router = express.Router();
const { checkUser } = require("../../middleware");
const connectMySQL = require("../../mysql/driver");
const { deleteReview } = require("../../mysql/queries/reviews");

router.delete("/", checkUser, async (req, res) => {
  let { reviewId } = req.body;

  if (!reviewId) {
    return res.send({ status: 0, reason: "No review Id" });
  }
  console.log(deleteReview);
  try {
    await connectMySQL(deleteReview, [reviewId, req.authUserID]);
    return res.send({ status: 1, reason: "Review deleted" });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, reason: "Unable to delete review" });
  }
});

module.exports = router;
