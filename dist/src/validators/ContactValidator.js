"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateContactCreate = joi_1.default.object({
    date: joi_1.default.string().required(),
    customer: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    subject: joi_1.default.string().required(),
    comment: joi_1.default.string(),
    archived: joi_1.default.boolean(),
});
