import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import  {db} from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements()

    // two state error and disabled
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const[clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        
       //generate the special stripe secret which allows us to charge a customer

       const getClientSecret = async ()=>{
           const response = await axios({
               method: 'post',
               //stripe excepts the total in a currencies subunits
               url: '/payments/create?total=${getBasketTotal(basket)* 100 }'
           })
           setClientSecret(response.data.clientSecret)
       }

       getClientSecret();
        
    }, [basket])

    console.log('THE SECRET IS>>>>', clientSecret)

    const handleSubmit = async(event) => {
        //stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, { 
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({PaymentIntent}) =>{
            //paymentIntent = payment confirmation

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(PaymentIntent.id)
            .set({
                basket: basket,
                amount: Payment.amount,
                created:PaymentIntent.created
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')


        })
    }

    const handleChange = (event) => {
        // listen for changes inthe CardElement
        // and display any errors as the customer tyoes their card details

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    checkout(<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>
                {/* Payment section - delivery address  */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email} </p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>


                {/* payment section - Review Items */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Review item and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>

                </div>

                {/* payment section - payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic */}
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />

                            <div className="payment__PriceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    perfix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Payment