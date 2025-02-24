const express = require("express");
const router = express.Router();
const axios = require("axios");
const { searchByTermUrl } = require("../../config");

router.get("/", async (req, res) => {
  let { searchTerm } = req.body;

  if (!searchTerm) {
    return res.send({ status: 0, reason: "No search term" });
  }

  try {
    const { data } = await axios.get(searchByTermUrl(searchTerm));
    res.send({ status: 1, data: data });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Book search unavailable" });
  }
});

module.exports = router;
