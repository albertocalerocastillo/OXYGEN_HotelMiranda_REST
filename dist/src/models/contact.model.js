"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const contact_schema_1 = require("../schemas/contact.schema");
exports.ContactModel = (0, mongoose_1.model)('Contact', contact_schema_1.ContactSchema);
