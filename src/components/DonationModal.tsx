import React, { useState, useEffect } from 'react';
import { X, Heart, CreditCard, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { createOrder, verifyPayment, checkServerHealth } from '../services/paymentService';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const predefinedAmounts = ['500', '1000', '2500', '5000'];

  // Check server status when modal opens
  useEffect(() => {
    if (isOpen) {
      checkServerStatus();
    }
  }, [isOpen]);

  const checkServerStatus = async () => {
    try {
      const isHealthy = await checkServerHealth();
      setServerStatus(isHealthy);
      if (!isHealthy) {
        setStatusMessage('Payment server is not available. Please try again later.');
      } else {
        setStatusMessage('');
      }
    } catch (error) {
      setServerStatus(false);
      setStatusMessage('Unable to connect to payment server.');
    }
  };

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const getFinalAmount = () => {
    return customAmount || amount;
  };

  const validateForm = () => {
    const finalAmount = getFinalAmount();
    
    if (!finalAmount) {
      setStatusMessage('Please select or enter a donation amount');
      return false;
    }
    
    if (parseFloat(finalAmount) < 1) {
      setStatusMessage('Minimum donation amount is ₹1');
      return false;
    }
    
    if (!donorName.trim()) {
      setStatusMessage('Please enter your full name');
      return false;
    }
    
    if (!donorEmail.trim()) {
      setStatusMessage('Please enter your email address');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) {
      setStatusMessage('Please enter a valid email address');
      return false;
    }
    
    setStatusMessage('');
    return true;
  };

  const handleDonate = async () => {
    if (!validateForm()) {
      return;
    }

    if (!serverStatus) {
      setStatusMessage('Payment server is not available. Please try again later.');
      return;
    }

    const finalAmount = getFinalAmount();
    setIsProcessing(true);
    setStatusMessage('Creating payment order...');

    try {
      // Create order
      const orderData = {
        amount: parseFloat(finalAmount),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          donor_name: donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone,
          purpose: 'HTHF Donation'
        }
      };

      console.log('Creating order with data:', orderData);
      const order = await createOrder(orderData);
      console.log('Order created:', order);

      setStatusMessage('Opening payment gateway...');

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }

      // Razorpay options
      const options = {
        key: 'rzp_test_lPidgpdUyVVuim', // Your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Hands That Heal Foundation',
        description: 'Supporting families through chronic diseases',
        image: '/favicon.ico',
        order_id: order.id,
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone
        },
        theme: {
          color: '#3B82F6'
        },
        handler: async function (response: any) {
          setStatusMessage('Verifying payment...');
          try {
            console.log('Payment response:', response);
            
            // Verify payment
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            console.log('Verification result:', verificationResult);

            if (verificationResult.status === 'ok') {
              setStatusMessage('Payment successful! Thank you for your donation.');
              setTimeout(() => {
                onClose();
                resetForm();
              }, 2000);
            } else {
              setStatusMessage('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setStatusMessage('Payment verification failed. Please contact support.');
          }
          setIsProcessing(false);
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setStatusMessage('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        setStatusMessage(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setAmount('');
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setStatusMessage('');
  };

  const handleClose = () => {
    if (!isProcessing) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Heart className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Make a Donation</h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Server Status */}
          {!serverStatus && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-red-500" size={20} />
                <span className="text-red-700 font-medium">Server Unavailable</span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                Payment server is not running. Please start the backend server first.
              </p>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className={`rounded-lg p-4 mb-6 ${
              statusMessage.includes('successful') || statusMessage.includes('Thank you')
                ? 'bg-green-50 border border-green-200'
                : statusMessage.includes('failed') || statusMessage.includes('error') || statusMessage.includes('unavailable')
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center space-x-2">
                {statusMessage.includes('successful') ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : statusMessage.includes('failed') || statusMessage.includes('error') ? (
                  <AlertCircle className="text-red-500" size={20} />
                ) : (
                  <Loader className="text-blue-500 animate-spin" size={20} />
                )}
                <span className={`font-medium ${
                  statusMessage.includes('successful') ? 'text-green-700'
                  : statusMessage.includes('failed') || statusMessage.includes('error') ? 'text-red-700'
                  : 'text-blue-700'
                }`}>
                  {statusMessage}
                </span>
              </div>
            </div>
          )}

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Donation Amount (₹)
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleAmountSelect(amt)}
                  disabled={isProcessing}
                  className={`p-3 rounded-lg border-2 font-semibold transition-colors disabled:opacity-50 ${
                    amount === amt
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter custom amount
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter amount"
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                min="1"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your full name"
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                placeholder="Enter your phone number"
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Donation Summary */}
          {getFinalAmount() && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Donation Amount:</span>
                <span className="text-2xl font-bold text-gray-800">₹{getFinalAmount()}</span>
              </div>
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={!getFinalAmount() || !donorName || !donorEmail || isProcessing || !serverStatus}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard size={20} />
                <span>Donate Now</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your donation is secure and processed through Razorpay. 
            You will receive a receipt via email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;