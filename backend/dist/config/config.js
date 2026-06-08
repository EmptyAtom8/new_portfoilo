"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config({ quiet: true });
const cvFilename = 'JHL_Software_Engineer_CV  .pdf';
const sourceCvPath = node_path_1.default.resolve(process.cwd(), 'src', 'assets', cvFilename);
const builtCvPath = node_path_1.default.resolve(__dirname, '..', 'assets', cvFilename);
function positiveInteger(value, fallback) {
    const parsed = Number.parseInt(value ?? '', 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
exports.config = {
    port: positiveInteger(process.env.PORT, 3000),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    logDirectory: node_path_1.default.resolve(process.env.LOG_DIRECTORY ?? './logs'),
    logRetentionDays: positiveInteger(process.env.LOG_RETENTION_DAYS, 30),
    visitRateLimit: positiveInteger(process.env.VISIT_RATE_LIMIT, 30),
    cvPath: process.env.CV_PATH ?? ((0, node_fs_1.existsSync)(sourceCvPath) ? sourceCvPath : builtCvPath),
    cvDownloadName: process.env.CV_DOWNLOAD_NAME ?? 'Jiahe-Li-Software-Engineer-CV.pdf',
};
//# sourceMappingURL=config.js.map