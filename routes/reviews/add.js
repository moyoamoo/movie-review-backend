const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { addNewReview, searchReviews } = require("../../mysql/queries/reviews");
const { checkUser } = require("../../middleware");

router.post("/", checkUser, async (req, res) => {
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

      if (results.length) {
        return res.send({
          status: 0,
          reason: "User has already added a review for this book",
        });
      } else {
        //change review to utf8 
        review = Buffer.from(JSON.stringify(review), "utf8");

        try {
          // Try adding a new review for the book
          await connectMySQL(addNewReview, [req.authUserID, id, review]);
          return res.send({ status: 1, reason: "Review added", review });
        } catch (e) {
          console.log(e);
          return res.send({ status: 0, reason: "Unable to add book review" });
        }
      }
    } catch (e) {
      console.log(e);
      return res.send({
        status: 0,
        reason: "Unable to search for book reviews",
      });
    }
  } else {
    return res.send({ status: 0, reason: "Not logged in" });
  }
});

module.exports = router;
