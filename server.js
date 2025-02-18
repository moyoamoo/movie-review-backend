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
app.use("/user/add", require("./routes/accounts/add"));
//login
app.use("/user/login", require("./routes/accounts/login"));
//logout
app.use("/user/logout", require("./routes/accounts/logout"));
//delete user
app.use("/user/delete", require("./routes/accounts/delete"));
//change password
app.use("/user/updatepassword", require("./routes/accounts/updatePassword"));
//change email
app.use("/user/updateemail", require("./routes/accounts/updateEmail"));

//
app.use("/books/search/term", require("./routes/searchByTerm"));

app.use("/books/search/id", require("./routes/searchById"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
