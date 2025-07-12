import { type Request, type Response } from "express";
import slug from 'slug';
import User from "../models/User";
import { hassPassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
    try {
        // Manejar errores de la ruta
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            return res.status(400).json({ errors: errors.array() });
        }

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