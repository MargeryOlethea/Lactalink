const { MongoError } = require("mongodb")


const errorHandler = (error, req, res, next) => {
  console.log(error, "<<<<< log di errorHandler")
  let status = 500
  let message = "Internal Server Error"

  if (error.name == "ValidationError") {
    Object.keys(error.errors).forEach((key) => {
      message = error.errors[key].path + " " + error.errors[key].kind
    });
  }

  if (error.name == "MongoServerError") {
    status = 400
    message = "Field must be unique"
  }

  if (error.name == "LoginValidationInput") {
    status = 401
    message = "Email/Password is required"
  }

  if (error.name == "LoginValidationError") {
    status = 401
    message = "Email/Password is invalid"
  }

  if (error.name == "Unauthorized") {
    status = 403
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