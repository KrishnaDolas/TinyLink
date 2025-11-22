// routes/linkRoutes.js
// Defines all API routes related to creating, retrieving, deleting,
// and redirecting shortened links.

const express = require('express');
const router = express.Router();

const {
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
  redirect
} = require('../controllers/linkController');

// ---------- API ROUTES ----------

// Create a new short link
router.post('/api/links', createLink);

// Fetch all stored links
router.get('/api/links', getLinks);

// Fetch analytics/statistics for a specific short link
router.get('/api/links/:code', getLinkStats);

// Delete a short link by its code
router.delete('/api/links/:code', deleteLink);

// ---------- REDIRECT ROUTE ----------
// Handles visiting a short URL → increments click count → redirects user
router.get('/:code', redirect);

module.exports = router;
