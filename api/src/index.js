const express = require("express");
const compression = require("compression");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { connect } = require("./db/db-connect");
const router = require("./routes");
const env = require("./utils/env");
const { passport } = require("./utils/passport");
const { errorHandle } = require("./middleware/errorHandle");

const bootstrap = async () => {
  const app = express();

  app.set("trust proxy", 1);
  app.enable('trust proxy');

  const middlewares = [
    cors({ origin: env.url, credentials: true }),
    passport.initialize(),
    hpp(),
    helmet(),
    compression(),
    express.json({ limit: "50mb" }),
    express.urlencoded({ extended: true, limit: "1kb", parameterLimit: 10 }),
    cookieparser(),
  ];

  app.use(middlewares);

  app.use("/api", router);

  connect(env.db_uri);

  app.use(errorHandle);

  app.listen(env.server.PORT, () => {
    console.log(`SERVER RUNNING ON ${env.server.PORT} PORT`);
    console.log(`SERVER URL ${env.server.URL}`);
    require("./cron-job");
  });
};

bootstrap();
