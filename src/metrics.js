import client from 'prom-client';
import express from 'express';

export const register = new client.Registry();

const heapGauge = new client.Gauge({
    name: 'demo_heap_used_bytes',
    help: 'Heap used by the Node.js process'
});
register.registerMetric(heapGauge);

// Update gauge every 5 s
setInterval(() => {
    heapGauge.set(process.memoryUsage().heapUsed);
}, 5000);

const metricsApp = express();
metricsApp.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

export default metricsApp;
