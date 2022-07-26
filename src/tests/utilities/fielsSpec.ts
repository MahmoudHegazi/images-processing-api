import files from '../../utilities/files';
import path from 'path';
import { promises as fsPromises } from 'fs';

describe('Tesing utilities', (): void => {
  describe('Testing getFileByName Function:', (): void => {
    describe('Testing function with Full Folder', (): void => {
      it('should return the filepath for dragon2 because it exist on full path', async (): Promise<void> => {
        // no matter capital or extension
        const expectedPath = path.resolve('images/full', 'dragon2.png'); // dynamic get path of dragon2.png file in full folder
        const functionReturnPath = await files.getFileByName(
          'images/full',
          'dragon2'
        );
        expect(functionReturnPath).toEqual(expectedPath);
      });

      it('function returns the filepath for file dragon2.png with file extension', async (): Promise<void> => {
        // no matter capital or extension
        const currentFilePath = path.resolve('images/full', 'dragon2.png'); // dynamic get path of dragon2.png file in full folder
        const functionReturnPath = await files.getFileByName(
          'images/full',
          'dragon2.png'
        );
        expect(functionReturnPath).toEqual(currentFilePath);
      });

      it('Return empty string if file not found', async (): Promise<void> => {
        const functionReturn = await files.getFileByName(
          'images/full',
          'wrongfile.png'
        );
        expect(functionReturn).toBeFalsy();
      });
    });

    describe('Testing function with thumb Folder', (): void => {
      it('should return the filepath for dragon2_150_150_1_180 because dragon2_80_80_3_12.png is exist on thumb folder', async () => {
        // no matter capital or extension
        const expectedPath = path.resolve(
          'images/thumb',
          'dragon2_80_80_3_12.png'
        ); // dynamic get path of dragon2.png file in thumb folder
        const functionReturnPath = await files.getFileByName(
          'images/thumb',
          'dragon2_80_80_3_12'
        );
        expect(functionReturnPath).toEqual(expectedPath);
      });
    });
  });
  /* Function 2 */
  describe('Testing createNewFile Function:', (): void => {
    it('Test if the function create new file in tests folder that contains hello world', async (): Promise<void> => {
      const filePath = path.resolve('src/tests/newFile.txt');
      await files.createNewFile(filePath, 'hello world');
      const fileContent = await fsPromises.readFile(filePath, 'utf-8');
      expect(fileContent).toEqual('hello world');
    });
  });

  /* Function 3 */
  describe('Testing getThumbFilePath Function:', (): void => {
    it('return valid filepath for the given parameters \n [filename=dragon2, width=150, height=150, blur=undefined, rotate=12] \n expected: full path for dragon2_150_150_12.png', async (): Promise<void> => {
      const expectedPath = path.resolve(
        'images/thumb',
        'dragon2_150_150_12.png'
      );
      const functionReturnPath = files.getThumbFilePath(
        'png',
        'dragon2',
        150,
        '150',
        undefined,
        12
      );
      console.log(expectedPath);
      expect(functionReturnPath).toEqual(expectedPath);
    });
    // this function used in latest middleware so it always get the parameters or undefined parameters
    it('ignore blur=0 and rotate=0 and not include in filename', async (): Promise<void> => {
      const expectedPath = path.resolve('images/thumb', 'dragon2_150_150.png');
      const functionReturnPath = files.getThumbFilePath(
        'png',
        'dragon2',
        150,
        '150',
        0,
        0
      );
      expect(functionReturnPath).toEqual(expectedPath);
    });
  });
});
