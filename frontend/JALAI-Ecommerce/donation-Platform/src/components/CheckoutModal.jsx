import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';

const CheckoutModal = ({ cartItems, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const { user } = useAuth();

  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (value.length >= 9 && (paymentMethod === 'Orange Money' || paymentMethod === 'Mobile Money')) {
      setShowConfirmation(true);
      setConfirmationMessage(`A confirmation code will be sent to ${value}. Please confirm to proceed with the payment.`);
    } else {
      setShowConfirmation(false);
      setConfirmationMessage('');
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if ((paymentMethod === 'Orange Money' || paymentMethod === 'Mobile Money') && !phoneNumber) {
      alert('Please enter your phone number');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order data
      const orderData = {
        userId: user?.id || 'guest',
        userEmail: user?.email || 'guest@example.com',
        userName: user?.name || 'Guest User',
        items: cartItems.map(item => ({
          name: item.name || item.title,
          price: item.price || 0,
          quantity: item.quantity || 1,
          image: item.image
        })),
        total: total,
        paymentMethod: paymentMethod,
        phoneNumber: phoneNumber,
        status: 'completed'
      };

      // Submit order to backend (commented out for now as it might not exist)
      // const response = await apiService.post('/orders', orderData);
      // console.log('Order created:', response);

      alert(`Payment of ${total.toLocaleString()} FCFA processed successfully via ${paymentMethod}!`);
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Order Summary</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={item.id || index} className="flex justify-between text-sm">
                <span>{item.name || item.title} {item.quantity > 1 && `(x${item.quantity})`}</span>
                <span>{((item.price || 0) * (item.quantity || 1)).toLocaleString()} FCFA</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{total.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <h4 className="font-medium mb-3">Payment Method</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Orange Money"
                checked={paymentMethod === 'Orange Money'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                Orange Money
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Mobile Money"
                checked={paymentMethod === 'Mobile Money'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded mr-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
                Mobile Money
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded mr-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                  </svg>
                </div>
                PayPal
              </div>
            </label>
          </div>
        </div>

        {/* Phone Number Input for Mobile Payments */}
        {(paymentMethod === 'Orange Money' || paymentMethod === 'Mobile Money') && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+237 XXX XXX XXX"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {showConfirmation && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                {confirmationMessage}
              </div>
            )}
          </div>
        )}

        {/* PayPal Email Input */}
        {paymentMethod === 'PayPal' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">PayPal Email</label>
            <input
              type="email"
              placeholder="your-email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                Processing...
              </>
            ) : (
              `Pay ${total.toLocaleString()} FCFA`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
