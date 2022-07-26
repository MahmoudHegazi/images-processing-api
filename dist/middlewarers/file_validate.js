"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = __importDefault(require("../utilities/files"));
// page have type return
const validate_cachedFile = async (req, res, next) => {
    const strName = req.query.filename
        .trim()
        .toLowerCase();
    const strWidth = req.query.width
        .trim()
        .toLowerCase();
    const strHeight = req.query.height
        .trim()
        .toLowerCase();
    // create name first with required parms
    let cached_name = `${strName}_${strWidth}_${strHeight}`;
    // add the optional params to name if set in previous middleware (same order when called getThumbFilePath )
    if (res.locals.blur) {
        // note 0 is false so blur=0 in url equal to no blur added and image name will have no blur
        cached_name += '_' + String(res.locals.blur);
    }
    if (res.locals.rotate) {
        cached_name += '_' + String(res.locals.rotate);
    }
    const fileCached = await files_1.default.getFileByName('images/thumb', cached_name);
    // this just fast check for existing before it not shuold return errors
    if (fileCached) {
        res.locals.cached = true;
        res.locals.imageThumbPath = fileCached;
    }
    next();
};
// Files Middleware 3 [this midleware to check if the filename exist in full folder or not ] This consider last layer before processing file
const validate_file_existince = async (req, res, next) => {
    if (res.locals.cached) {
        // if image cached move to callback
        next();
    }
    else {
        // getFileByName: if there are image file in full folder same like filename will return filepath else return false
        const fileExistInFull = await files_1.default.getFileByName('images/full', req.query.filename);
        //const fileExistInFull = await files.getFileByName('images/thumb', (req.query.filename as unknown) as string);
        if (fileExistInFull) {
            res.locals.cached = false;
            res.locals.imageFullPath = fileExistInFull;
            next();
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            res.end(JSON.stringify('requested file is not found'));
        }
    }
};
exports.default = { validate_cachedFile, validate_file_existince };
