import { Request, Response,  NextFunction } from "express";
import { ErrorResponse } from "../interface";

export const notFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(404)
    const error = new Error (`${req.originalUrl} not found`)
    next(error)
}

export const errorHandler = async (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
const statusCode = res.statusCode !== 200 ? res.statusCode : 500
res.status(statusCode)
res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'prod' ? '': err.stack
})

}