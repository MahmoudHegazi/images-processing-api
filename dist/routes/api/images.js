"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../../middlewarers/validate"));
const express_1 = require("express");
const file_validate_1 = __importDefault(require("../../middlewarers/file_validate"));
const image_processer_1 = __importDefault(require("../../middlewarers/image_processer"));
const imageRouter = (0, express_1.Router)();
/* This is final step reached with all errors handled in middlewares */
// this to validate the required query parameters are exist and types of each one and return error for each parm has issue
imageRouter.use([validate_1.default.required_validator, validate_1.default.type_validator]);
// check if file cached first set locals cache first and set local cache and stop other midlewares, if not cached check file in full folder validtion to start processing
imageRouter.use(file_validate_1.default.validate_cachedFile, file_validate_1.default.validate_file_existince);
// use the process_image midle ware to create new images and set res.locals.processd_image or end the request incase of errors blockchain small
imageRouter.use(image_processer_1.default);
// this callback is finall one error free (res.locals.cached means the image already exist) (res.locals.processd_image: new image created)
imageRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.cached) {
        console.log('cached Served First'); // this comment to guide about cahche and new processed image
        res.sendFile(res.locals.imageThumbPath);
    }
    else {
        console.log('new Resized Image:');
        res.sendFile(res.locals.processd_image);
        // .setHeader("Last-Modified",'Sun, 24 Jul 2022 02:30:20 GMT') set header last-modifed for cache
    }
}));
exports.default = imageRouter;
