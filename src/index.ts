import { config } from "./config";
import { server } from "./server";

server.listen(config.port, () => console.log(`Running on port ${config.port}`));
