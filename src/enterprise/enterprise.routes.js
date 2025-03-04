import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createEnterprise, getEnterprises, getEnterpriseById, updateEnterprise, deleteEnterprise } from "./enterprise.controller.js";

const router = Router();

router.post(
    '/',
    validarJWT,
    createEnterprise
)

router.get(
    '/',
    getEnterprises
)

router.get(
    '/:id',
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    getEnterpriseById
)

router.put(
    '/:id',
    validarJWT,
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    updateEnterprise
)

router.delete(
    '/:id',
    validarJWT,
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    deleteEnterprise
)

export default router;