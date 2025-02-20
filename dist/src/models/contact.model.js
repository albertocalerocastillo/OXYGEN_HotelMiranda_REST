"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    date: String,
    customer: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    archived: Boolean,
});
exports.ContactModel = (0, mongoose_1.model)('Contact', ContactSchema);
