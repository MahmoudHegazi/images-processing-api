"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var images_1 = __importDefault(require("./api/images"));
var apiRouter = (0, express_1.Router)();
apiRouter.use('/images', images_1.default);
apiRouter.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res
        .send(JSON.stringify('Welcome To Image Processing API Options: [width, height, blur, rotate]'))
        .status(200)
        .end();
});
exports.default = apiRouter;
