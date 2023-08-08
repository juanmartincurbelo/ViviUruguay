const fetch = require('node-fetch');

const { EventValidationError } = require('../errors/providers_errors');

const regulatoryAuthorizationAdapter = async (eventData, url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    if (!data.success) {
      eventData.validations.push({ type: 'Regulatory Unit', passed: false });
    } else {
      eventData.validations.push({ type: 'Regulatory Unit', passed: true });
    }

    return eventData;
  } catch (error) {
    throw new EventValidationError('Unknown error at regulatory unit.');
  }
};

module.exports = regulatoryAuthorizationAdapter;
