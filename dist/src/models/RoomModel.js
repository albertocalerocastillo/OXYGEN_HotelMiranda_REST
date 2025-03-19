"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    photo: String,
    number: String,
    name: String,
    type: String,
    amenities: String,
    price: Number,
    offerPrice: Number,
    status: String,
    description: String,
    // capacity: Number,
});
exports.RoomModel = (0, mongoose_1.model)('Room', RoomSchema);
