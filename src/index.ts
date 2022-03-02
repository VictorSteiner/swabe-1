import express from "express";
import { authenticationRouter } from "./routes/authentication";
import { roomRouter } from "./routes/rooms";
import { reservationRouter } from "./routes/reservation";

const app = express();
const port = 3000;

app.use(authenticationRouter);
app.use(roomRouter);
app.use(reservationRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});