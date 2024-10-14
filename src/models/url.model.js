const mongoose = require('mongoose');
const { customAlphabet, urlAlphabet } = require('nanoid');
const { toJSON, paginate } = require('./plugins');
const nanoid = customAlphabet(urlAlphabet, 5)

const urlSchema = mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    visits: [{ timestamp: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
urlSchema.plugin(toJSON);
urlSchema.plugin(paginate);

urlSchema.pre('validate', async function (next) {
    const url = this;
    if (!url.shortId) {
        url.shortId = nanoid();
    }
    next();
  });
  

/**
 * @typedef UrlModel
 */
const UrlModel = mongoose.model('Url', urlSchema);

module.exports = UrlModel;
