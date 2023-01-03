import * as dotenv from "dotenv";
import express from "express";
import routers from "./routes";
import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

//! SENTRY
Sentry.init({
  dsn: process.env.DSN,
});
app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routers);

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${process.env.PORT}!`);
});
