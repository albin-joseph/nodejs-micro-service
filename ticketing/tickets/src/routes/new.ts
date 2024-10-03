import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {requireAuth, validateRequest} from '@ajauthticket/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', [requireAuth] ,[
    body('title')
    .notEmpty()
    .withMessage('Title is required'),
    body('price')
    .isFloat({gt:0})
    .withMessage('Price must be greater than zero')
], validateRequest, async (req: Request, res: Response) => {
    const {title, price} = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();
    res.status(201).send(ticket);
});

export { router as createTicketRouter}