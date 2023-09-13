const Pipeline = require('../Pipeline');

const dateConsistencyFilter = require('../Filters/date_consistency_filter');

const EventValidationPipeline = new Pipeline();

EventValidationPipeline.use(dateConsistencyFilter);

module.exports = {
  EventValidationPipeline
};
