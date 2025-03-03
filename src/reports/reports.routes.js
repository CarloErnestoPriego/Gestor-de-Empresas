import express from 'express';
import { generateEnterpriseReport } from '../reports/reports.controller.js';

const router = express.Router();

router.get(
    '/downloadReport',
     generateEnterpriseReport
    );

export default router;
