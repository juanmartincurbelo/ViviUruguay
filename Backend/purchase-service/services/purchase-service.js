const fetch = require("node-fetch");

const purchaseRepository = require("../repositories/purchase-repository");
const { PurchaseError, EventValidationError } = require("../errors/errors.js");
const logger = require('../../utils/logger');
const { createLogEntry } = require('../../utils/common');

const config = require("../config/config");
const configStruct = config.getConfig();

var Queue = require('bull')
var pendingPurchasesQueue = new Queue(
  configStruct.redis.pending_purchases_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
)

var donePurchasesQueue = new Queue(
  configStruct.redis.done_purchases_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

var failedPurchasesQueue = new Queue(
  configStruct.redis.failed_purchases_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

pendingPurchasesQueue.process(async (job, done) => {
  const purchase = job.data.purchase;
  const receiveMails = job.data.receiveMails;
  try {
    const result = await paymentValidationFilter(purchase.provider_id);
    if (!result.success) {
      throw new Error("Payment failed");
    }
    purchase.timestamp_answer = new Date();

    purchase.timestamp_difference = (purchase.timestamp_answer - new Date(purchase.timestamp_sent)) / 1000;

    await purchaseRepository.createPurchase(purchase, receiveMails);

    const logEntry = createLogEntry("Event subscription", purchase.name)
    logger.application(logEntry);

    done();
  } catch (error) {
    done(new PurchaseError(error.message));
  }
});

pendingPurchasesQueue.on("completed", async (job) => {
  await donePurchasesQueue.add(job.data.purchase);
});

pendingPurchasesQueue.on("failed", async (job) => {
  await failedPurchasesQueue.add(job.data.purchase);
});

const paymentValidationFilter = async () => {
  try {
    const response = await fetch(configStruct.payment_gateway.address, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new EventValidationError('Unknown error at payment validation.');
  }
};

module.exports = {
}
