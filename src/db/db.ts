import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env` })

const mongoUri = process.env.MONGO_URI as string

const client = new MongoClient(mongoUri)

export const db = client.db()
