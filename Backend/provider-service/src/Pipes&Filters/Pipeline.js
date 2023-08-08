const { EventValidationError } = require("../errors/providers_errors");

class Pipeline {
  constructor() {
    this.filters = [];
  }

  use(filter) {
    this.filters.push(filter);
  }

  async run(input) {
    try {
      let result = input;
      for (const filter of this.filters) {
        try {
          result = await filter(result);
        } catch (error) {
          throw new EventValidationError(error.message);
        }
      }
      return result;
    } catch (error) {
      throw new EventValidationError(error.message);
    }
  }
}

module.exports = Pipeline;
