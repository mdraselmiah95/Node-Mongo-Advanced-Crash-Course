const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const shortid = require("shortid");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/**
 * Player Microservice
 *
 * CRUD ==> Create, Read, Update, Delete
 *
 * GET -/       -find all the players
 * POST -/      -create a new and save into DB
 * GET -/:id    -find a single player by id
 * PUT -/:id    -update or create a player
 * PATCH -/:id  -update player
 * DELETE -/:id -delete a player from DB
 *
 */

app.post("/", (req, res) => {
  const player = {
    ...req.body,
    id: shortid.generate(),
  };
  res.status(201).json(player);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
