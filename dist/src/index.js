"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./routes/authentication");
const rooms_1 = require("./routes/rooms");
const reservation_1 = require("./routes/reservation");
const app = (0, express_1.default)();
const port = 3000;
app.use(authentication_1.authenticationRouter);
app.use(rooms_1.roomRouter);
app.use(reservation_1.reservationRouter);
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
