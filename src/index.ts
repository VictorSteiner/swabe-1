import express from "express";
import { connect } from "mongoose";
import { authenticationRouter } from "./routes/authentication";
import { reservationRouter } from "./routes/reservation";
import { roomRouter } from "./routes/rooms";
import * as routes from "./routes/_config.json";

require("dotenv").config();

const app = express();
const port = 3000;

async function main() {
  await connect(process.env.DB_CONNECTION);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", authenticationRouter);
  app.use(routes.main.rooms, roomRouter);
  app.use(routes.main.reservations, reservationRouter);

  app.get("/", (_, res) => res.status(200).send("OK"));

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

main();
