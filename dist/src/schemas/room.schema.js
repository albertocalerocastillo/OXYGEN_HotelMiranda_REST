"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoomSchema = new mongoose_1.Schema({
    photo: String,
    number: String,
    name: String,
    type: String,
    amenities: String,
    price: Number,
    offerPrice: Number,
    status: String,
    description: String,
    capacity: Number
});
