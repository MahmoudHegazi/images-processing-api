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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = __importDefault(require("../utilities/files"));
var validate_cachedFile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var strName, strWidth, strHeight, cached_name, fileCached;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                strName = req.query.filename
                    .trim()
                    .toLowerCase();
                strWidth = req.query.width
                    .trim()
                    .toLowerCase();
                strHeight = req.query.height
                    .trim()
                    .toLowerCase();
                cached_name = "".concat(strName, "_").concat(strWidth, "_").concat(strHeight);
                // add the optional params to name if set in previous middleware (same order when called getThumbFilePath )
                if (res.locals.blur) {
                    // note 0 is false so blur=0 in url equal to no blur added and image name will have no blur
                    cached_name += '_' + String(res.locals.blur);
                }
                if (res.locals.rotate) {
                    cached_name += '_' + String(res.locals.rotate);
                }
                return [4 /*yield*/, files_1.default.getFileByName('images/thumb', cached_name)];
            case 1:
                fileCached = _a.sent();
                // this just fast check for existing before it not shuold return errors
                if (fileCached) {
                    res.locals.cached = true;
                    res.locals.imageThumbPath = fileCached;
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
// Files Middleware 3 [this midleware to check if the filename exist in full folder or not ] This consider last layer before processing file
var validate_file_existince = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fileExistInFull;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!res.locals.cached) return [3 /*break*/, 1];
                // if image cached move to callback
                next();
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, files_1.default.getFileByName('images/full', req.query.filename)];
            case 2:
                fileExistInFull = _a.sent();
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
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { validate_cachedFile: validate_cachedFile, validate_file_existince: validate_file_existince };
