import * as z from 'zod'
import { WithId } from 'mongodb';
import {db} from '../db/db'

export const Model = z.object({
    Name: z.string().min(1),
    ItemNumber: z.number()

})

export type Model = z.infer<typeof Model>

export type ModelWithId = WithId<Model>;

export const Models = db.collection<Model>('models')