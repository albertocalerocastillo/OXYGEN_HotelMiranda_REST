"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookingSchema = new mongoose_1.Schema({
    guest: String,
    orderDate: String,
    checkInDate: String,
    checkInTime: String,
    checkOutDate: String,
    checkOutTime: String,
    specialRequest: String,
    room: { type: mongoose_1.Types.ObjectId, ref: 'Room' },
    status: String,
    specialRequestType: String
});
