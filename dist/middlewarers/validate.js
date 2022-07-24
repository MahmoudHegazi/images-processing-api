'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const required_validator = (req, res, next) => {
  console.log('hi');
  next();
};
const type_validator = (req, res, next) => {
  console.log('1');
  next();
};
exports.default = { required_validator, type_validator };
