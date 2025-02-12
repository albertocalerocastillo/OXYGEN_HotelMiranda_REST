"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await (0, auth_service_1.findUserByUsernameAndPassword)(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = (0, auth_service_1.generateToken)(user.id);
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
exports.login = login;
