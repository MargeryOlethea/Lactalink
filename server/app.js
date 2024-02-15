if (process.env.NODE_ENV !== "production") {
  require(`dotenv`).config();
}

// CONNECT TO DATABASE
const mongoose = require("mongoose")
const router = require("./routers/index");

// untuk menentukan nama database, isi di url paling belakang
// link project
mongoose.connect("mongodb+srv://reinardusk:hasahihanghoheng@cluster0.peypini.mongodb.net/lactalinkDB")

// link coba-coba
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

// SET UP EXPRESS
const express = require("express");
const cors = require(`cors`);
const errorHandler = require("./middlewares/errorHandler");


const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER DI SINI
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
