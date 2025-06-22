const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
import type { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  const { cartItems }: { cartItems: CartItem[] } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['US', 'ES', 'FR', 'MX'],
      },
      success_url: `${process.env.CLIENT_URL}/#/success`,
      cancel_url: `${process.env.CLIENT_URL}/#/cancel`,
    });

    res.json({ url: session.url });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating checkout session:', err.message);
    } else {
      console.error('Unknown error:', err);
    }
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

app.listen(4242, () => console.log('✅ Server running at http://localhost:4242'));
