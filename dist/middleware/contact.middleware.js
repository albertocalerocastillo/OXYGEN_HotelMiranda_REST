"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateContact = void 0;
const contact_validator_1 = require("../validators/contact.validator");
const validateCreateContact = (req, res, next) => {
    const { error } = contact_validator_1.validateContactCreate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateCreateContact = validateCreateContact;
