import express from 'express';
import { generateEnterpriseReport } from '../controllers/enterpriseController.js';

const router = express.Router();

router.get(
    '/downloadReport',
     generateEnterpriseReport
    );

export default router;
