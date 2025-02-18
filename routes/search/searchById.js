const express = require("express");
const router = express.Router();
const axios = require("axios");
const { searchByIdUrl, apiKey } = require("../../config");

router.get("/", async (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.send({ status: 0, reason: "No id" });
  }

  try {
    const { data } = await axios.get(searchByIdUrl(id, apiKey));
    res.send({ status: 1, data: data });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Book search unavailable" });
  }
});

module.exports = router;
