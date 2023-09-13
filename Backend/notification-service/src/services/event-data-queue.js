const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull')
var eventDataQueue = new Queue(
    configStruct.redis.event_data_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

eventDataQueue.process(async (job, done) => {
    const receivers = job.data.receivers;
    const text = job.data.message;
    const event_name = job.data.event_name;

    const uniqueList = removeDuplicates(receivers);

    const message = {
        to: uniqueList,
        from: 'juancurbelo02@gmail.com',
        subject: 'New information of the event: ' + event_name,
        text: text,
        html: '<h3>' + text + '</h3>',
    }

    await sgMail.send(message)
        .then((response) => console.log(response))
        .catch((error) => console.log(error.message))

    done();
});

eventDataQueue.on("completed", (job) => {
    console.log(`completed`);
});

const removeDuplicates = (list) => {
    const uniqueList = [...new Set(list)];
    return uniqueList;
};