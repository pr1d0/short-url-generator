const httpStatus = require('http-status');
const { User } = require('../models');
const UrlModel = require('../models/url.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<UrlModel>}
 */
const createUrl = async (urlBody) => {
  return UrlModel.create(urlBody);
};

/**
 * Retrieves the URL visits by its shortId.
 *
 * @param {string} shortId - The unique identifier for the URL.
 * @returns {Promise<UrlModel>} - A Promise that resolves to the found URL document with its visits.
 */
const getVisitsById = async (shortId) => {
  return UrlModel.findOne({ shortId });
};

/**
 * Updates the visit history of a URL by its shortId.
 *
 * @param {string} shortId - The unique identifier for the URL.
 * @returns {Promise<UrlModel>} - A Promise that resolves to the updated URL document with its new visit record.
 */
const updateUrlVisits = async (shortId) => {
  return UrlModel.findOneAndUpdate(
    { shortId },
    { $push: { visits: { timestamp: Date.now() }}}
  );
};


module.exports = {
  createUrl,
  getVisitsById,
  updateUrlVisits
};