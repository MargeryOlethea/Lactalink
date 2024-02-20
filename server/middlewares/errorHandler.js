
const errorHandler = (error, req, res, next) => {
  console.log(error, "<<<<< log di errorHandler")
  let status = 500
  let message = "Internal Server Error"

  if (error.name == "ValidationError") {
    status = 400
    Object.keys(error.errors).forEach((key) => {
      message = error.errors[key].path + " " + error.errors[key].kind
    });
  }

  if (error.name == "MongoServerError" && error.code == 11000) {
    status = 400
    message = Object.keys(error.keyPattern)[0] + " has been registered"
  }

  if (error.name == "LoginValidationInput") {
    status = 401
    message = "Email/Password is required"
  }

  if (error.name === "JsonWebTokenError") {
    status = 401
    message = "Invalid access_token"
  }

  if (error.name == "Unauthorized") {
    status = 401
    message = "Unauthorized"
  }

  if (error.name == "Forbidden") {
    status = 403
    message = "Forbidden"
  }

  if (error.name == "NotFound") {
    status = 404
    message = "Data is not found"
  }

  res.status(status).json({ message })
}

module.exports = errorHandler