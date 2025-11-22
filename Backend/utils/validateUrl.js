// utils/validateUrl.js
// Simple helper function to validate whether a string is a valid URL.

module.exports = function validateUrl(url) {
  try {
    // If the URL constructor succeeds, it's a valid URL
    new URL(url);
    return true;
  } catch {
    // Any error here means invalid URL format
    return false;
  }
};
