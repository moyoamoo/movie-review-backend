const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { searchReviews, editReview } = require("../../mysql/queries/reviews");
const { checkUser } = require("../../middleware");

router.patch("/", checkUser, async (req, res) => {
  let { id, review } = req.body;

  if (!id) {
    return res.send({ status: 0, reason: "No id" });
  }

  if (!review) {
    return res.send({ status: 0, reason: "No review" });
  }

  // if user is logged in
  if (req.authUserID) {
    try {
      // Try searching for the review to check if the user has already reviewed the book
      const results = await connectMySQL(searchReviews, [req.authUserID, id]);

      if (results) {
        console.log(results[0].review);
        try {
          //change review to base64
          review = Buffer.from(JSON.stringify(review), "utf8").toString(
            "base64"
          );
          const results = await connectMySQL(editReview, [
            review,
            req.authUserID,
            id,
          ]);
          console.log(review);
          review = JSON.parse(Buffer.from(review, "base64").toString("utf8"));
          console.log(review);
          return res.send({ status: 1, reason: "Edited review", review });
        } catch (e) {
          console.log(e);
          return res.send({ status: 0, reason: "Unable to edit review" });
        }
      } else {
        return res.send({ status: 0, reason: "Book review not found" });
      }
    } catch (e) {
      res.send({ status: 0, reason: "Unable to search reviews" });
    }
  }
});

module.exports = router;
