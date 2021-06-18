const ebios = require("./ebios");
const amko = require("./amko");
const konzum = require("./konzum");

const fn  = async () => {
    await Promise.all([ebios(), amko(), konzum()]);
}

fn();
