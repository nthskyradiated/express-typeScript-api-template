import express, { Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { MessageResponse } from './interface'
import routes from './routes/route'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/middlewares'
import { getMetrics } from './routes/handlers'
dotenv.config({ path: `${__dirname}/../.env` })


const app = express()
const port = process.env.PORT
export const apiDirPath = process.env.API_DIR_PATH

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())

app.get<{}, MessageResponse>('/', (req , res: Response) => {
    res.json({
        message: "Green: API RootDir"
    }).end()
})
app.use(`${apiDirPath}`, routes)
app.use('/metrics', getMetrics)

app.use(notFound);
app.use(errorHandler);

