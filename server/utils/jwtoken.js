const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY

const createToken = (object) => {
  return jwt.sign(object, privateKey)
}

const verifyToken = (token) => {
  return jwt.verify(token, privateKey)
}

module.exports = { createToken, verifyToken }