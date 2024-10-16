import express, {Request, Response} from "express";
import { NotAutherizedError, NotFoundError, requireAuth } from "@ajauthticket/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth ,async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if(!order) {
        throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id) {
        throw new NotAutherizedError()
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(204).send(order);
});

export { router as deleteOrderRouter };