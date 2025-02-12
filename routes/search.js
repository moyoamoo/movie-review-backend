const express = require("express");
const router = express.Router();
const axios = require("axios");
const { url } = require("../config");

router.get("/", async (req, res) => {
  let { searchTerm } = req.body;

  try {
    const { data } = await axios.get(url(searchTerm));
    res.send({ status: 1, data: data });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Book search unavailable" });
  }
});

module.exports = router;
