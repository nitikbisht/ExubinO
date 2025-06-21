const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ msg: 'Unauthorized' });

  const token = header.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
