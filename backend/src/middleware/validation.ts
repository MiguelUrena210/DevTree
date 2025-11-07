import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Manejar errores de la ruta
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si todo esta bien, ejecuta la siguiente función
}