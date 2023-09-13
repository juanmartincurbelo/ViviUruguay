const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull')
var failedPurchasesQueue = new Queue(
  configStruct.redis.failed_purchases_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

failedPurchasesQueue.process(async (job, done) => {
  const purchase = job.data;

  const message = {
    to: purchase.email,
    from: 'juancurbelo02@gmail.com',
    subject: 'Your purchase could not be processed.',
    text: 'Your purchase could not be processed. We apologize that your purchase could not be processed.',
    html: '<h1>Your purchase could not be processed.</h1> <p>We apologize that your purchase could not be processed.</p>',
  }

  await sgMail.send(message)
    .then((response) => console.log('Email sent.'))
    .catch((error) => console.log(error.message))

  done();
});

failedPurchasesQueue.on("completed", (job) => {
  console.log(`failed completed`);
});

module.exports = {
}