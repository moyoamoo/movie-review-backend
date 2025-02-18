const express = require("express");
const router = express.Router();
const { getRandom } = require("../../utils");
const connectMySQL = require("../../mysql/driver");
const { addNewReview } = require("../../mysql/queries/reviews");
const { checkUser } = require("../../middleware");

router.post("/", checkUser, async (req, res) => {
  let { id, review } = req.body;

  if (!id) {
    return res.send({ status: 0, reason: "No id" });
  }

  if (!review) {
    return res.send({ status: 0, reason: "No review" });
  }

  if (req.authUserID) {
    try {
      await connectMySQL(addNewReview, [req.authUserID, id, review]);
      return res.send({ status: 1, reason: "Review added", review });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, reason: "Unable to add book review" });
    }
  } else {
    return res.send({ status: 0, reason: "Not logged in" });
  }
});

module.exports = router;
