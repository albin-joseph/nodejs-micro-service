import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
        title: 'asdfgh',
        price: 20
    })
    .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: 'asdfgh',
        price: 20
    })
    .expect(401);
});

it('return a 401 if the user is not owned the ticket', async () => {
  const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'asdfgh',
        price: 20
    });

   await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', global.signin())
   .send({
    title: 'akjdhskjfhsdjkf',
    price: 100
   })
   .expect(401)
});

it('return a 400 if the provided the invalid title or price', async () => {
    const cookie = global.signin();

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'asdfgh',
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
     title: '',
     price: 20
    })
    .expect(400);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
     title: 'asasad',
     price: -10
    })
    .expect(400);

});

it('update the ticket if provided the valid inputs', async () => {
    const cookie = global.signin();

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'asdfgh',
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
     title: 'updated Ticket',
     price: 100
    })
    .expect(200);

    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

    expect(ticketResponse.body.title).toEqual('updated Ticket');
    expect(ticketResponse.body.price).toEqual(100);

});