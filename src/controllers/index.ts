import { type Request, type Response } from "express";
import slug from 'slug';
import User from "../models/User";
import { checkPassword, hassPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.error("Correo electrónico ya en uso");
            return res.status(409).json({ error: "Correo electrónico ya en uso" });
        }

        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({ handle });
        if (handleExists) {
            console.error("Nombre de usuario no disponible");
            return res.status(409).json({ error: "Nombre de usuario no disponible" });
        }

        const user = new User(req.body);
        user.password = await hassPassword(password);
        console.log(slug(handle, ''))

        await user.save();
        res.status(201).json("Registro de usuario creado correctamente");

    } catch (error) {
        res.status(500).json({ message: `Error dentro del servidor: ${error}` })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Revisar si existe el usuario
        const user = await User.findOne({ email });
        if (!user) {
            console.error("El usuario no existe");
            return res.status(404).json({ error: "El usuario no existe" });
        }

        // Comprobar el password
        const isPswdCorrect = await checkPassword(password, user.password);
        if (!isPswdCorrect) {
            const error = new Error('Password incorrecto');
            return res.status(401).json({ error: error.message });
        }

        res.status(200).json({ message: 'Autenticación completada' })
    } catch (error) {
        res.status(500).json({ message: `Error dentro del servidor: ${error}` })
    }
} 