import winston from 'winston'
import { Logger } from '@Types/Logger'
import { Webhook } from '@Utils/discord'
import fs from 'fs'
import { WEBHOOk_ERROR } from '@Config/Webhook'

type level = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'

const Logger: Logger = (services: string, level: level, message: string) => {
  const logger = winston.createLogger({
    defaultMeta: { service: services },
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize(),
      winston.format.printf(
        (info) =>
          `${new Date(info.timestamp).toLocaleString('es-ES', {
            timeZone: 'America/Mexico_City',
            hour12: true,
          })} [${services}] ${info.level}: ${info.message}`
      )
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/error.log',
        format: winston.format.errors({ stack: true }),
        level: 'error',
      }),
    ],
  })
  logger.log(level, message)

  if (level === 'error') {
    fs.writeFile('logs/temporal.txt', message, (err) => {
      if (err) {
        console.log(err)
      }
      Webhook(`${WEBHOOk_ERROR}`)
        .send({
          content: `**${services}**`,
          files: [
            {
              attachment: 'logs/temporal.txt',
              name: 'error.txt',
            },
          ],
        })
        .then(() => {
          fs.unlinkSync('logs/temporal.txt')
        })
    })
  }
}

export { Logger }
