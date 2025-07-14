# HTHF NGO Website with Razorpay Integration

A complete NGO website for Hands That Heal Foundation with integrated Razorpay payment system.

## Features

- Beautiful, responsive design
- Complete donation system with Razorpay integration
- Real-time payment processing
- Order creation and verification
- Secure payment handling

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env` file is already configured with your Razorpay credentials:
- Key ID: `rzp_test_lPidgpdUyVVuim`
- Key Secret: `0CXFoEGXCrsy5PdpPQjD01UR`

### 3. Running the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

#### Option 2: Run Separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Testing Payments

Use Razorpay test card numbers:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- Any future expiry date and CVV

## API Endpoints

- `POST /api/create-order` - Create a new payment order
- `POST /api/verify-payment` - Verify payment signature
- `GET /api/orders` - Get all orders (for testing)
- `GET /api/health` - Server health check

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

## Support

For any issues with the payment integration, check:
1. Backend server is running on port 3001
2. Frontend can connect to the backend
3. Razorpay credentials are correct
4. Network connectivity for Razorpay API calls