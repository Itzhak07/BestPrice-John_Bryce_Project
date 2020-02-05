const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied! " });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded.user.role);

    if (decoded.user.role == 2) {
      return res.status(401).json({ msg: "this user is not authorized!!! " });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
