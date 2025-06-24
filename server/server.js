//dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//database related
import mongooseConnect from './db/MongoDbConnect.js'

//utilities and middleware
import {date} from './utils/getDates.js'
import { textLogger } from './middleware/textLogger.js'
import { cleanUp } from './jobs/scheduleCleanUp.js'

//routes
import router from './routes/authRoutes.js'
import adminRouter from './routes/admin/adminRoutes.js'
import productRouter from './routes/productRoutes.js'

const homePort = ['http://localhost:5173', 'http://localhost:514']

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(textLogger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(homePort))
app.use('/api/auth', router)
app.use('/api/admin', adminRouter)
app.use('/api/product', productRouter)

cleanUp()

app.get('/fruits', (req, res) => {
    res.json({
        fruits: ['jay', 'amaka', 'me']
    })
})


app.listen(port || 5050, () => {
    mongooseConnect()
    console.log(date())
    console.log(`app listening on port ${port}`)
})


