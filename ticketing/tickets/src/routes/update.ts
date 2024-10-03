import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAutherizedError
} from '@ajauthticket/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth,  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }

    if(ticket.userId !== req.currentUser!.id) {
        throw new NotAutherizedError();
    }

    res.send(ticket)
})

export { router as updateTicketRouter};