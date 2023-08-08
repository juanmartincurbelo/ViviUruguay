const config = require("../../config/config");
const configStruct = config.getConfig();

const paymentValidationAdapter = require("../../adapters/payment_gateway_adapter");
const { EventValidationError } = require("../../errors/providers_errors");

const paymentValidationFilter = async (eventData) => {
  try {
    const url = configStruct.payment_gateway.address;
    return await paymentValidationAdapter(eventData, url);
  } catch (error) {
    throw new EventValidationError('Unknown error at payment validation.');
  }
};

module.exports = paymentValidationFilter;
