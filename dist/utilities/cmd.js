"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const exec = util_1.default.promisify(child_process_1.default.exec);
async function lsExample() {
    try {
        const { stdout, stderr } = await exec('ls');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }
    catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
}
async function npmExample() {
    try {
        const { stdout, stderr } = await exec('npm run test');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }
    catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
}
exports.default = {
    lsExample,
    npmExample
};
