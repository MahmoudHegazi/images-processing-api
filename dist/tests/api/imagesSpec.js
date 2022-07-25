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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var files_1 = __importDefault(require("../../utilities/files"));
var request = (0, supertest_1.default)(index_1.default);
describe('Images Endpoint:', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe('MiddleWare 1: Validation', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('throw error 400 if one of required parameters like filename are not provided', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request.get('/api/images?encenadaport.jpg&width=150&')];
                            case 1:
                                res = _a.sent();
                                expect(res.body).toEqual('one or more required parameters are missing: filename,height');
                                expect(res.status).toBe(400);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe('MiddleWare 2: Types and Optional Parameter validator', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                describe('Types Check Only: ', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it('using invalid parameters will return 400 error with message to describe which types are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, request.get('/api/images?filename=encenadaport&width=hi&height=wrong&blur=hey&rotate=180')];
                                    case 1:
                                        res = _a.sent();
                                        expect(res.status).toBe(400);
                                        expect(res.body).toEqual('one or more parameters have invalid types: width: number,height: number,blur: number');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                describe('Optional Parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it('confirm not using optional parameters will not lead to errors', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, request.get('/api/images?filename=encenadaport&height=120&width=120')];
                                    case 1:
                                        res = _a.sent();
                                        expect(res.status).toBe(200);
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
        describe('MiddleWare 3: Validate File exist in Full Folder', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('should throw 404 error if filename not found in cached first or in full folder', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request.get('/api/images?filename=hello&width=150&height=150')];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(404);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe('MiddleWare 4: Processing Image', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('confirm creating new image will created new file thumb dir with the query parameters and endpoint responds with 200', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res, isExpectedFileExist;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request.get('/api/images?filename=fjord.jpg&width=150&height=150&blur=1&rotate=180')];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, files_1.default.isFileExist('images/thumb/fjord_150_150_1_180.jpg')];
                            case 2:
                                isExpectedFileExist = _a.sent();
                                expect(isExpectedFileExist).toBeTruthy();
                                expect(res.status).toBe(200);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe('Callback: Test Success Response with new resized image', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('confirm that requesting new image return valid response with status 200', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request.get('/api/images?filename=encenadaport&width=193&height=170&blur=0&rotate=180')];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(200);
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
