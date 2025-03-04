import { Router } from 'express';
import { filterEntities } from './filter.controller.js';

const router = new Router();

router.post(
    '/',
    filterEntities
)

export default router;