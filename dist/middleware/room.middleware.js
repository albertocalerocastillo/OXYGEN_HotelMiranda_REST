"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateRoom = exports.validateCreateRoom = void 0;
const room_validator_1 = require("../validators/room.validator");
const validateCreateRoom = (req, res, next) => {
    const { error } = room_validator_1.validateRoomCreate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateCreateRoom = validateCreateRoom;
const validateUpdateRoom = (req, res, next) => {
    const { error } = room_validator_1.validateRoomUpdate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateUpdateRoom = validateUpdateRoom;
