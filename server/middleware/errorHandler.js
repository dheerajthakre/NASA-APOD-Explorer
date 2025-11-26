module.exports = (err, req, res, next) => {
  // Log to console (could be replaced with a logger)
  console.error(err && err.stack ? err.stack : err);

  // If this error originated from axios and has a response, use that status
  const status = (err && err.response && err.response.status) ? err.response.status : 500;
  const message = (err && err.message) ? err.message : 'Internal server error';

  // Avoid leaking stack in production - here we keep it simple
  res.status(status).json({ error: message });
};
