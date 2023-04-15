const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header not found');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token not found in Authorization header');
  }

  try {
    const decoded = jwt.verify(token, 'xtrasecret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
}

module.exports = verifyToken