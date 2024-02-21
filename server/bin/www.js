const app = require("../app");
const port = process.env.PORT || 3000;

// CONNECT TO DATABASE
const mongoose = require("mongoose");

// untuk menentukan nama database, isi di url paling belakang
// link project
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.listen(port, () => {
  console.log(`Lactalink app listening on port ${port}`);
});
