import { appendFile, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'

export interface VisitRecord {
  timestamp: string
  ip: string
  userAgent: string
  path: string
  referrer: string
}

export interface VisitorLogger {
  record(visit: VisitRecord): Promise<void>
  removeExpiredLogs(now?: Date): Promise<number>
}

const logFilenamePattern = /^visits-(\d{4}-\d{2}-\d{2})\.jsonl$/

export class JsonlVisitorLogger implements VisitorLogger {
  constructor(
    private readonly directory: string,
    private readonly retentionDays: number,
  ) {}

  async record(visit: VisitRecord): Promise<void> {
    await mkdir(this.directory, { recursive: true })
    const day = visit.timestamp.slice(0, 10)
    const logPath = path.join(this.directory, `visits-${day}.jsonl`)
    const line = JSON.stringify({ event: 'portfolio_visit', ...visit })

    console.info(line)
    await appendFile(logPath, `${line}\n`, { encoding: 'utf8', mode: 0o600 })
  }

  async removeExpiredLogs(now = new Date()): Promise<number> {
    await mkdir(this.directory, { recursive: true })
    const entries = await readdir(this.directory, { withFileTypes: true })
    const cutoff = new Date(now)
    cutoff.setUTCDate(cutoff.getUTCDate() - this.retentionDays)
    cutoff.setUTCHours(0, 0, 0, 0)

    let removed = 0
    await Promise.all(
      entries.map(async (entry) => {
        if (!entry.isFile()) return
        const match = logFilenamePattern.exec(entry.name)
        const dateText = match?.[1]
        if (!dateText) return

        const logDate = new Date(`${dateText}T00:00:00.000Z`)
        if (Number.isNaN(logDate.getTime()) || logDate >= cutoff) return

        await rm(path.join(this.directory, entry.name))
        removed += 1
      }),
    )

    return removed
  }
}
