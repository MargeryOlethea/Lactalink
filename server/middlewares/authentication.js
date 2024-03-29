const { ObjectId } = require("mongodb")
const { verifyToken } = require("../utils/jwtoken")

const authentication = (req, res, next) => {
  try {
    const access_token = req?.headers?.authorization?.split(" ")[1]

    if (!access_token) {
      throw { name: "Unauthorized" }
    }

    const payload = verifyToken(access_token)

    // console.log(payload)

    req.loginInfo = { ...payload, userId: new ObjectId(payload.userId) }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication