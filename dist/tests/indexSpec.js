'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const index_1 = __importDefault(require('../index'));
const request = (0, supertest_1.default)(index_1.default);
describe('Image Processing API UNIT TEST', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    describe('root Endpoint:', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        it('should redirect to /api endpoint');
      }));
    describe('API Endpoint: ', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        it('/api endpoint respond with 200 status and display valid response', () =>
          __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api');
            expect(res.status).toBe(200);
            expect(
              res.body
            ).toBe(`Image processing API to resize and host your images in one place You can
        Resize/view your Images Via: api/images?filename=[Enter image name]&width=
        [image new width]&height=[image new height] you can later view the resized images
      `);
          }));
        it('/api endpoint if query parameter provided redirect to /images endpoint with status 200', () =>
          __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get(
              '/api?filename=fjord.jpg&width=150&height=150'
            );
            expect(res.status).toBe(200);
          }));
      }));
    describe('Images Endpoint:', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        describe('upload image and resize it without cache:', () =>
          __awaiter(void 0, void 0, void 0, function* () {
            it('images processsing end and api respond with status 200', () =>
              __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request.get(
                  '/images?filename=encenadaport.jpg&width=150&height=150'
                );
                expect(res.status).toBe(200);
              }));
            it('throw error 400 if filename, size and width are not provided', () =>
              __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request.get(
                  '/images?encenadaport.jpg&width=150&height=150'
                );
                expect(res.status).toBe(400);
              }));
          }));
        describe('serve image cached images:', () =>
          __awaiter(void 0, void 0, void 0, function* () {}));
      }));
  }));
