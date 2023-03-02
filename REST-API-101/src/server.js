const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");
const dbLocation = path.resolve("src", "data.json");

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
 * PUT -/:id    -update or create a player (single update)
 * PATCH -/:id  -update player (full update)
 * DELETE -/:id -delete a player from DB
 *
 */

app.put("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  let player = players.find((item) => item.id === id);

  if (!player) {
    player = {
      ...req.body,
      id: shortid.generate(),
    };
    players.push(player);
  } else {
    player = {
      id: player.id,
      ...req.body,
    };
  }
  await fs.writeFile(dbLocation, JSON.stringify(players));
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  const player = players.find((item) => item.id === id);

  if (!player) {
    return res.status(404).json({ message: "Player Not Found" });
  }

  player.name = req.body.name || player.name;
  player.country = req.body.country || player.country;
  player.rank = req.body.rank || player.rank;

  await fs.writeFile(dbLocation, JSON.stringify(players));
  res.status(200).json(player);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);

  const player = players.find((item) => item.id === id);

  if (!player) {
    return res.status(404).json({ message: "Player Not Found" });
  }
  res.status(200).json(player);
});

app.post("/", async (req, res) => {
  const player = {
    ...req.body,
    id: shortid.generate(),
  };

  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  players.push(player);
  await fs.writeFile(dbLocation, JSON.stringify(players));
  return res.status(201).json(player);
});

app.get("/", async (req, res) => {
  const data = await fs.readFile(dbLocation);
  const players = JSON.parse(data);
  res.status(201).json(players);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});
