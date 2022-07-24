'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const validate_1 = __importDefault(require('../../middlewarers/validate'));
const express_1 = require('express');
const imageRouter = (0, express_1.Router)();
console.log(validate_1.default.required_validator);
console.log(validate_1.default.type_validator);
imageRouter.use([
  validate_1.default.required_validator,
  validate_1.default.type_validator
]);
exports.default = imageRouter;
