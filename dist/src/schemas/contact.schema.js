"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ContactSchema = new mongoose_1.Schema({
    date: String,
    customer: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    archived: Boolean
});
