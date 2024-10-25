import express ,{Request, Response} from 'express';
import { body } from 'express-validator';
import {
     requireAuth,
     validateRequest,
     BadRequestError,
     NotFoundError
} from '@ajauthticket/common';

import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payaments', requireAuth, [
    body('token')
    .not()
    .isEmpty(),
    body('orderId')
    .not()
    .isEmpty()
], validateRequest,(req: Request, res: Response) => {
    res.send({Success: true})
});

export {router as createChargeRouter}