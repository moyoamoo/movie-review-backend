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

//search for book by search term
app.use("/books/search/term", require("./routes/search/searchByTerm"));
//search for book by id
app.use("/books/search/id", require("./routes/search/searchById"));

//add book review
app.use("/review/add", require("./routes/reviews/add"));
//update exisiting book review
app.use("/review/update", require("./routes/reviews/update"));
//delete review with review id
app.use("/review/delete", require("./routes/reviews/delete"));
//search review by book id
app.use("/review/search/id", require("./routes/reviews/searchById"));

//add book rating
app.use("/rating/add", require("./routes/ratings/add"));
//search ratings by book id
app.use("/rating/search", require("./routes/ratings/searchById"));
//update rating
app.use("/rating/update", require("./routes/ratings/update"));
//delete rating
app.use("/rating/delete", require("./routes/ratings/delete"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
