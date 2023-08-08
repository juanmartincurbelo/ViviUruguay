const config = require("../../config/config");
const configStruct = config.getConfig();

const regulatoryAuthorizationAdapter = require("../../adapters/regulatory_unit_adapter");
const { EventValidationError } = require('../../errors/providers_errors');

const regulatoryAuthorizationFilter = async (eventData) => {
  try {
    const url = configStruct.regulatory_unit.address;
    return regulatoryAuthorizationAdapter(eventData, url)
  } catch (error) {
    throw new EventValidationError('Unknown error at regulatory unit.');
  }
};

module.exports = regulatoryAuthorizationFilter;
