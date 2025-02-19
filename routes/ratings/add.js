const express = require("express");
const router = express.Router();
const connectMySQL = require("../../mysql/driver");
const { checkUser } = require("../../middleware");
const { addRating, searchRatings } = require("../../mysql/queries/ratings");
const { getUsername } = require("../../mysql/queries/account");

router.post("/", checkUser, async (req, res) => {
  let { bookId, rating } = req.body;

  if (!bookId) {
    return res.send({ status: 0, reason: "No book ID" });
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

  if (req.authUserID) {
    let username;
    let results;

    //check if user has left a rating for this book
    try {
      results = await connectMySQL(searchRatings, [req.authUserID, bookId]);
      if (results.length) {
        return res.send({
          status: 0,
          reason: "User has already left a rating for this book",
        });
      }
    } catch (e) {
      return res.send({ status: 0, reason: "Unable to search ratings" });
    }

    //find username associated with user id
    try {
      results = await connectMySQL(getUsername, [req.authUserID]);
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, reason: "Cannot find username" });
    }

    if (results.length) {
      username = results[0].username;
    } else {
      return res.send({ status: 0, reason: "Cannot find username" });
    }

    try {
      results = await connectMySQL(addRating, [
        req.authUserID,
        username,
        bookId,
        rating,
      ]);
      return res.send({
        status: 0,
        reason: "Rating added",
        username,
        bookId,
        rating,
      });
    } catch (e) {
      return res.send({ status: 0, reason: "Unable to add rating" });
    }
  } else {
    return res.send({ status: 0, reason: "Not logged in " });
  }
});

module.exports = router;
