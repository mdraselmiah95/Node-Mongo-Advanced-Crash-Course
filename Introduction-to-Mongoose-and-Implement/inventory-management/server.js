const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const app = require("./app");

// Database Connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database Connection Is Successful 🥇`.rainbow.bold);
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is Running on PORT ${port}`.red.bold);
});
