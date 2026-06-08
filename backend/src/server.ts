import { createApp } from './app'
import { config } from './config/config'
import { JsonlVisitorLogger } from './visitorLogger'

const visitorLogger = new JsonlVisitorLogger(
  config.logDirectory,
  config.logRetentionDays,
)

const app = createApp({ visitorLogger })
const server = app.listen(config.port, '0.0.0.0', () => {
  console.info(
    JSON.stringify({
      event: 'server_started',
      timestamp: new Date().toISOString(),
      port: config.port,
      environment: config.nodeEnv,
    }),
  )
})

const cleanupLogs = async () => {
  try {
    const removed = await visitorLogger.removeExpiredLogs()
    if (removed > 0) {
      console.info(
        JSON.stringify({
          event: 'expired_visit_logs_removed',
          timestamp: new Date().toISOString(),
          count: removed,
        }),
      )
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'log_cleanup_failed',
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    )
  }
}

void cleanupLogs()
const cleanupTimer = setInterval(() => void cleanupLogs(), 24 * 60 * 60 * 1000)
cleanupTimer.unref()

function shutdown(signal: string) {
  console.info(
    JSON.stringify({
      event: 'server_stopping',
      timestamp: new Date().toISOString(),
      signal,
    }),
  )
  server.close(() => process.exit(0))
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
