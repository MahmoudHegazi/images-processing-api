"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = __importDefault(require("../utilities/files"));
const sharp_1 = __importDefault(require("sharp"));
// page have type return
const process_image = async (req, res, next) => {
    const filename = req.query.filename;
    // direct get typed number parameter
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const filenameWithoutExt = filename.split('.')[0];
    if (res.locals.cached) {
        // incase image was cached ignore this middleware (performance blockchain middlewares)
        next();
    }
    else {
        try {
            const resiezedf = (0, sharp_1.default)(res.locals.imageFullPath).resize(width, height);
            // apply blur if any (It valid number checked)
            if (res.locals.blur) {
                resiezedf.blur(res.locals.blur);
            }
            if (res.locals.rotate) {
                resiezedf.rotate(res.locals.rotate);
            }
            const buffer = await resiezedf.toBuffer();
            const fileext = res.locals.imageFullPath.split('.')[res.locals.imageFullPath.split('.').length - 1];
            // genrate the new thumb filename passed on all parameters required and optional Make sure to call this function with this order
            const newFilePath = files_1.default.getThumbFilePath(fileext, filenameWithoutExt, width, height, res.locals.blur, res.locals.rotate);
            await files_1.default.createNewFile(newFilePath, buffer);
            res.locals.processd_image = newFilePath;
            next();
        }
        catch (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 422;
            res.end(JSON.stringify('unexpected error occured while processing file'));
        }
    }
};
exports.default = process_image;
