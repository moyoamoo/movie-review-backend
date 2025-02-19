const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { addNewReview, searchReviews } = require("../../mysql/queries/reviews");
const { checkUser } = require("../../middleware");
const { getUsername } = require("../../mysql/queries/account");

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
    
    let username;
    let results;
    //find username associated with user id
    try {
      results = await connectMySQL(getUsername, [req.authUserID]);
    } catch (e) {
      console.log(e)
      return res.send({ status: 0, reason: "Cannot find username" });
    }

    if (results.length) {
      username = results[0].username;
    }

    try {
      // Try searching for the review to check if the user has already reviewed the book
      results = await connectMySQL(searchReviews, [req.authUserID, id]);

      //if there is a review for book
      if (results.length) {
        return res.send({
          status: 0,
          reason: "User has already added a review for this book",
        });
      } else {
        //change review to utf8
        review = Buffer.from(JSON.stringify(review), "utf8").toString("base64");

        try {
          // Try adding a new review for the book
          await connectMySQL(addNewReview, [
            req.authUserID,
            id,
            username,
            review,
          ]);
          review = JSON.parse(Buffer.from(review, "base64").toString("utf8"));
          return res.send({
            status: 1,
            reason: "Review added",
            username,
            review,
          });
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
