const { EventValidationError } = require("../../errors/providers_errors");

const dateConsistencyFilter = (eventData) => {
  try {
    const currentDate = new Date();
    const { startDate, endDate } = eventData;

    const startDateToDate = new Date(startDate);
    const endDateToDate = new Date(endDate);

    if (startDateToDate < currentDate || endDateToDate < startDateToDate) {
      eventData.validations.push({ type: 'Date Consistency', passed: false });
    } else {
      eventData.validations.push({ type: 'Date Consistency', passed: true });
    }

    return eventData;
  } catch (error) {
    throw new EventValidationError('Unknown error at date consistency filter.');
  }
};

module.exports = dateConsistencyFilter;
