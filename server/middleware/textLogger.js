import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { date } from '../utils/getDates.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logsDir = path.join(__dirname, '../logs')
const logFilePath = path.join(logsDir, 'textLogs.txt')
const errorLogFilePath = path.join(logsDir, 'errorLogs.txt')

export const textLogger = async (req, res, next) => {
  try {
    await fs.mkdir(logsDir, { recursive: true })

    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

    const logEntry = `\n${date()} \n${req.method} ${fullUrl} \n\n`

    await fs.appendFile(logFilePath, logEntry)

    console.log(logEntry)
  } catch (error) {
    console.log(error)
  }

  next()
}
