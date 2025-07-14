import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from './controllers';

const router = Router();

// Rutas

/* Autenticación */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email no válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('El password inválido (mínimo 8 caracteres)'),
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email no válido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    login
)

export default router;