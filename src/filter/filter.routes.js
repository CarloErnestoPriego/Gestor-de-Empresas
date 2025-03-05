import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { filterEntities } from './filter.controller.js';

const router = new Router();

router.post(
    '/',
    validarJWT,
    filterEntities
)

export default router;