const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOneAndRemove({
      _id: verifyToken._id,
      'tokens:token': token,
    });
    if (!rootUser) {
      throw new Error('User not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(402).send('Unauthorization Token');
  }
};

module.exports = middleware;
