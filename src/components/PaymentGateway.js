import React, { useState } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/paymentGateway.css';

const PaymentGateway = ({ total, onPaymentSuccess, audioEnabled }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (audioEnabled) {
      textToSpeech(`Payment method changed to ${method}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    if (audioEnabled) {
      textToSpeech('Processing your payment');
    }

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
      if (audioEnabled) {
        textToSpeech('Payment successful. Thank you for your order!');
      }
    }, 2000);
  };

  return (
    <div className="payment-gateway" role="main" aria-label="Payment gateway">
      <h1>Payment</h1>
      <p className="payment-total">Total: ${total.toFixed(2)}</p>
      
      <div className="payment-methods">
        <button
          className={`method-btn ${paymentMethod === 'credit' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('credit')}
          aria-pressed={paymentMethod === 'credit'}
        >
          Credit/Debit Card
        </button>
        <button
          className={`method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('paypal')}
          aria-pressed={paymentMethod === 'paypal'}
        >
          PayPal
        </button>
        <button
          className={`method-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('cash')}
          aria-pressed={paymentMethod === 'cash'}
        >
          Cash on Delivery
        </button>
      </div>

      {paymentMethod === 'credit' && (
        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="number"
              value={cardDetails.number}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              name="name"
              value={cardDetails.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardExpiry">Expiry Date</label>
              <input
                type="text"
                id="cardExpiry"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                aria-required="true"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardCvv">CVV</label>
              <input
                type="text"
                id="cardCvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="123"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="pay-btn"
            disabled={processing}
            aria-disabled={processing}
          >
            {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="paypal-method">
          <p>You will be redirected to PayPal to complete your payment.</p>
          <button className="pay-btn" onClick={handleSubmit}>
            Continue to PayPal
          </button>
        </div>
      )}

      {paymentMethod === 'cash' && (
        <div className="cash-method">
          <p>Pay with cash when your order arrives.</p>
          <button className="pay-btn" onClick={handleSubmit}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;