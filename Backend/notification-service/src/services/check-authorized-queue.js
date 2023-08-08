const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull')
var checkAuthorizedQueue = new Queue(
    configStruct.redis.check_authorized_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

checkAuthorizedQueue.process(async (job, done) => {
    const data = job.data;

    const message = {
        to: data.admins,
        from: 'juancurbelo02@gmail.com',
        subject: 'There are pending events awaiting authorization.',
        text: 'The event ' + data.event.name + ' is pending authorization.',
        html: '<p>The event ' + data.event.name + ' is pending authorization.</p>',
    }

    await sgMail.send(message)
        .then((response) => console.log('Email sent to the admins.'))
        .catch((error) => console.log(error.message))

    done();
});