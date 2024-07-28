import { NextFunction, Response, Request } from 'express';


export function errorHandler(err:Error, Request: Request, res: Response, next: NextFunction){
    const statusCode = (err as any).statusCode || 500;
    const message = (err as any).message || "Internal Service Error"
    res.status(statusCode).json({ error: message })
    console.error(err)
}