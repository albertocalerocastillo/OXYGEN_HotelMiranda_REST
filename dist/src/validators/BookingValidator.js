"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookingCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateBookingCreate = joi_1.default.object({
    guest: joi_1.default.string().required(),
    orderDate: joi_1.default.string().required(),
    checkInDate: joi_1.default.string().required(),
    checkInTime: joi_1.default.string().required(),
    checkOutDate: joi_1.default.string().required(),
    checkOutTime: joi_1.default.string().required(),
    specialRequest: joi_1.default.string(),
    roomType: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    specialRequestType: joi_1.default.string(),
});
