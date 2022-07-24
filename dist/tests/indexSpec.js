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
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Image Processing API UNIT TEST', () => __awaiter(void 0, void 0, void 0, function* () {
    describe('root Endpoint:', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should redirect to /api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/');
            expect(res.redirect).toBeTruthy();
        }));
    }));
    describe('API Endpoint: ', () => __awaiter(void 0, void 0, void 0, function* () {
        it('/api endpoint respond with 200 status and display valid response', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api');
            expect(res.status).toBe(200);
            expect(res.body).toEqual('Welcome To Image Processing API Options: [width, height, blur, rotate]');
        }));
    }));
}));
