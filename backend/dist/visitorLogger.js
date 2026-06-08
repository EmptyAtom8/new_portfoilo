"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonlVisitorLogger = void 0;
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const logFilenamePattern = /^visits-(\d{4}-\d{2}-\d{2})\.jsonl$/;
class JsonlVisitorLogger {
    directory;
    retentionDays;
    constructor(directory, retentionDays) {
        this.directory = directory;
        this.retentionDays = retentionDays;
    }
    async record(visit) {
        await (0, promises_1.mkdir)(this.directory, { recursive: true });
        const day = visit.timestamp.slice(0, 10);
        const logPath = node_path_1.default.join(this.directory, `visits-${day}.jsonl`);
        const line = JSON.stringify({ event: 'portfolio_visit', ...visit });
        console.info(line);
        await (0, promises_1.appendFile)(logPath, `${line}\n`, { encoding: 'utf8', mode: 0o600 });
    }
    async removeExpiredLogs(now = new Date()) {
        await (0, promises_1.mkdir)(this.directory, { recursive: true });
        const entries = await (0, promises_1.readdir)(this.directory, { withFileTypes: true });
        const cutoff = new Date(now);
        cutoff.setUTCDate(cutoff.getUTCDate() - this.retentionDays);
        cutoff.setUTCHours(0, 0, 0, 0);
        let removed = 0;
        await Promise.all(entries.map(async (entry) => {
            if (!entry.isFile())
                return;
            const match = logFilenamePattern.exec(entry.name);
            const dateText = match?.[1];
            if (!dateText)
                return;
            const logDate = new Date(`${dateText}T00:00:00.000Z`);
            if (Number.isNaN(logDate.getTime()) || logDate >= cutoff)
                return;
            await (0, promises_1.rm)(node_path_1.default.join(this.directory, entry.name));
            removed += 1;
        }));
        return removed;
    }
}
exports.JsonlVisitorLogger = JsonlVisitorLogger;
//# sourceMappingURL=visitorLogger.js.map