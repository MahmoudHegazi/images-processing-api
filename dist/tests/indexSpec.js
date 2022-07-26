"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
//supertest.agent(app.listen(3001, ()=>{console.log('try this')}));
fdescribe('Image Processing API UNIT TEST', () => {
    console.log("hi");
    describe('root Endpoint:', () => {
        it('should respond with status 200 as root endpoint', async () => {
            const res = await request.get('/');
            expect(res.status).toBe(200);
        });
    });
    describe('API Endpoint: ', () => {
        it('/api endpoint respond with 200 status and display valid response', async () => {
            const res = await request.get('/api');
            expect(res.status).toBe(200);
            expect(res.body).toEqual('Welcome To Image Processing API Options: [width, height, blur, rotate]');
        });
    });
});
