import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@ajauthticket/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

jest.mock('../../stripe');

it('return a 404 when purchasing an order does not exist', async () => {
    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
        token: 'asdfg',
        orderId: new mongoose.Types.ObjectId().toHexString()
    })
});

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: new mongoose.Types.ObjectId().toHexString(),
        price: 10,
        status: OrderStatus.Created
    });

    await order.save();

    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
        token: 'asdfg',
        orderId: order.id
    })
    .expect(401);

});

it('return a 400 when purchasing a cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: userId,
        price: 10,
        status: OrderStatus.Cancelled
    });

    await order.save();

    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
        token: 'asdfg',
        orderId: order.id
    })
    .expect(400);

});

it('returns a 201 with valid inputs', async () => {

    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: userId,
        price: 10,
        status: OrderStatus.Created
    });

    await order.save();

    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
        token: 'tok_visa',
        orderId: order.id
    })
    .expect(201)

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]
    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(10*100);
    expect(chargeOptions.currency).toEqual('usd');
})