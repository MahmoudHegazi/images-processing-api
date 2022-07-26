"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// this function get the dirname and filename with or without extension also with capital or small and return the full file path if this file exist or false if not exist
async function getFileByName(dirname, fname) {
    const filename = fname.trim().split('.')[0].toLowerCase(); // get filename only
    const dirPath = path_1.default.resolve(dirname);
    try {
        const dirItems = await fs_1.promises.readdir(dirPath, { withFileTypes: true });
        // first filter the dir to get only the files names without extesion and then filter final list to check the filename exist or not
        const approvedFiles = dirItems
            .filter((fItem) => {
            return fItem.isFile();
        })
            .filter((existFile) => {
            const formatedExistN = existFile.name
                .trim()
                .split('.')[0]
                .toLowerCase();
            // check if the filename exist is equal to the parameter filename
            return formatedExistN === filename;
        });
        if (approvedFiles.length > 0) {
            return path_1.default.join(dirPath, approvedFiles[0].name);
        }
        else {
            return '';
        }
    }
    catch (error) {
        // unexpected error return false can not get file
        console.log(error);
        return '';
    }
}
// create new file and write to it without open it
async function createNewFile(filepath, content) {
    const filePath = path_1.default.resolve(filepath);
    try {
        await fs_1.promises.writeFile(filePath, content);
        return true;
    }
    catch {
        return false;
    }
}
// note this generator ignore if the optional parameter not exist and return the name (also it ignore 0 or any falsy) eg images?filename=dragon2&width=150&height=150&blur=0 is dragon2_150_150 with no blur cus it 0 this cache both in one
function getThumbFilePath(ext, ...vars) {
    let newFileName = '';
    vars.forEach((nameVar) => {
        if (nameVar) {
            newFileName += String(nameVar)
                .trim()
                .toLowerCase();
            newFileName += '_';
        }
    });
    const filepath = path_1.default.resolve('images/thumb', newFileName.slice(0, newFileName.length - 1) + '.' + ext);
    return filepath;
}
const isFileExist = async (fpath) => {
    const filePath = path_1.default.resolve(fpath);
    console.log(filePath);
    try {
        await fs_1.promises.open(filePath, 'r');
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.default = { getFileByName, createNewFile, getThumbFilePath, isFileExist };
