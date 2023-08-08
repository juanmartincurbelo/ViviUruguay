const Pipeline = require('../Pipeline');

const dateConsistencyFilter = require('../Filters/date_consistency_filter');
const paymentValidationFilter = require('../Filters/payment_validation_filter');
const regulatoryAuthorizationFilter = require('../Filters/regulatory_authorization_filter');

const EventValidationPipeline = new Pipeline();

EventValidationPipeline.use(dateConsistencyFilter);
EventValidationPipeline.use(regulatoryAuthorizationFilter);
EventValidationPipeline.use(paymentValidationFilter);

module.exports = {
  EventValidationPipeline
};
