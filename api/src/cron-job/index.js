const cron = require("node-cron");
const exec = require("child_process").exec;

const cwd = process.cwd();

const job = cron.schedule("*/10 * * * *", async () => {
  exec(`node ${cwd}/src/cron-job/cron.js`);
});
job.start();

const job2 = cron.schedule("0 7 * * * *", async () => {
 exec(`node ${cwd}/src/cron-job/newsletter.js`);
});

job2.start();
