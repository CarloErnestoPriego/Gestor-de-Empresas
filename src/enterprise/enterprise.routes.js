import { Router } from "express";
import { check } from "express-validator";
import { createEnterprise, getEnterprises, getEnterpriseById, updateEnterprise, deleteEnterprise } from "./enterprise.controller.js";

const router = Router();

router.post(
    '/', 
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
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    updateEnterprise
)

router.delete(
    '/:id',
    [
        check("id", "No es un id valido").isMongoId(),
    ],
    deleteEnterprise
)

export default router;