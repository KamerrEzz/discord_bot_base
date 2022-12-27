type level = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'

interface Logger {
  (services: string, level: level, message: string): void
}

export { Logger }
