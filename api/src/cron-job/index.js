const cron = require("node-cron");
const exec = require("child_process").exec;

const cwd = process.cwd();

cron.schedule("*/10 * * * *", async () => {
  exec(`node ${cwd}/src/cron-job/cron.js`);
});

cron.schedule("0 7 * * * *", async () => {
 exec(`node ${cwd}/src/cron-job/newsletter.js`);
});
