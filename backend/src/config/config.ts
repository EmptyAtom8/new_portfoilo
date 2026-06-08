import dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import path from 'node:path'

dotenv.config({ quiet: true })

const cvFilename = 'JHL_Software_Engineer_CV  .pdf'
const sourceCvPath = path.resolve(process.cwd(), 'src', 'assets', cvFilename)
const builtCvPath = path.resolve(__dirname, '..', 'assets', cvFilename)

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export const config = {
  port: positiveInteger(process.env.PORT, 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  logDirectory: path.resolve(process.env.LOG_DIRECTORY ?? './logs'),
  logRetentionDays: positiveInteger(process.env.LOG_RETENTION_DAYS, 30),
  visitRateLimit: positiveInteger(process.env.VISIT_RATE_LIMIT, 30),
  cvPath:
    process.env.CV_PATH ?? (existsSync(sourceCvPath) ? sourceCvPath : builtCvPath),
  cvDownloadName: process.env.CV_DOWNLOAD_NAME ?? 'Jiahe-Li-Software-Engineer-CV.pdf',
}
