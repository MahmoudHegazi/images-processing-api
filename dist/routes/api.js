"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = __importDefault(require("./api/images"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/images', images_1.default);
// workign endpoint (this always return 200)
apiRouter.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res
        .send(JSON.stringify('Welcome To Image Processing API Options: [width, height, blur, rotate]'))
        .status(200)
        .end();
});
exports.default = apiRouter;
