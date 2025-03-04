import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createClient, getClients, getClientById, updateClient, deleteClient } from './client.controller.js';

const router = Router();

router.post(
    '/', 
    validarJWT,
    createClient
)

router.get(
    '/',
    getClients
)

router.get(
    '/:id',
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    getClientById
)

router.put(
    '/:id',
    validarJWT,
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    updateClient
)

router.delete(
    '/:id',
    validarJWT,
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    deleteClient
)

export default router;