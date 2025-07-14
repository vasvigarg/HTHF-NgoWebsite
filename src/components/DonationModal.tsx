import React, { useState } from 'react';
import { X, Heart, CreditCard, Loader } from 'lucide-react';
import { createOrder, verifyPayment } from '../services/paymentService';

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

  const predefinedAmounts = ['500', '1000', '2500', '5000'];

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

  const handleDonate = async () => {
    const finalAmount = getFinalAmount();
    
    if (!finalAmount || !donorName || !donorEmail) {
      alert('Please fill in all required fields');
      return;
    }

    if (parseFloat(finalAmount) < 1) {
      alert('Minimum donation amount is ₹1');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const orderData = {
        amount: parseFloat(finalAmount),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          donor_name: donorName,
          donor_email: donorEmail,
          purpose: 'HTHF Donation'
        }
      };

      const order = await createOrder(orderData);

      // Razorpay options
      const options = {
        key: 'rzp_test_lPidgpdUyVVuim', // Your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Hands That Heal Foundation',
        description: 'Supporting families through chronic diseases',
        image: '/favicon.ico', // Add your logo here
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
          try {
            // Verify payment
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResult.status === 'ok') {
              alert('Thank you for your donation! Your payment was successful.');
              onClose();
              // Reset form
              setAmount('');
              setCustomAmount('');
              setDonorName('');
              setDonorEmail('');
              setDonorPhone('');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsProcessing(false);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
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
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

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
                  className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            disabled={!getFinalAmount() || !donorName || !donorEmail || isProcessing}
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