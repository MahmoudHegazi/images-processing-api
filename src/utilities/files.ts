import {promises as fsPromises} from 'fs';
import path from 'path';
import fs from 'fs';

interface asyncResult {
  success: boolean,
  error?: string
}

// this function get the filename parameter and search for image in full folder
async function readByName(filename: string): Promise<asyncResult>{
  const finalFileName: string = filename.split('.')[0].toLowerCase().trim();
  const filepath = path.resolve('utilities', '..', 'src', '..', 'images', 'full', finalFileName);
  try {
    const fileString = await fsPromises.readFile(filepath, 'utf-8');
    return {success: true};
  } catch (err) {
    return {success: false, error: ((err as unknown) as string)};
  }
}
// this function get the dirname and filename with or without extension also with capital or small and return the full file path if this file exist or false if not exist
async function getFileByName(dirname: string, fname: string): Promise<string>{
  const filename =  fname.trim().split('.')[0].toLowerCase(); // get filename only
  const dirPath = path.resolve(dirname);
  try {
    const dirItems = await fsPromises.readdir(dirPath, {withFileTypes: true});
    // first filter the dir to get only the files names without extesion and then filter final list to check the filename exist or not
    const approvedFiles = dirItems.filter( (fItem)=>{ return fItem.isFile(); }).filter(
      (existFile)=>{
       const formatedExistN = existFile.name.trim().split('.')[0].toLowerCase();
       // check if the filename exist is equal to the parameter filename
       return formatedExistN === filename;
     });

     if (approvedFiles.length > 0) {
        return path.join(dirPath, approvedFiles[0].name);
     } else {
        return '';
     }
  } catch (error) {
    // unexpected error return false can not get file
    console.log(error);
    return '';
  }
}

// create new file and write to it without open it
async function createNewFile(filepath: string, content: string|Buffer): Promise<boolean> {
  const filePath: string = path.resolve(filepath);
  try {
    const newFile = await fsPromises.writeFile(filePath, content);
    return true;
  } catch {
    return false;
  }
}


// note this generator ignore if the optional parameter not exist and return the name (also it ignore 0 any falsy)
function getThumbFilePath(ext: string, ...vars:(string|number|undefined)[]){
  let newFileName: string = '';
  vars.forEach( (nameVar: unknown, index: number)=>{
    if (nameVar){
      console.log(nameVar, String((nameVar as unknown) as string).trim().toLowerCase());
      newFileName += String((nameVar as unknown) as string).trim().toLowerCase();
      newFileName += '_';
    }
  });
  const filepath = path.resolve('images/thumb', newFileName.slice(0,newFileName.length-1) + '.' + ext);
  return filepath;
}




export default {getFileByName, createNewFile, getThumbFilePath};
