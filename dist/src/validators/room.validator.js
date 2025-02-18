"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoomUpdate = exports.validateRoomCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateRoomCreate = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string(),
    price: joi_1.default.number().required(),
    capacity: joi_1.default.number().integer().required(),
    photo: joi_1.default.string(),
    number: joi_1.default.string(),
    type: joi_1.default.string(),
    amenities: joi_1.default.string(),
    offerPrice: joi_1.default.number(),
    status: joi_1.default.string(),
});
exports.validateRoomUpdate = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.number(),
    capacity: joi_1.default.number().integer(),
    photo: joi_1.default.string(),
    number: joi_1.default.string(),
    type: joi_1.default.string(),
    amenities: joi_1.default.string(),
    offerPrice: joi_1.default.number(),
    status: joi_1.default.string(),
});
