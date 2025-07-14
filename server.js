const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// In-memory storage for orders (in production, use a database)
let orders = [];

// Route to create order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    // Validate input
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    };

    console.log('Creating order with options:', options);

    const order = await razorpay.orders.create(options);
    
    // Store order details
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
      created_at: new Date(),
      notes: notes
    });

    console.log('Order created successfully:', order.id);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Error creating order',
      details: error.message 
    });
  }
});

// Route to verify payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required payment details' 
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order status
      const order = orders.find(o => o.order_id === razorpay_order_id);
      if (order) {
        order.status = 'paid';
        order.payment_id = razorpay_payment_id;
        order.paid_at = new Date();
      }

      console.log('Payment verified successfully for order:', razorpay_order_id);
      res.json({ status: 'ok' });
    } else {
      console.log('Payment verification failed for order:', razorpay_order_id);
      res.status(400).json({ status: 'verification_failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error verifying payment' 
    });
  }
});

// Route to get all orders (for testing/admin purposes)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID}`);
});