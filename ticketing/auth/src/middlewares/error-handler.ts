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
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    if(err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }
   
    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    })
}