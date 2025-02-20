"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    guest: String,
    orderDate: String,
    checkInDate: String,
    checkInTime: String,
    checkOutDate: String,
    checkOutTime: String,
    specialRequest: String,
    room: { type: mongoose_1.Types.ObjectId, ref: 'Room' },
    status: String,
    specialRequestType: String,
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);
