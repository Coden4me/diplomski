const cron = require("node-cron");
const exec = require("child_process").exec;
const env = require("../utils/env");

const cwd = env.isProduction ? `${process.cwd()}/api` : process.cwd();

const job = cron.schedule("0 4 * * * *", async () => {
  exec(`node ${cwd}/src/cron-job/cron.js`);
});
job.start();

const job2 = cron.schedule("0 5 * * * *", async () => {
 exec(`node ${cwd}/src/cron-job/newsletter.js`);
});

job2.start();
