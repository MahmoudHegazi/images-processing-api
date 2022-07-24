'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const images_1 = __importDefault(require('./api/images'));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/images', images_1.default);
apiRouter.get('/', (req, res) => {
  // if user visit api route with filename, width, and height it maybe wrong and redirect him to images api with same query for better UX
  if (req.query.filename && req.query.width && req.query.height) {
    res.redirect(
      `api/images?filename${req.query.filename}&width=${req.query.width}&height=${req.query.height}`
    );
  } else {
    res.send(req.query.filename);
    // display info in main route '/api' how to use the API
    res.send(`Image processing API to resize and host your images in one place You can
      Resize/view your Images Via: api/images?filename=[Enter image name]&width=
      [image new width]&height=[image new height] you can later view the resized images
    `);
  }
});
exports.default = apiRouter;
