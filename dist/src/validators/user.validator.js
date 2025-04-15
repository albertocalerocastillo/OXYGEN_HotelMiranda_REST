"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.validateUserCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUserCreate = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    joinDate: joi_1.default.string().required(),
    jobDesk: joi_1.default.string(),
    contact: joi_1.default.string(),
    status: joi_1.default.string().required(),
    profilePhoto: joi_1.default.string(),
    password: joi_1.default.string().required(),
});
exports.validateUserUpdate = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    joinDate: joi_1.default.string(),
    jobDesk: joi_1.default.string(),
    contact: joi_1.default.string(),
    status: joi_1.default.string(),
    profilePhoto: joi_1.default.string(),
    password: joi_1.default.string(),
});
