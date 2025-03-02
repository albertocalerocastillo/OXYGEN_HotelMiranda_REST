"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const predefinedEmail = 'alberto@gmail.com';
        const predefinedPassword = 'alberto1234';
        if (!email || !password) {
            return res.status(401).json({ message: '1' });
        }
        if (!password) {
            return res.status(401).json({ message: '2' });
        }
        const isEmailValid = await (email === predefinedEmail);
        const isPasswordValid = await (password === predefinedPassword);
        if (!isPasswordValid || !isEmailValid) {
            return res.status(401).json({ message: '3' });
        }
        const user = {
            _id: '67be39b369531c3dca88be98',
            name: 'Alberto'
        };
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, name: user.name });
    }
    catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
exports.login = login;
