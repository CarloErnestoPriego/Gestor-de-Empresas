import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { generateEnterpriseReport, generateClientReport } from '../reports/reports.controller.js';

const router = Router();

router.get(
    '/downloadEnterpriseReport',
    validarJWT,
    generateEnterpriseReport
    );
router.get(
    '/downloadClientReport',
    validarJWT,
    generateClientReport
)

export default router;
