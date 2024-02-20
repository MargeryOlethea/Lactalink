if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}


// SET UP EXPRESS
const router = require("./routers/index");
const express = require("express");
const cors = require(`cors`);
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER DI SINI
app.use(router)
app.use(errorHandler)

module.exports = app