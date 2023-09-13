const providerRepository = require("../repositories/provider_repository");
const CronJob = require('cron').CronJob;
const config = require("../config/config");
const configStruct = config.getConfig();

var Queue = require('bull')
var checkAuthorizedQueue = new Queue(
    configStruct.redis.check_authorized_queue,
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
)

const cronExpression = '0 */1 * * *';

const job = new CronJob(cronExpression, () => {
    const handlePendingAuthorizationEvents = async () => {
        const admins = await providerRepository.getAdmins();
        const pendingEvents = await providerRepository.getPendingAuthorizationEvents(configStruct.setHoursToSendEmail);

        pendingEvents.forEach((event) => {
            checkAuthorizedQueue.add({ event: event, admins: admins });
        });
    };

    handlePendingAuthorizationEvents();
});

job.start();