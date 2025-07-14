// Mock backend service for Razorpay integration
// In a real application, these would be actual API calls to your backend

export interface CreateOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Mock API endpoints - replace with your actual backend URLs
const API_BASE_URL = 'http://localhost:3000'; // Your backend URL

export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
  // Mock response for demo purposes
  // In production, this would make an actual API call to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `order_${Date.now()}`,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        receipt: orderData.receipt,
        status: 'created'
      });
    }, 500);
  });
  
  // Actual implementation would be:
  // const response = await fetch(`${API_BASE_URL}/create-order`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(orderData),
  // });
  // return response.json();
};

export const verifyPayment = async (paymentData: VerifyPaymentRequest): Promise<{ status: string }> => {
  // Mock verification for demo purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'ok' });
    }, 500);
  });
  
  // Actual implementation would be:
  // const response = await fetch(`${API_BASE_URL}/verify-payment`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(paymentData),
  // });
  // return response.json();
};