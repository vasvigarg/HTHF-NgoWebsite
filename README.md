# HTHF NGO Website with Razorpay Integration

A complete NGO website for Hands That Heal Foundation with integrated Razorpay payment system.

## Features

- Beautiful, responsive design
- Complete donation system with Razorpay integration
- Real-time payment processing
- Order creation and verification
- Secure payment handling

## Project Structure

```
├── server.js                 # Express backend server
├── src/
│   ├── components/
│   │   ├── DonationModal.tsx  # Payment modal component
│   │   └── ...               # Other components
│   ├── services/
│   │   └── paymentService.ts  # Payment API service
│   └── ...
├── .env                      # Environment variables
└── package.json
```

## Security Notes

- Razorpay Key ID is safe to expose in frontend
- Key Secret is only used on the backend server
- Payment verification uses HMAC SHA256 signature
- All payments are processed securely through Razorpay

## Production Deployment

1. Replace test credentials with live Razorpay credentials
2. Update CORS settings for your domain
3. Use a proper database instead of in-memory storage
4. Add proper error logging and monitoring
5. Implement webhook handling for payment updates
