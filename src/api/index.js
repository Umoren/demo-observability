import express from 'express';
import { logger } from '../lib/logger.js';
import usersRouter from '../routes/users.js';
import metricsApp, { register } from '../metrics.js';

// Async bug: missing await (will trigger unhandled rejection)
function asyncOops() {
    return new Promise((resolve) => {
        setTimeout(() => {
            throw new Error('Async explode');
        }, 2000);
    });
}

const app = express();
app.use('/users', usersRouter);
app.get('/boom', () => asyncOops());    // route that will crash

app.listen(3000, () => logger.info('API listening on :3000'));

// Expose /metrics on port 9100
metricsApp.listen(9100, () => logger.info('Metrics on :9100'));

// Unhandled rejection handler prints stack (for screenshot)
process.on('unhandledRejection', (err) => logger.error(err, 'Unhandled'));
