const config = require("../config/config");
const configStruct = config.getConfig();
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

var Queue = require('bull')
var donePurchasesQueue = new Queue(
    configStruct.redis.done_purchases_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

donePurchasesQueue.process(async (job, done) => {
    const purchase = job.data;

    const message = {
        to: purchase.email,
        from: 'juancurbelo02@gmail.com',
        subject: '¡Tu compra ha sido procesada exitosamente!',
        text: 'Tu compra ha sido procesada exitosamente. Podrás acceder al evento a través de este QR: ' + purchase.video,
        html: '<h1>¡Tu compra ha sido procesada exitosamente!</h1> <p>Podrás acceder al evento a través de este QR: ' + purchase.video + '</p>',
    }

    await sgMail.send(message)
        .then((response) => console.log('Email sent.'))
        .catch((error) => console.log(error.message))

    done();
});

donePurchasesQueue.on("completed", (job) => {
    console.log(`completed`);
});

module.exports = {
}