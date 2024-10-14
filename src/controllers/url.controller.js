const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { urlService } = require('../services');

const createUrl = catchAsync(async (req, res) => {
  const url = await urlService.createUrl(req.body);
  res.status(httpStatus.CREATED).send(url);
});

const getUrlVisits = catchAsync(async (req, res) => {
  const { visits } = await urlService.getVisitsById(req.params.shortId);
  res.status(httpStatus.CREATED).send(visits);
});

const getUrl = catchAsync(async (req, res) => {
  const url = await urlService.updateUrlVisits(req.params.shortId);

  if (!url) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Url not found');
  }

  res.redirect(url.origin);
});

 
module.exports = {
    createUrl,
    getUrl,
    getUrlVisits
};
