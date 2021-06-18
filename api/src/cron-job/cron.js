const ebios = require("./ebios");
const amko = require("./amko");
const konzum = require("./konzum");
const { connect } = require("../db/db-connect");
const env = require("../utils/env");

const fn  = async () => {
    await connect(env.db_uri);
    await Promise.all([ebios(), amko(), konzum()]);
}

fn();
