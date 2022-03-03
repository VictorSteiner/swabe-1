import express from "express";
import { authenticationRouter } from "./routes/authentication";
import { roomRouter } from "./routes/rooms";
import { reservationRouter } from "./routes/reservation";
import * as routes from "./routes/_config.json";
import { connect } from "mongoose";

require("dotenv").config();

const app = express();
const port = 3000;

connect(process.env.DB_CONNECTION);

app.use("/", authenticationRouter);
app.use(routes.main.rooms, roomRouter);
app.use(routes.main.reservations, reservationRouter);

app.get("/", (_, res) => res.status(200).send("OK"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
