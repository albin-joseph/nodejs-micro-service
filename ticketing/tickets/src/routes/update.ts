import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAutherizedError,
    BadRequestError
} from '@ajauthticket/common';

import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
    .notEmpty()
    .withMessage('Title is required'),
    body('price')
    .isFloat({gt:0})
    .withMessage('Price must be greater than zero')
], validateRequest,  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }

    if(ticket.userId !== req.currentUser!.id) {
        throw new NotAutherizedError();
    }

    if(ticket.orderId) {
        throw new BadRequestError('Cannot edit a reserved ticket');
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    })

    res.send(ticket)
})

export { router as updateTicketRouter};