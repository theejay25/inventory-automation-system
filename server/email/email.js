import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { date } from '../utils/getDates.js';
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path';
import { welcomemailTemplate } from '../templates/welcomeMailTemplate.js';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Build the absolute path to the logs folder and file
const logsDir = path.join(__dirname, '../logs')
const errorLogFilePath = path.join(logsDir, 'errorLogs.txt')
const emailLogFilePath = path.join(logsDir, 'emailLogs.txt')

dotenv.config()


//test console Logs
// console.log('Loaded SMTP config:', {
//     service: process.env.SERVICE,
//     host: process.env.HOST,
//     port: process.env.EMAIL_PORT,
//     user: process.env.USER,
//     email: emailLogFilePath,
//     error: errorLogFilePath
// });

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const verifyMail = async (email, subject, verificationToken) => {
    
    try {
        
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: verificationToken
        })

        await fs.appendFile(`${emailLogFilePath}`, `Email sent to ${email} at ${date()} \n\n`)

        console.log(`Email sent to ${email} at ${date()}`)

    } catch (error) {
        await fs.appendFile(`${errorLogFilePath}`, `Error sending email to ${email} at ${date()} \n\n`)
        console.log(error)
        throw error
    }

}

export const welcomeMail = async (email, subject, name) => {
    
    try {
        
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: welcomemailTemplate.replace('{email}', name)
        })

        await fs.appendFile(`${emailLogFilePath}`, `Email sent to ${email} at ${date()} \n\n`)

        console.log(`Email sent to ${email} at ${date()}`)

    } catch (error) {
        await fs.appendFile(`${errorLogFilePath}`, `Error sending email to ${email} at ${date()} \n\n`)
        console.log(error)
        throw error
    }

}

export const passwordResetMail = async (email, subject, resetURL) => {
    
    try {
        
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `Click <a href='${resetURL}'>Here</a> to reset your password`
        })

        await fs.appendFile(`${emailLogFilePath}`, `Email sent to ${email} at ${date()} \n\n`)

        console.log(`Email sent to ${email} at ${date()}`)

    } catch (error) {
        await fs.appendFile(`${errorLogFilePath}`, `Error sending email to ${email} at ${date()} \n\n`)
        console.log(error)
        throw error
    }

}

