import swaggerUi from "swagger-ui-express";
import * as dotenv from "dotenv";
import express from "express";
import routers from "routes";
import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "App API",
      description:
        "API for getting, creating and updating users and their todo tasks",
      version: "1.0.0",
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "Authorization",
          },
        },
      },
      contact: {
        name: "Chappa Savagge Dev",
        email: "info@email.com",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./src/routes/*.ts"],
};
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
