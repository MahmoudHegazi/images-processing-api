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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const files_1 = __importDefault(require("../../utilities/files"));
const request = (0, supertest_1.default)(index_1.default);
describe('Images Endpoint:', () => __awaiter(void 0, void 0, void 0, function* () {
    describe('MiddleWare 1: Validation', () => __awaiter(void 0, void 0, void 0, function* () {
        it('throw error 400 if one of required parameters like filename are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?encenadaport.jpg&width=150&');
            expect(res.body).toEqual("one or more required parameters are missing: filename,height");
            expect(res.status).toBe(400);
        }));
    }));
    describe('MiddleWare 2: Types and Optional Parameter validator', () => __awaiter(void 0, void 0, void 0, function* () {
        describe('Types Check Only: ', () => __awaiter(void 0, void 0, void 0, function* () {
            it('using invalid parameters will return 400 error with message to describe which types are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
                // this for both required and optional [incase using optional user must enter valid value for the parameter or display error] [maybe image be 1.png no need check filename]
                const res = yield request.get('/api/images?filename=encenadaport&width=hi&height=wrong&blur=hey&rotate=180');
                expect(res.status).toBe(400);
                expect(res.body).toEqual("one or more parameters have invalid types: width: number,height: number,blur: number");
            }));
        }));
        describe('Optional Parameters', () => __awaiter(void 0, void 0, void 0, function* () {
            it('confirm not using optional parameters will not lead to errors', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request.get('/api/images?filename=encenadaport&height=120&width=120');
                expect(res.status).toBe(200);
            }));
        }));
    }));
    describe('MiddleWare 3: Validate File exist in Full Folder', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should throw 404 error if filename not found in cached first or in full folder', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=hello&width=150&height=150');
            expect(res.status).toBe(404);
        }));
    }));
    describe('MiddleWare 4: Processing Image', () => __awaiter(void 0, void 0, void 0, function* () {
        it('confirm creating new image will created new file thumb dir with the query parameters and endpoint responds with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=fjord.jpg&width=150&height=150&blur=1&rotate=180');
            const isExpectedFileExist = yield files_1.default.isFileExist('images/thumb/fjord_150_150_1_180.jpg'); // confirm the expected file exist in thumb dir
            expect(isExpectedFileExist).toBeTruthy();
            expect(res.status).toBe(200);
        }));
    }));
    describe('Callback: Test Success Response with new resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        it('confirm that requesting new image return valid response with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images?filename=encenadaport&width=193&height=170&blur=0&rotate=180');
            expect(res.status).toBe(200);
        }));
    }));
}));
