// middleware/errorHandler.js
// Global error handler for all server routes.
// Ensures the API always responds with a consistent JSON error format.

module.exports = function (err, req, res, next) {
  // Log full error details for debugging (not sent to client)
  console.error(err.stack);

  // Generic fallback response to avoid exposing internal details
  res.status(500).json({ error: 'Internal server error' });
};
