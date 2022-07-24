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
const files_1 = __importDefault(require("../utilities/files"));
const sharp_1 = __importDefault(require("sharp"));
const process_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    // direct get typed number parameter
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const filenameWithoutExt = filename.split('.')[0];
    if (res.locals.cached) { // incase image was cached ignore this middleware (performance blockchain middlewares)
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
            const buffer = yield resiezedf.toBuffer();
            const fileext = res.locals.imageFullPath.split('.')[res.locals.imageFullPath.split('.').length - 1];
            // genrate the new thumb filename passed on all parameters required and optional Make sure to call this function with this order
            const newFilePath = files_1.default.getThumbFilePath(fileext, filenameWithoutExt, width, height, res.locals.blur, res.locals.rotate);
            //const newImagePath = path.resolve(newFilename);
            const newProcessedImage = yield files_1.default.createNewFile(newFilePath, buffer);
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
});
exports.default = process_image;
