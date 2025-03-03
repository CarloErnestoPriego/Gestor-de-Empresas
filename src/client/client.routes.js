import { Router } from 'express';
import { check } from 'express-validator';
import { createClient, getClients, getClientById, updateClient, deleteClient } from './client.controller.js';

const router = Router();

router.post(
    '/', 
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
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    updateClient
)

router.delete(
    '/:id',
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    deleteClient
)

export default router;