"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = require("mongoose");
const room_schema_1 = require("../schemas/room.schema");
exports.RoomModel = (0, mongoose_1.model)('Room', room_schema_1.RoomSchema);
