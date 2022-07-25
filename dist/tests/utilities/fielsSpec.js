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
var files_1 = __importDefault(require("../../utilities/files"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
describe('Tesing utilities', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe('Testing getFileByName Function:', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                describe('Testing function with Full Folder', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it('should return the filepath for dragon2 because it exist on full path', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var expectedPath, functionReturnPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        expectedPath = path_1.default.resolve('images/full', 'dragon2.png');
                                        return [4 /*yield*/, files_1.default.getFileByName('images/full', 'dragon2')];
                                    case 1:
                                        functionReturnPath = _a.sent();
                                        expect(functionReturnPath).toEqual(expectedPath);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it('function returns the filepath for file dragon2.png with file extension', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var currentFilePath, functionReturnPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        currentFilePath = path_1.default.resolve('images/full', 'dragon2.png');
                                        return [4 /*yield*/, files_1.default.getFileByName('images/full', 'dragon2.png')];
                                    case 1:
                                        functionReturnPath = _a.sent();
                                        expect(functionReturnPath).toEqual(currentFilePath);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it('Return empty string if file not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var functionReturn;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, files_1.default.getFileByName('images/full', 'wrongfile.png')];
                                    case 1:
                                        functionReturn = _a.sent();
                                        expect(functionReturn).toBeFalsy();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                describe('Testing function with thumb Folder', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it('should return the filepath for dragon2_150_150_1_180 because dragon2_80_80_3_12.png is exist on thumb folder', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var expectedPath, functionReturnPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        expectedPath = path_1.default.resolve('images/thumb', 'dragon2_80_80_3_12.png');
                                        return [4 /*yield*/, files_1.default.getFileByName('images/thumb', 'dragon2_80_80_3_12')];
                                    case 1:
                                        functionReturnPath = _a.sent();
                                        expect(functionReturnPath).toEqual(expectedPath);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        /* Function 2 */
        describe('Testing createNewFile Function:', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('Test if the function create new file in tests folder that contains hello world', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var filePath, newFile, fileContent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                filePath = path_1.default.resolve('src/tests/newFile.txt');
                                return [4 /*yield*/, files_1.default.createNewFile(filePath, 'hello world')];
                            case 1:
                                newFile = _a.sent();
                                return [4 /*yield*/, fs_1.promises.readFile(filePath, 'utf-8')];
                            case 2:
                                fileContent = _a.sent();
                                expect(fileContent).toEqual('hello world');
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        /* Function 3 */
        describe('Testing getThumbFilePath Function:', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('return valid filepath for the given parameters \n [filename=dragon2, width=150, height=150, blur=undefined, rotate=12] \n expected: full path for dragon2_150_150_12.png', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var expectedPath, functionReturnPath;
                    return __generator(this, function (_a) {
                        expectedPath = path_1.default.resolve('images/thumb', 'dragon2_150_150_12.png');
                        functionReturnPath = files_1.default.getThumbFilePath('png', 'dragon2', 150, '150', undefined, 12);
                        console.log(expectedPath);
                        expect(functionReturnPath).toEqual(expectedPath);
                        return [2 /*return*/];
                    });
                }); });
                // this function used in latest middleware so it always get the parameters or undefined parameters
                it('ignore blur=0 and rotate=0 and not include in filename', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var expectedPath, functionReturnPath;
                    return __generator(this, function (_a) {
                        expectedPath = path_1.default.resolve('images/thumb', 'dragon2_150_150.png');
                        functionReturnPath = files_1.default.getThumbFilePath('png', 'dragon2', 150, '150', 0, 0);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
