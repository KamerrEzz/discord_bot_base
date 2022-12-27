type level = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'

type Logger = (services: string, level: level, message: string) => void

export { Logger }
