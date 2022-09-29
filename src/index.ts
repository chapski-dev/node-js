import * as dotenv from "dotenv";
import express from "express";
import routers from './routes';
import swaggerjsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sentry.init({
//   dsn: "https://a97b8147c47e4e3788fb1f8c01983054@o1403544.ingest.sentry.io/6736367",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

app.use('/api', routers);
// app.use('/api-docs', swaggerUi.serve);


// app.use(
//   Sentry.Handlers.errorHandler({
//     shouldHandleError(error) {
//       // Capture all 404 and 500 errors
//       if (error.status === 404 || error.status === 500) {
//         return true;
//       }
//       return false;
//     },
//   })
// );

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${process.env.PORT}!`);
});

