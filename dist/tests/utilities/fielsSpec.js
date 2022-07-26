"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = __importDefault(require("../../utilities/files"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
describe('Tesing utilities', () => {
    describe('Testing getFileByName Function:', () => {
        describe('Testing function with Full Folder', () => {
            it('should return the filepath for dragon2 because it exist on full path', async () => {
                // no matter capital or extension
                const expectedPath = path_1.default.resolve('images/full', 'dragon2.png'); // dynamic get path of dragon2.png file in full folder
                const functionReturnPath = await files_1.default.getFileByName('images/full', 'dragon2');
                expect(functionReturnPath).toEqual(expectedPath);
            });
            it('function returns the filepath for file dragon2.png with file extension', async () => {
                // no matter capital or extension
                const currentFilePath = path_1.default.resolve('images/full', 'dragon2.png'); // dynamic get path of dragon2.png file in full folder
                const functionReturnPath = await files_1.default.getFileByName('images/full', 'dragon2.png');
                expect(functionReturnPath).toEqual(currentFilePath);
            });
            it('Return empty string if file not found', async () => {
                const functionReturn = await files_1.default.getFileByName('images/full', 'wrongfile.png');
                expect(functionReturn).toBeFalsy();
            });
        });
        describe('Testing function with thumb Folder', () => {
            it('should return the filepath for dragon2_150_150_1_180 because dragon2_80_80_3_12.png is exist on thumb folder', async () => {
                // no matter capital or extension
                const expectedPath = path_1.default.resolve('images/thumb', 'dragon2_80_80_3_12.png'); // dynamic get path of dragon2.png file in thumb folder
                const functionReturnPath = await files_1.default.getFileByName('images/thumb', 'dragon2_80_80_3_12');
                expect(functionReturnPath).toEqual(expectedPath);
            });
        });
    });
    /* Function 2 */
    describe('Testing createNewFile Function:', () => {
        it('Test if the function create new file in tests folder that contains hello world', async () => {
            const filePath = path_1.default.resolve('src/tests/newFile.txt');
            await files_1.default.createNewFile(filePath, 'hello world');
            const fileContent = await fs_1.promises.readFile(filePath, 'utf-8');
            expect(fileContent).toEqual('hello world');
        });
    });
    /* Function 3 */
    describe('Testing getThumbFilePath Function:', () => {
        it('return valid filepath for the given parameters \n [filename=dragon2, width=150, height=150, blur=undefined, rotate=12] \n expected: full path for dragon2_150_150_12.png', async () => {
            const expectedPath = path_1.default.resolve('images/thumb', 'dragon2_150_150_12.png');
            const functionReturnPath = files_1.default.getThumbFilePath('png', 'dragon2', 150, '150', undefined, 12);
            console.log(expectedPath);
            expect(functionReturnPath).toEqual(expectedPath);
        });
        // this function used in latest middleware so it always get the parameters or undefined parameters
        it('ignore blur=0 and rotate=0 and not include in filename', async () => {
            const expectedPath = path_1.default.resolve('images/thumb', 'dragon2_150_150.png');
            const functionReturnPath = files_1.default.getThumbFilePath('png', 'dragon2', 150, '150', 0, 0);
            expect(functionReturnPath).toEqual(expectedPath);
        });
    });
});
