const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  const token = req.header('x-auth-token');

  if(!token) return res.status(401).json({ msg: "Access denied: No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({ msg: "Token is not valid" })
  }
};

module.exports = authorize;