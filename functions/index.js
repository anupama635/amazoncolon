const functions = require("firebase-functions");
const express = require("express");
const  cors = require("cors");
const stripe = require("stripe")('sk_test_51IVYteKA6WiNv1mvf1y4L9sewd7FALtKpZPWVj2Qj3aTHSoGvgji8VvGgOvxZzcUorHS7rL41tHoPxrlhPbwOTLy00M0wpBjnA')
//api
// app config
const app = express();

// middlewares
app.use(cors({ orgin: true}));
app.use(express.json());

//api routes
app.get('/',(request, response) => response.status(200).send('hello world'))

app.post('/payment/create', async (request, response)=>{
    const total = request.query.total;
    console.log('Payment  Request received boom for this amount', total)
 const paymentIntent = await stripe.paymentIntents.create({
     amount:total,
     currency: "usd",
 });

 //ok - created
 response.status(201).send({
     clientSecret: paymentIntent.client_secret,
 })

} )
// listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-ba5ae/us-central1/api