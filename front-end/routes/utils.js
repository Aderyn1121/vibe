<<<<<<< HEAD



=======
>>>>>>> ca2f14d3f682e4b37d1c4ab26b4219d9e77f926a
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res).catch(next);

module.exports = asyncHandler;
