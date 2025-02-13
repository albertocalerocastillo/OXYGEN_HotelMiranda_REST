"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateBooking = void 0;
const booking_validator_1 = require("../validators/booking.validator");
const validateCreateBooking = (req, res, next) => {
    const { error } = booking_validator_1.validateBookingCreate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateCreateBooking = validateCreateBooking;
