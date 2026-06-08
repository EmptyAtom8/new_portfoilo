"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const promises_1 = require("node:fs/promises");
const config_1 = require("./config/config");
function validText(value, maximumLength) {
    return typeof value === 'string' && value.length <= maximumLength;
}
function createApp(options) {
    const app = (0, express_1.default)();
    const cvPath = options.cvPath ?? config_1.config.cvPath;
    const cvDownloadName = options.cvDownloadName ?? config_1.config.cvDownloadName;
    // The service is reachable only through the Compose Nginx network.
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
    app.disable('x-powered-by');
    app.use(express_1.default.json({ limit: '4kb', strict: true }));
    app.use('/api', (request, response, next) => {
        const startedAt = process.hrtime.bigint();
        response.on('finish', () => {
            const elapsedMilliseconds = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
            console.info(JSON.stringify({
                event: 'api_request',
                timestamp: new Date().toISOString(),
                method: request.method,
                path: request.originalUrl,
                status: response.statusCode,
                durationMs: Number(elapsedMilliseconds.toFixed(2)),
            }));
        });
        next();
    });
    app.get('/api/health', (_request, response) => {
        response.status(200).json({ status: 'ok' });
    });
    app.get('/api/cv', async (_request, response, next) => {
        try {
            await (0, promises_1.stat)(cvPath);
            response.download(cvPath, cvDownloadName, (error) => {
                if (error && !response.headersSent)
                    next(error);
            });
        }
        catch (error) {
            next(error);
        }
    });
    const visitLimiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 15 * 60 * 1000,
        limit: options.visitRateLimit ?? config_1.config.visitRateLimit,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        message: { error: 'Too many visit events. Please try again later.' },
    });
    app.post('/api/visits', visitLimiter, async (request, response, next) => {
        try {
            const body = request.body;
            if (!validText(body.path, 2048) ||
                !body.path.startsWith('/') ||
                !validText(body.referrer, 2048)) {
                response.status(400).json({ error: 'Invalid visit payload.' });
                return;
            }
            await options.visitorLogger.record({
                timestamp: new Date().toISOString(),
                ip: request.ip ?? request.socket.remoteAddress ?? 'unknown',
                userAgent: request.get('user-agent')?.slice(0, 1024) ?? 'unknown',
                path: body.path,
                referrer: body.referrer,
            });
            response.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    });
    app.use('/api', (_request, response) => {
        response.status(404).json({ error: 'Not found.' });
    });
    app.use((error, _request, response, _next) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(JSON.stringify({
            event: 'api_error',
            timestamp: new Date().toISOString(),
            message,
        }));
        response.status(500).json({ error: 'Internal server error.' });
    });
    return app;
}
//# sourceMappingURL=app.js.map