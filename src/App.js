import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, Eye, Volume2, Check, Menu, X, Settings, Users, DollarSign, Clock, Mail, User, CreditCard, ArrowLeft, ChevronDown, Mic } from 'lucide-react';

const AccessibleFoodOrderingPlatform = () => {
  const [cart, setCart] = useState([]);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [screenReader, setScreenReader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('customer');
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInstructions, setVoiceInstructions] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef(null);

  // High-quality food images
  const foodImages = {
    1: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    2: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    3: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    4: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    5: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    6: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    7: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    8: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    9: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    10: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  };

  const menuItems = {
    appetizers: [
      { id: 1, name: 'Crispy Wings', price: 12.99, description: 'Spicy buffalo wings with ranch dip', allergens: ['dairy'] },
      { id: 2, name: 'Mozzarella Sticks', price: 8.99, description: 'Golden fried cheese sticks with marinara', allergens: ['dairy', 'gluten'] },
      { id: 3, name: 'Bruschetta', price: 9.99, description: 'Toasted bread topped with tomatoes, garlic, and basil', allergens: ['gluten'] }
    ],
    mains: [
      { id: 4, name: 'Classic Burger', price: 15.99, description: 'Beef patty with lettuce, tomato, onion, and special sauce', allergens: ['gluten', 'dairy'] },
      { id: 5, name: 'Grilled Salmon', price: 22.99, description: 'Fresh salmon with lemon butter sauce and seasonal vegetables', allergens: ['fish'] },
      { id: 6, name: 'Pasta Carbonara', price: 16.99, description: 'Spaghetti with creamy egg sauce, pancetta, and parmesan', allergens: ['gluten', 'dairy', 'eggs'] }
    ],
    desserts: [
      { id: 7, name: 'Chocolate Lava Cake', price: 8.99, description: 'Warm chocolate cake with a molten center, served with vanilla ice cream', allergens: ['dairy', 'gluten', 'eggs'] },
      { id: 8, name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', allergens: ['dairy', 'gluten', 'eggs'] }
    ],
    drinks: [
      { id: 9, name: 'Fresh Lemonade', price: 3.99, description: 'Homemade lemonade with mint', allergens: [] },
      { id: 10, name: 'Iced Tea', price: 2.99, description: 'Fresh brewed iced tea with lemon', allergens: [] }
    ]
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setVoiceTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        speak("Sorry, I didn't catch that. Please try again.");
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      console.warn('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // Handle voice commands
  useEffect(() => {
    if (!voiceTranscript || !isListening) return;

    const transcript = voiceTranscript.toLowerCase();
    
    if (!customerName) {
      // Capture name
      setCustomerName(voiceTranscript);
      speak(`Thank you ${voiceTranscript}. Now please tell me what you'd like to order. For example, say "I would like one burger and two lemonades".`);
      setVoiceInstructions('Now please tell me what you\'d like to order');
    } else {
      // Process order
      const items = parseVoiceOrder(transcript);
      if (items.length > 0) {
        addVoiceItemsToCart(items);
        speak(`I've added ${items.map(i => `${i.quantity} ${i.name}`).join(' and ')} to your cart. Would you like to add anything else? If not, say "place order".`);
        setVoiceInstructions('Would you like to add anything else? Say "place order" when done');
      } else if (transcript.includes('place order')) {
        placeOrder();
      } else if (transcript.includes('cancel') || transcript.includes('stop')) {
        stopVoiceOrder();
        speak('Voice order cancelled');
      } else {
        speak("I didn't understand that. Please try again or say specific items like 'one burger and two lemonades'.");
      }
    }

    setVoiceTranscript('');
  }, [voiceTranscript]);

  const parseVoiceOrder = (transcript) => {
    const menuItemsList = Object.values(menuItems).flat();
    const items = [];
    
    // Simple parsing - can be enhanced with more NLP
    const quantities = transcript.match(/\b(one|two|three|four|five|1|2|3|4|5)\b/g) || [];
    const itemNames = transcript.match(/\b(burger|salmon|pasta|wings|mozzarella|bruschetta|cake|tiramisu|lemonade|tea)\b/g) || [];
    
    quantities.forEach((q, i) => {
      const name = itemNames[i];
      if (name) {
        const quantity = isNaN(q) ? 
          {one:1, two:2, three:3, four:4, five:5}[q] : parseInt(q);
        const menuItem = menuItemsList.find(item => 
          item.name.toLowerCase().includes(name));
        
        if (menuItem) {
          items.push({ ...menuItem, quantity });
        }
      }
    });
    
    return items;
  };

  const addVoiceItemsToCart = (items) => {
    items.forEach(item => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setCart(cart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        ));
      } else {
        setCart([...cart, item]);
      }
    });
  };

  const startVoiceOrder = () => {
    if (!recognitionRef.current) {
      speak("Voice recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    setCart([]);
    setCustomerName('');
    setVoiceInstructions('Please state your name');
    speak("Welcome to voice ordering. Please state your name.");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopVoiceOrder = () => {
    setIsListening(false);
    setVoiceInstructions('');
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    if (screenReader) {
      speak(`Added ${item.name} to cart`);
    }
  };

  const removeFromCart = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const placeOrder = () => {
    if (!customerName.trim()) {
      setShowOrderConfirmation({
        show: true,
        type: 'error',
        message: 'Please enter your name to place an order'
      });
      
      if (isListening) {
        speak("Please tell me your name first.");
      }
      return;
    }

    if (cart.length === 0) {
      setShowOrderConfirmation({
        show: true,
        type: 'error',
        message: 'Your cart is empty. Please add items before placing an order'
      });
      
      if (isListening) {
        speak("Your cart is empty. Please tell me what you'd like to order.");
      }
      return;
    }

    const newOrder = {
      id: Date.now(),
      customerName,
      items: [...cart],
      total: getTotalPrice(),
      status: 'pending_payment',
      timestamp: new Date().toLocaleString()
    };

    setOrders([...orders, newOrder]);
    setCurrentOrder(newOrder);
    
    if (isListening) {
      speak(`Your order total is $${getTotalPrice()}. Please proceed to payment.`);
      stopVoiceOrder();
    }
    
    setShowPayment(true);
  };

  const processPayment = () => {
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.name) {
      setShowOrderConfirmation({
        show: true,
        type: 'error',
        message: 'Please fill in all payment details'
      });
      return;
    }

    // Update order status
    setOrders(orders.map(order => 
      order.id === currentOrder.id 
        ? { ...order, status: 'payment_successful' }
        : order
    ));

    // Show payment success
    setShowPaymentSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setCart([]);
      setShowPayment(false);
      setCurrentOrder(null);
      setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', name: '' });
      setCustomerName('');
    }, 3000);
    
    speak('Payment successful! Order confirmed.');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  // Theme classes
  const themeClasses = highContrast 
    ? 'bg-black text-yellow-300' 
    : 'bg-gray-50 text-gray-900';

  const cardClasses = highContrast
    ? 'bg-gray-900 border-yellow-300 border-2'
    : 'bg-white border border-gray-200 shadow-sm';

  const buttonClasses = highContrast
    ? 'bg-yellow-300 text-black border-2 border-yellow-300 hover:bg-yellow-400'
    : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md';

  const accentColor = highContrast ? 'text-yellow-300' : 'text-amber-600';

  // Payment Success Popup
{/* Payment Success Popup */}
if (showPaymentSuccess) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${cardClasses} p-8 max-w-md rounded-xl text-center animate-bounce-in`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-lg mb-6">Thank you for your order, {customerName}!</p>
        <p className="mb-4">Your food will be delivered in approximately 30 minutes.</p>
        <p className="text-sm text-gray-500 mb-6">Order #: {currentOrder?.id}</p>
        <button
          onClick={() => {
            setShowPaymentSuccess(false);
            setCart([]);
            setCustomerName('');
          }}
          className={`${buttonClasses} w-full py-2 rounded-lg`}
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
}

  // Order Confirmation Popup
  if (showOrderConfirmation?.show) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${cardClasses} p-6 max-w-md rounded-xl`}>
          <div className={`w-16 h-16 ${showOrderConfirmation.type === 'error' ? 'bg-red-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {showOrderConfirmation.type === 'error' ? (
              <X className="text-red-600" size={32} />
            ) : (
              <Check className="text-green-600" size={32} />
            )}
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">
            {showOrderConfirmation.type === 'error' ? 'Error' : 'Success'}
          </h2>
          <p className="text-center mb-6">{showOrderConfirmation.message}</p>
          <button
            onClick={() => setShowOrderConfirmation({...showOrderConfirmation, show: false})}
            className={`${buttonClasses} w-full py-2 rounded-lg`}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // Payment View
  if (showPayment) {
    return (
      <div className={`min-h-screen ${themeClasses} ${fontSizeClasses[fontSize]} p-4 md:p-8`}>
        <div className={`${cardClasses} p-6 md:p-8 max-w-2xl mx-auto rounded-xl shadow-lg`}>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowPayment(false)}
              className={`${buttonClasses} p-2 rounded-lg`}
              aria-label="Go back to menu"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Payment Details</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className={`${highContrast ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}>
              <p className="text-lg">Customer: {customerName}</p>
              <p className="text-lg">Total: ${getTotalPrice()}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Items:</p>
                <ul className="text-sm list-disc list-inside">
                  {cart.map(item => (
                    <li key={item.id}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cardholder Name</label>
              <input
                type="text"
                value={paymentDetails.name}
                onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})}
                className={`w-full p-3 rounded-lg border ${highContrast ? 'bg-gray-800 border-yellow-300 text-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                placeholder="John Doe"
                aria-label="Cardholder name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Card Number</label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                className={`w-full p-3 rounded-lg border ${highContrast ? 'bg-gray-800 border-yellow-300 text-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                placeholder="1234 5678 9012 3456"
                aria-label="Card number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${highContrast ? 'bg-gray-800 border-yellow-300 text-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                  placeholder="MM/YY"
                  aria-label="Expiry date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${highContrast ? 'bg-gray-800 border-yellow-300 text-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                  placeholder="123"
                  aria-label="CVV"
                />
              </div>
            </div>

            <button
              onClick={processPayment}
              className={`${buttonClasses} w-full py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 mt-6`}
              aria-label={`Pay $${getTotalPrice()}`}
            >
              <CreditCard size={20} />
              Pay ${getTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (currentView === 'admin') {
    return (
      <div className={`min-h-screen ${themeClasses} ${fontSizeClasses[fontSize]} p-4 md:p-8`}>
        <div className={`${cardClasses} p-6 rounded-xl mb-6 shadow-lg`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setCurrentView('customer')}
              className={`${buttonClasses} px-4 py-2 rounded-lg flex items-center gap-2`}
            >
              Back to Customer View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`${cardClasses} p-6 rounded-xl shadow-md`}>
            <div className="flex items-center gap-4">
              <div className={`${highContrast ? 'bg-yellow-300' : 'bg-amber-100'} p-3 rounded-full`}>
                <Users className={highContrast ? 'text-black' : 'text-amber-800'} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Orders</h3>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className={`${cardClasses} p-6 rounded-xl shadow-md`}>
            <div className="flex items-center gap-4">
              <div className={`${highContrast ? 'bg-yellow-300' : 'bg-amber-100'} p-3 rounded-full`}>
                <DollarSign className={highContrast ? 'text-black' : 'text-amber-800'} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Revenue</h3>
                <p className="text-2xl font-bold">
                  ${orders.reduce((total, order) => total + parseFloat(order.total), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className={`${cardClasses} p-6 rounded-xl shadow-md`}>
            <div className="flex items-center gap-4">
              <div className={`${highContrast ? 'bg-yellow-300' : 'bg-amber-100'} p-3 rounded-full`}>
                <Clock className={highContrast ? 'text-black' : 'text-amber-800'} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl font-bold">
                  {orders.filter(order => order.status === 'pending_payment').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${cardClasses} p-6 rounded-xl shadow-lg`}>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No orders yet</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className={`${highContrast ? 'bg-gray-800 border-yellow-300' : 'bg-gray-50 border border-gray-200'} p-4 rounded-lg`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{order.customerName}</h3>
                      <p className="text-sm text-gray-500">{order.timestamp}</p>
                      <p className="font-medium">Total: ${order.total}</p>
                    </div>
                    <div>
                      {order.status === 'pending_payment' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'payment_successful')}
                          className={`${buttonClasses} px-4 py-2 rounded-lg`}
                        >
                          Mark as Paid
                        </button>
                      )}
                      {order.status === 'payment_successful' && (
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-center">
                          Payment Successful
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <p><strong>Items:</strong> {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Customer View
  return (
    <div className={`min-h-screen ${themeClasses} ${fontSizeClasses[fontSize]} transition-all duration-300`}>
      {/* Mobile Header */}
      <header className={`${cardClasses} p-4 md:hidden flex justify-between items-center sticky top-0 z-50 shadow-md`}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${buttonClasses} p-2 rounded-lg`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">MOUTH-WATERING RESTAURANT</h1>
        <div className="relative">
          <button 
            className={`${buttonClasses} p-2 rounded-lg flex items-center`}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
{/* Mobile Menu */}
{isMenuOpen && (
  <div className={`${cardClasses} p-4 absolute top-16 left-0 right-0 z-40 shadow-lg md:hidden max-h-[80vh] overflow-y-auto`}>
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Accessibility Settings</h2>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`${buttonClasses} p-2 rounded-lg flex items-center gap-2 text-sm`}
        >
          <Eye size={16} />
          {highContrast ? 'High Contrast' : 'Normal'}
        </button>
        
        <button
          onClick={isListening ? stopVoiceOrder : startVoiceOrder}
          className={`${isListening ? 'bg-red-500 hover:bg-red-600' : buttonClasses} p-2 rounded-lg flex items-center gap-2 text-sm`}
        >
          <Mic size={16} />
          {isListening ? 'Stop Voice' : 'Voice Order'}
        </button>
        
        <button
          onClick={() => {
            setScreenReader(!screenReader);
            speak(screenReader ? 'Screen reader disabled' : 'Screen reader enabled');
          }}
          className={`${buttonClasses} p-2 rounded-lg flex items-center gap-2 text-sm`}
        >
          <Volume2 size={16} />
          Audio: {screenReader ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={() => setCurrentView('admin')}
          className={`${buttonClasses} p-2 rounded-lg flex items-center gap-2 text-sm`}
        >
          <Settings size={16} />
          Admin
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text Size</label>
        <select 
          value={fontSize} 
          onChange={(e) => setFontSize(e.target.value)}
          className={`w-full p-2 rounded-lg border ${highContrast ? 'bg-gray-800 text-yellow-300 border-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">Extra Large</option>
        </select>
      </div>

      <div>
        <label htmlFor="mobileCustomerName" className="block text-sm font-medium mb-1">Your Name</label>
        <input
          id="mobileCustomerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className={`w-full p-2 rounded-lg border ${highContrast ? 'bg-gray-800 text-yellow-300 border-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
        />
      </div>

      <button
        onClick={() => setIsMenuOpen(false)}
        className={`${buttonClasses} w-full p-2 rounded-lg mt-2`}
      >
        Close Menu
      </button>
    </div>
  </div>
)}
      {/* Desktop Header */}
      <header className={`${cardClasses} p-6 hidden md:block mx-4 mt-4 rounded-xl shadow-lg`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className={accentColor}>Gourmet</span> Express
            </h1>
            <p className="text-lg">Delicious food, delivered fast</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                className={`${buttonClasses} px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold`}
                aria-label={`Shopping cart with ${cart.length} items`}
              >
                <ShoppingCart size={24} />
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 mx-4">
        {/* Desktop Menu Categories */}
        <nav className={`${cardClasses} p-4 rounded-xl hidden md:block lg:w-64 shadow-md`} aria-label="Menu categories">
          <h2 className="text-xl font-bold mb-4">Menu Categories</h2>
          <div className="space-y-2">
            {Object.keys(menuItems).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedCategory === category 
                    ? buttonClasses
                    : highContrast 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {/* Accessibility Controls */}
          <div className={`${cardClasses} p-4 mb-4 hidden md:block rounded-xl shadow-md`}>
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`${buttonClasses} px-3 py-2 rounded-lg flex items-center gap-2 text-sm`}
                  aria-label="Toggle high contrast mode"
                >
                  <Eye size={16} />
                  {highContrast ? 'High Contrast ON' : 'High Contrast OFF'}
                </button>
                
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`${highContrast ? 'bg-gray-800 text-yellow-300 border-yellow-300' : 'bg-white border-gray-300'} border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500`}
                  aria-label="Select font size"
                >
                  <option value="small">Small Text</option>
                  <option value="medium">Medium Text</option>
                  <option value="large">Large Text</option>
                  <option value="xlarge">Extra Large Text</option>
                </select>

                <button
                  onClick={isListening ? stopVoiceOrder : startVoiceOrder}
                  className={`${isListening ? 'bg-red-500 hover:bg-red-600' : buttonClasses} px-3 py-2 rounded-lg flex items-center gap-2 text-sm`}
                  aria-label={isListening ? 'Stop voice order' : 'Start voice order'}
                >
                  <Mic size={16} />
                  {isListening ? 'Stop Voice' : 'Voice Order'}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setScreenReader(!screenReader);
                    speak(screenReader ? 'Screen reader disabled' : 'Screen reader enabled');
                  }}
                  className={`${buttonClasses} px-3 py-2 rounded-lg flex items-center gap-2 text-sm`}
                  aria-label="Toggle screen reader announcements"
                >
                  <Volume2 size={16} />
                  Audio: {screenReader ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setCurrentView('admin')}
                  className={`${buttonClasses} px-3 py-2 rounded-lg flex items-center gap-2 text-sm`}
                  aria-label="Admin panel"
                >
                  <Settings size={16} />
                  Admin
                </button>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="customerName" className="block text-sm font-medium mb-1">Your Name</label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full p-2 rounded-lg border ${highContrast ? 'bg-gray-800 text-yellow-300 border-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                aria-label="Enter your name for the order"
              />
            </div>
          </div>

          {/* Voice Order Instructions */}
          {isListening && (
            <div className={`${cardClasses} p-4 mb-4 rounded-xl shadow-md animate-pulse`}>
              <div className="flex items-center gap-2">
                <Mic className={accentColor} size={20} />
                <p className="font-medium">{voiceInstructions}</p>
              </div>
              {voiceTranscript && (
                <p className="mt-2 text-sm italic">You said: "{voiceTranscript}"</p>
              )}
            </div>
          )}

          {/* Mobile Category Selector */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`appearance-none w-full p-3 rounded-lg border ${highContrast ? 'bg-gray-800 text-yellow-300 border-yellow-300' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-amber-500`}
                aria-label="Select menu category"
              >
                {Object.keys(menuItems).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${highContrast ? 'text-yellow-300' : 'text-gray-500'}`}>
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {selectedCategory.replace('_', ' ')} Menu
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {menuItems[selectedCategory].map(item => (
                <article key={item.id} className={`${cardClasses} p-4 rounded-xl shadow-md hover:shadow-lg transition-all`}>
                  <div className="mb-4 relative aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={foodImages[item.id]} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800/EDE9FE/8B5CF6?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className={`text-xl font-bold ${accentColor}`}>${item.price}</span>
                  </div>
                  
                  <p className="mb-4 text-gray-700">{item.description}</p>
                  
                  {item.allergens.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-red-600">
                        Contains: {item.allergens.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => addToCart(item)}
                      className={`${buttonClasses} px-4 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base`}
                      aria-label={`Add ${item.name} to cart for $${item.price}`}
                    >
                      <Plus size={18} />
                      Add to Cart
                    </button>
                    
                    {cart.find(cartItem => cartItem.id === item.id) && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600"
                          aria-label={`Remove one ${item.name} from cart`}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold">
                          {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* Cart Sidebar - Mobile Bottom Sheet */}
        <aside className={`${cardClasses} fixed bottom-0 left-0 right-0 z-50 p-4 rounded-t-2xl shadow-2xl md:hidden transform transition-transform ${cart.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Order</h2>
            <span className={`text-lg font-bold ${accentColor}`}>${getTotalPrice()}</span>
          </div>
          
          <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
            {cart.map(item => (
              <div key={item.id} className={`${highContrast ? 'bg-gray-800' : 'bg-gray-100'} p-3 rounded-lg flex justify-between items-center`}>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">x{item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}Go
          </div>
          
          <button
            onClick={placeOrder}
            disabled={!customerName.trim()}
            className={`${buttonClasses} w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={`Place order for $${getTotalPrice()}`}
          >
            <Check size={20} />
            Place Order (${getTotalPrice()})
          </button>
        </aside>

        {/* Cart Sidebar - Desktop */}
        <aside className={`${cardClasses} p-6 rounded-xl hidden md:block lg:w-96 h-fit sticky top-4 shadow-lg`}>
          <h2 className="text-xl font-bold mb-6">Your Order</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className={`${highContrast ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg flex justify-between items-center`}>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`border-t ${highContrast ? 'border-yellow-300' : 'border-gray-200'} pt-4`}>
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span className={accentColor}>${getTotalPrice()}</span>
                </div>
              </div>
              
              <button
                onClick={placeOrder}
                disabled={!customerName.trim()}
                className={`${buttonClasses} w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Check size={20} />
                Place Order (${getTotalPrice()})
              </button>
              
              {!customerName.trim() && (
                <p className="text-sm text-red-500 text-center">Please enter your name to place an order</p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default AccessibleFoodOrderingPlatform;