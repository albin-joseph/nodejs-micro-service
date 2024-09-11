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
        const formattedErrors = err.errors.map(error => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
              }
        })
        return res.status(400).send({ errors: formattedErrors });
    }

    if(err instanceof DatabaseConnectionError) {
        console.log('handling this error as database connection error')
    }
    console.log('Something went wrong', err)
    res.status(400).send({
        message: err.message
    })
}