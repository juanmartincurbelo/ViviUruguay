const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull');
var deauthorization_queue = new Queue(
    configStruct.redis.deauthorization_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

deauthorization_queue.process(async (job, done) => {
    const data = job.data;

    const message = {
        to: data.provider,
        from: 'juancurbelo02@gmail.com',
        subject: 'Deauthorized event.',
        text: 'The event ' + data.event + ' was deauthorized. The reason was: ' + data.reason,
        html: '<p>The event ' + data.event + ' was deauthorized. The reason was: ' + data.reason + '</p>',
    }

    await sgMail.send(message)
        .then((response) => console.log('Email sent to the provider.'))
        .catch((error) => console.log(error.message))

    done();
});