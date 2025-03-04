import { Router } from 'express';
import { generateEnterpriseReport, generateClientReport } from '../reports/reports.controller.js';

const router = Router();

router.get(
    '/downloadEnterpriseReport',
     generateEnterpriseReport
    );
router.get(
    '/downloadClientReport',
    generateClientReport
)

export default router;
