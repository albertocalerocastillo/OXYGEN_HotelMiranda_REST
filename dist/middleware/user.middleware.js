"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = void 0;
const user_validator_1 = require("../validators/user.validator");
const validateCreateUser = (req, res, next) => {
    const { error } = user_validator_1.validateUserCreate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = (req, res, next) => {
    const { error } = user_validator_1.validateUserUpdate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateUpdateUser = validateUpdateUser;
