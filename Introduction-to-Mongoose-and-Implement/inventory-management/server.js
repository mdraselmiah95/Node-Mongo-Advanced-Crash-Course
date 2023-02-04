const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

mongoose.set("strictQuery", false);
// Database Connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(() => {
  console.log(`Database Connection Is Successful 🥇`.rainbow.bold);
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is Running on PORT ${port}`.red.bold);
});
