const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(cors());

//parse JSON requests
app.use(express.json());

//secure http response headers
app.use(helmet());

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
