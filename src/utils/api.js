// Mock API functions - in a real app these would fetch from your backend
export const getMenuItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, name: 'Garlic Bread', description: 'Freshly baked with garlic butter', price: 5.99, category: 'appetizers', allergens: 'wheat, dairy' },
    { id: 2, name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: 8.99, category: 'appetizers', allergens: 'dairy, eggs' },
    { id: 3, name: 'Grilled Salmon', description: 'With lemon butter sauce', price: 18.99, category: 'mains', allergens: 'fish' },
    { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate dessert', price: 7.99, category: 'desserts', allergens: 'wheat, dairy, eggs' },
    { id: 5, name: 'Iced Tea', description: 'Freshly brewed', price: 3.99, category: 'beverages', allergens: 'none' }
  ];
};

export const submitOrder = async (orderData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    orderId: Math.floor(Math.random() * 10000),
    estimatedTime: '30-45 minutes'
  };
};