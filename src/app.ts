import Express from "express";
import bodyparser from "body-parser";
import { getRedisClient } from "./helper/redisConnection";
import DatabaseSetup from "./config/databaseConnection";
import DotenvFlow from "dotenv-flow";
import RouteHandler from "./routes/index";
DotenvFlow.config();

const app = Express();
app.use(bodyparser.json());
const port = process.env.Port || 3000;

getRedisClient();

app.use("/api", RouteHandler);
app.listen(port, () => {
  console.log(`server is connected at ${port}`);
  try {
    DatabaseSetup();
  } catch (error) {
    if (error instanceof Error) {
      console.log("eerror is coming ", error);
    }
  }
});
