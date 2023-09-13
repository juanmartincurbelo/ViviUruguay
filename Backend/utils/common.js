const createLogEntry = (action, { name, fullName, email, _id }) => (
  {
    action: action,
    author: {
      id: _id,
      name: name || fullName,
      email: email
    },
  }
);

module.exports = {
  createLogEntry,
}
