export const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  export const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };
 

export const fetchProductData = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};

export const fetchFeedbackData = (productId) => {
  try {
    const savedFeedbacks = JSON.parse(localStorage.getItem(`feedbacks_${productId}`)) || [];
    return savedFeedbacks;
  } catch (error) {
    console.error('Error fetching feedback data:', error);
    return [];
  }
};
