const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(cors());

//parse JSON requests
app.use(express.json());

//secure http response headers
app.use(helmet());

//add user
app.use("/user/add", require("./routes/add"));
//login
app.use("/user/login", require("./routes/login"));
//logout
app.use("/user/logout", require("./routes/logout"));
//delete user
app.use("/user/delete", require("./routes/delete"));
//change password
app.use("/user/updatepassword", require("./routes/updatePassword"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
