"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContact = exports.getContacts = void 0;
const fs = __importStar(require("fs"));
const CONTACTS_FILE = './src/data/contact.json';
const getContacts = async () => {
    try {
        const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de contactos');
    }
};
exports.getContacts = getContacts;
const getContact = async (id) => {
    try {
        const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(data);
        return contacts.find(c => c.id === id);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de contactos');
    }
};
exports.getContact = getContact;
const createContact = async (contact) => {
    try {
        const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(data);
        contacts.push(contact);
        await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al crear el contacto');
    }
};
exports.createContact = createContact;
const updateContact = async (id, updatedContact) => {
    try {
        const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(data);
        const index = contacts.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Contacto no encontrado');
        }
        contacts[index] = { ...contacts[index], ...updatedContact };
        await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el contacto');
    }
};
exports.updateContact = updateContact;
const deleteContact = async (id) => {
    try {
        const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
        const contacts = JSON.parse(data);
        const updatedContacts = contacts.filter(c => c.id !== id);
        await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(updatedContacts, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el contacto');
    }
};
exports.deleteContact = deleteContact;
