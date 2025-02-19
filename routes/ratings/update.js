const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { checkUser } = require("../../middleware");
const { searchRatings, editRating } = require("../../mysql/queries/ratings");

router.patch("/", checkUser, async (req, res) => {
  let { bookId, rating } = req.body;

  if (!bookId) {
    return res.send({ status: 0, reason: "No id" });
  }

  if (!rating) {
    return res.send({ status: 0, reason: "No rating" });
  }

  if (isNaN(rating)) {
    return res.send({ status: 0, reason: "Rating is not a number" });
  }

  if (rating <= 0 || rating > 5) {
    return res.send({ status: 0, reason: "Invalid rating" });
  }

  // if user is logged in
  if (req.authUserID) {
    try {
      // Try searching for the review to check if the user has already left a rating for the book
      let results = await connectMySQL(searchRatings, [req.authUserID, bookId]);
      console.log(results);

      if (results.length) {
        try {
          results = await connectMySQL(editRating, [
            rating,
            req.authUserID,
            bookId,
          ]);
          return res.send({ status: 1, reason: "Edited rating", rating });
        } catch (e) {
          console.log(e);
          return res.send({ status: 0, reason: "Unable to edit rating" });
        }
      } else {
        return res.send({ status: 0, reason: "Book rating not found" });
      }
    } catch (e) {
      res.send({ status: 0, reason: "No rating for this book" });
    }
  }
});

module.exports = router;
