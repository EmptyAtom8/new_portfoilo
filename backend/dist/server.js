"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const visitorLogger_1 = require("./visitorLogger");
const visitorLogger = new visitorLogger_1.JsonlVisitorLogger(config_1.config.logDirectory, config_1.config.logRetentionDays);
const app = (0, app_1.createApp)({ visitorLogger });
const server = app.listen(config_1.config.port, '0.0.0.0', () => {
    console.info(JSON.stringify({
        event: 'server_started',
        timestamp: new Date().toISOString(),
        port: config_1.config.port,
        environment: config_1.config.nodeEnv,
    }));
});
const cleanupLogs = async () => {
    try {
        const removed = await visitorLogger.removeExpiredLogs();
        if (removed > 0) {
            console.info(JSON.stringify({
                event: 'expired_visit_logs_removed',
                timestamp: new Date().toISOString(),
                count: removed,
            }));
        }
    }
    catch (error) {
        console.error(JSON.stringify({
            event: 'log_cleanup_failed',
            timestamp: new Date().toISOString(),
            message: error instanceof Error ? error.message : 'Unknown error',
        }));
    }
};
void cleanupLogs();
const cleanupTimer = setInterval(() => void cleanupLogs(), 24 * 60 * 60 * 1000);
cleanupTimer.unref();
function shutdown(signal) {
    console.info(JSON.stringify({
        event: 'server_stopping',
        timestamp: new Date().toISOString(),
        signal,
    }));
    server.close(() => process.exit(0));
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
//# sourceMappingURL=server.js.map