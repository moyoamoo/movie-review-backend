const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { searchRatingsById } = require("../../mysql/queries/ratings");

router.get("/", async (req, res) => {
  let { bookId } = req.body;

  console.log(bookId);

  if (!bookId) {
    return res.send({ status: 0, reason: "No book id" });
  }

  try {
    const results = await connectMySQL(searchRatingsById, [bookId]);
    let ratings = [];

    if (results.length) {
      results.forEach((result) => {
        ratings.push({
          username: result.username,
          ratingId: result.id,
          rating: result.rating,
          date: result.entry_date,
        });
      });

      return res.send({
        status: 1,
        reason: "All ratings from id available",
        bookId: results[0].book_id,
        ratings
      });
    } else {
      return res.send({ status: 0, reason: "No ratings for this book" });
    }
  } catch (e) {
    console.log(e);
    return res.send({
      status: 0,
      reason: "Unable to search for ratings by id",
    });
  }
});

module.exports = router;
