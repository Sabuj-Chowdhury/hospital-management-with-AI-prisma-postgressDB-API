import type { Server } from "http";
import app from "./app";
import { envConfig } from "./app/config/envConfig";

let server: Server;

async function startServer() {
  try {
    server = app.listen(envConfig.PORT, () => {
      console.log(`Server is listening to ${envConfig.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

/* 
unhandled rejection error --->example
Promise.reject(new Error(`I forgot to handle this promise!`));
*/

process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection caught. server shutting down .....`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * uncaught exception error EXAMPLE
 * throw new Error(`I forgot to handle this local error!`);
 */

process.on("uncaughtException", (err) => {
  console.log(`uncaught exception detected. SERVER SHUTTING DOWN......`, err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// sigterm ---> signal termination error
process.on("SIGTERM", () => {
  console.log(`signal termination error occurred. SERVER SHUTTING DOWN....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
