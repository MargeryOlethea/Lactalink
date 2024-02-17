if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}

// CONNECT TO DATABASE
const mongoose = require("mongoose")

// untuk menentukan nama database, isi di url paling belakang
// link project
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

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

// ------- app.listen moved to ./bin/www
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app