const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const auth = require('../../middlewares/auth');
const { urlController } = require('../../controllers');
const { urlValidation } = require('../../validations');

const router = express.Router();

router.post('/', validate(urlValidation.createUrl), urlController.createUrl);
router.post('/:shortId/visits', urlController.getUrlVisits);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL shortening and tracking
 */

/**
 * @swagger
 * paths:
 *  /url:
 *    post:
 *      summary: Create a new shortened URL
 *      description: This endpoint allows users to create a new shortened URL.
 *      tags: [URLs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - original
 *              properties:
 *                original:
 *                  type: string
 *                  format: uri
 *                  description: The original URL to be shortened
 *              example:
 *                original: https://example.com
 *      responses:
 *        '201':
 *          description: URL successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  shortId:
 *                    type: string
 *                    description: The shortened URL
 *                  original:
 *                    type: string
 *                    description: The original URL
 *        '400':
 *          description: Invalid URL or validation error
 *        '500':
 *          description: Internal server error
*/

/**
 * @swagger
 *  /url/{shortId}/visits:
 *    post:
 *      summary: Get the visits for a specific shortened URL
 *      description: This endpoint returns the number of visits for the URL identified by the provided shortId.
 *      tags: [URLs]
 *      parameters:
 *        - in: path
 *          name: shortId
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the shortened URL
 *      responses:
 *        '200':
 *          description: Visit count retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: The shortened URL ID
 *                  visits:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        timestamp:
 *                          type: integer
 *                          format: date
 *              example:
 *                _id: abc123
 *                visits: [{ timestamp: 1728902471819 }]
 *        '404':
 *          description: URL not found
 *        '500':
 *          description: Internal server error
*/