const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull');
var authorization_queue = new Queue(
    configStruct.redis.authorization_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

authorization_queue.process(async (job, done) => {
    const data = job.data;

    const message = {
        to: data.providerEmail,
        from: 'juancurbelo02@gmail.com',
        subject: 'Your event has been successfully authorized.',
        text: 'The event ' + data.eventName + ' has been successfully authorized. Link of the event: ' + data.eventLink,
        html: '<p>The event ' + data.eventName + ' has been successfully authorized. Link of the event: ' + data.eventLink + '</p>',
    }

    await sgMail.send(message)
        .then((response) => console.log('Email sent to the provider.'))
        .catch((error) => console.log(error.message))

    done();
});