import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
//import mongoose from "mongoose";
import router from "./router/userRoutes";
import { config } from "dotenv";
config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
const port = 3000;

const server = http.createServer(app);

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || "");
// mongoose.connection.on("error", () => {
//   console.log("MongoDB connection error. Please make sure MongoDB is running.");
//   process.exit();
// });

server.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});

app.use("/", router);
