import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";
import express from "express";
import routers from "routes";
import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "swagger";

const app = express();
dotenv.config();

const swaggerDocs = swaggerJSDoc(swaggerOptions);

//! SENTRY
Sentry.init({
  dsn: process.env.DSN,
});
app.use(Sentry.Handlers.requestHandler());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routers);

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${process.env.PORT}!`);
});
