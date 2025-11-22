// controllers/linkController.js
// Handles all CRUD + redirect logic for short URLs.
// Each function is used by routes and follows the required URL structure.

const Link = require('../models/Link');
const validateUrl = require('../utils/validateUrl');

exports.createLink = async (req, res, next) => {
  try {
    const { originalUrl, code } = req.body;

    // Validate original long URL
    if (!validateUrl(originalUrl))
      return res.status(400).json({ error: 'Invalid URL' });

    // Validate short code format: must be 6–8 alphanumeric chars
    if (!code || !/^[A-Za-z0-9]{6,8}$/.test(code))
      return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });

    // Check if short code already exists
    const exists = await Link.findOne({ code });
    if (exists)
      return res.status(409).json({ error: 'Short code already exists' });

    // Create new short link entry
    const link = await Link.create({ originalUrl, code });
    res.status(201).json(link);

  } catch (err) {
    next(err);
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    // Fetch all stored short links
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    next(err);
  }
};

exports.getLinkStats = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Fetch link by code for analytics
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ error: 'Not found' });

    res.json(link);
  } catch (err) {
    next(err);
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Delete specific link by short code
    const link = await Link.findOneAndDelete({ code });
    if (!link) return res.status(404).json({ error: 'Not found' });

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
};

exports.redirect = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Find link and perform redirect
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send('Not found');

    // Update analytics
    link.clicks++;
    link.lastClicked = new Date();
    await link.save();

    // Perform HTTP 302 redirect
    res.redirect(302, link.originalUrl);
  } catch (err) {
    next(err);
  }
};
