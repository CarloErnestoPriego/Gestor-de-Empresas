import { Router } from 'express';
import { filterAndEditEnterprises } from './filter.controller.js';

const router = new Router();

router.post(
    '/',
    filterAndEditEnterprises
)

export default router;