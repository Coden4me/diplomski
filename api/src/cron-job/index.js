const cron = require("node-cron");

const job = cron.schedule("*/2 * * * *", async () => {
  require('./cron');
});
job.start();

const job2 = cron.schedule("0 7 * * * *", async () => {
  require('./newsletter');
});

job2.start();
