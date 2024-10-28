import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import userRequest from '../../hooks/use-request';

const OrderShow = ({order, currentUser}) => {

    const [timeLeft, setTimeLeft] = useState('');
    const {doRequest, errors} = userRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    })

    useEffect(()=>{
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft/1000))
        }
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    },[order]);

    if(timeLeft<0) {
        return <div>Order expired</div>
    }

    return (
        <div>
            <div>Tme letf to pay: {timeLeft} seconds
                <StripeCheckout 
                    token = {({id}) => doRequest({token: id})}
                    stripeKey='<TODO: add Pub Key>'
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                />
                {errors}
            </div>
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`);
    return {order: data};
};

export default OrderShow;