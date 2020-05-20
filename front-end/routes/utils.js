const backendURL = process.env.BACKEND_URL;

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res).catch(next);

module.exports = { backendURL, asyncHandler };
