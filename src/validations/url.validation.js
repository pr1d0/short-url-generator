const Joi = require('joi');

const createUrl = {
  body: Joi.object().keys({
    origin: Joi.string().required().uri(),
  }),
};


module.exports = {
  createUrl,
};
