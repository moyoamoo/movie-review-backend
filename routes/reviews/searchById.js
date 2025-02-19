const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const {
  searchReviewsById,
  editReview,
} = require("../../mysql/queries/reviews");
const { checkUser } = require("../../middleware");

router.get("/", async (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.send({ status: 0, reason: "No id" });
  }

  try {
    const results = await connectMySQL(searchReviewsById, [id]);
    console.log(results);
    const reviews = [];
    results.forEach((result) => {
      result.review = JSON.parse(
        Buffer.from(result.review, "base64").toString("utf8")
      );
      reviews.push({
        username: result.username,
        reviewId: result.id,
        review: result.review,
        date: result.entry_date,
      });
    });
    res.send({
      status: 1,
      reason: "All reviews from id available",
      bookId: results[0].book_id,
      reviews,
    });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Unable to search for reviews by id" });
  }
});

module.exports = router;
