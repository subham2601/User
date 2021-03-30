module.exports = {
  validationErrorHandler(message) {
    return {
      code: 422,
      error: message,
    };
  },
  notFoundResourceHandle(message) {
    return {
      code: 404,
      error: message,
    };
  },
};
