const app = require("../app")
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Lactalink app listening on port ${port}`);
});
