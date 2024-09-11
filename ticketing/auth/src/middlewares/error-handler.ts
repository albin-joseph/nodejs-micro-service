import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if(err instanceof RequestValidationError) {
        console.log('handling this error as request validation')
    }

    if(err instanceof DatabaseConnectionError) {
        console.log('handling this error as database connection error')
    }
    console.log('Something went wrong', err)
    res.status(400).send({
        message: err.message
    })
}