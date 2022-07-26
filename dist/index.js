"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const cmd_1 = __importDefault(require("./utilities/cmd")); // for health check operation
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', api_1.default);
// changed redirect and make it return json Object with status 200
app.get('/', (_req, res) => {
    res
        .send(JSON.stringify({
        message: 'Hello From Image-processing-api root endpoint'
    }))
        .status(200)
        .end();
});
app.get('/health', async (_req, res) => {
    //await asyncExc('touch example.txt');
    cmd_1.default.lsExample();
    cmd_1.default.npmExample();
    res
        .send(JSON.stringify({ health: 'OK' }))
        .status(200)
        .end();
});
app.listen(port, () => {
    console.log(`Server is Runing On: ${port}`);
});
exports.default = app;
