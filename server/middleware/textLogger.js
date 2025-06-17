import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { date } from '../utils/getDates.js'

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Build the absolute path to the logs folder and file
const logsDir = path.join(__dirname, '../logs')
const logFilePath = path.join(logsDir, 'textLogs.txt')

export const textLogger = async (req, res, next) => {
  try {
    // Ensure the logs folder exists
    await fs.mkdir(logsDir, { recursive: true })

    // Append to the log file
    const logEntry = `\n${date()} \n${req.method} \n${req.protocol}://${req.get('host')}:${req.url} \n${JSON.parse(res)} \n\n`
    await fs.appendFile(logFilePath, logEntry)
    
    console.log(logFilePath, logEntry)
  } catch (error) {
    console.log(error)
  }

  next()
}
