// Real backend service for Razorpay integration
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

// Backend API base URL
const API_BASE_URL = "https://hthf-ngowebsite.onrender.com/api";

export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const verifyPayment = async (
  paymentData: VerifyPaymentRequest
): Promise<{ status: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Payment verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Function to check server health
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("Server health check failed:", error);
    return false;
  }
};
