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
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
// this function get the dirname and filename with or without extension also with capital or small and return the full file path if this file exist or false if not exist
function getFileByName(dirname, fname) {
    return __awaiter(this, void 0, void 0, function () {
        var filename, dirPath, dirItems, approvedFiles, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = fname.trim().split('.')[0].toLowerCase();
                    dirPath = path_1.default.resolve(dirname);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.readdir(dirPath, { withFileTypes: true })];
                case 2:
                    dirItems = _a.sent();
                    approvedFiles = dirItems
                        .filter(function (fItem) {
                        return fItem.isFile();
                    })
                        .filter(function (existFile) {
                        var formatedExistN = existFile.name
                            .trim()
                            .split('.')[0]
                            .toLowerCase();
                        // check if the filename exist is equal to the parameter filename
                        return formatedExistN === filename;
                    });
                    if (approvedFiles.length > 0) {
                        return [2 /*return*/, path_1.default.join(dirPath, approvedFiles[0].name)];
                    }
                    else {
                        return [2 /*return*/, ''];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    // unexpected error return false can not get file
                    console.log(error_1);
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// create new file and write to it without open it
function createNewFile(filepath, content) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, newFile, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    filePath = path_1.default.resolve(filepath);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.writeFile(filePath, content)];
                case 2:
                    newFile = _b.sent();
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// note this generator ignore if the optional parameter not exist and return the name (also it ignore 0 or any falsy) eg images?filename=dragon2&width=150&height=150&blur=0 is dragon2_150_150 with no blur cus it 0 this cache both in one
function getThumbFilePath(ext) {
    var vars = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        vars[_i - 1] = arguments[_i];
    }
    var newFileName = '';
    vars.forEach(function (nameVar, index) {
        if (nameVar) {
            newFileName += String(nameVar)
                .trim()
                .toLowerCase();
            newFileName += '_';
        }
    });
    var filepath = path_1.default.resolve('images/thumb', newFileName.slice(0, newFileName.length - 1) + '.' + ext);
    return filepath;
}
var isFileExist = function (fpath) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, myFile, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filePath = path_1.default.resolve(fpath);
                console.log(filePath);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.open(filePath, 'r')];
            case 2:
                myFile = _a.sent();
                return [2 /*return*/, true];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { getFileByName: getFileByName, createNewFile: createNewFile, getThumbFilePath: getThumbFilePath, isFileExist: isFileExist };
