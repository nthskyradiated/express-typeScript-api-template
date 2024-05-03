import { ObjectId } from "mongodb"
import {  Model, ModelWithId, Models } from "../models/Model"
import { Response, Request, NextFunction } from "express"
import { NoResult, ParamsWithId } from "../interface"



export const findAll = async (req: Request, res: Response<ModelWithId[] | NoResult>, next: NextFunction) => {
    try {
        const result = await Models.find().toArray()
        if (!result) {
            res.status(404).json({
                message: "notFound"
            })
        }
        res.json(result)

    } catch (error) {
        next(error)
    }
}
export async function findOne(req: Request<ParamsWithId, ModelWithId, {}>, res: Response<ModelWithId>, next: NextFunction) {
  try {
    const result = await Models.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`"${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
export const create = async (req: Request, res: Response<NoResult>, next: NextFunction) => {
    try {
        const insertResult = await Models.insertOne(req.body)
        if (!insertResult.acknowledged) throw new Error('Error inserting budget.');
        res.status(201);
        res.json({
          _id: insertResult.insertedId,
          ...req.body,
        });
      } catch (error) {
        next(error);    
      }
    }

    export async function update(req: Request<ParamsWithId, ModelWithId, Model>, res: Response<ModelWithId>, next: NextFunction) {
      try {
        const result = await Models.findOneAndUpdate({
          _id: new ObjectId(req.params.id),
        }, {
          $set: req.body,
        }, {
          returnDocument: 'after',
        });
        if (!result) {
          res.status(404);
          throw new Error(`id "${req.params.id}" not found.`);
        }
        res.json(result);
      } catch (error) {
        next(error);
      }
    }

    
export const deleteOne = async (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) => {
    try {
      const result = await Models.findOneAndDelete({
        _id: new ObjectId(req.params.id),
      });
      if (!result) {
        res.status(404);
        throw new Error(`id "${req.params.id}" not found.`);
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    } 
  }