import express from 'express';
import { leak } from '../lib/cache.js';
import { logger } from '../lib/logger.js';

const router = express.Router();

// Fake data
const USERS = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));

router.get('/', (req, res) => {
    // Off‑by‑one: page=1 should start at index 0, not 1
    const page = parseInt(req.query.page || '1', 10);
    const perPage = 10;
    const start = page * perPage;  // BUG: should be (page‑1)*perPage
    const slice = USERS.slice(start, start + perPage);

    // Simulate leak: cache every response forever
    leak(`page-${page}`, slice);

    logger.info({ page, returned: slice.length }, 'List users');
    res.json({ page, users: slice });
});

export default router;
