"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    joinDate: String,
    jobDesk: String,
    contact: String,
    status: String,
    profilePhoto: String,
    password: { type: String, select: false },
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
