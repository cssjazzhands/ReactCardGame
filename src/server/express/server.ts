import "utils/loadEnv";
import { createServer } from "http";
import app from "./restApi";

const server = createServer();

server.on("request", app);
// createWebSocketServer(server);

server.listen(9501, () => {
  console.log(`API v1 (re)started`);
});
