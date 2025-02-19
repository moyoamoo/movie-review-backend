const connectMySQL = require("./mysql/driver");
const { checkToken } = require("./mysql/queries/account");
async function checkUser(req, res, next) {
  let results;
  //check if token is missing
  if (!req.headers.token) {
    return res.send({ status: 0, reason: "Token Missing" });
  }

  const token = req.headers.token.trim();

  try {
    results = await connectMySQL(checkToken, [token]);
  } catch (e) {
    res.send({ status: 0, reason: "Invalid Token" });
    console.log(e);
    return;
  }

  if (results.length) {
    req.authUserID = results[0].id;
    next();
    return;
  }

  res.send({ status: 0, reason: "Invalid Token" });
}

module.exports = { checkUser };
