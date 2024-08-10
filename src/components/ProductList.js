// import React, { useEffect, useState } from 'react';
// import ProductItem from './ProductItem';
// import '../styles/ProductList.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8); // Display 10 products per page, so 2 rows per page

//   useEffect(() => {
//     // Fetch product data from an API
//     fetch('https://fakestoreapi.com/products')
   
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   // Get current products
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div className="product-list-container">
//       <div className="product-list">
//         {currentProducts.map(product => (
//           <ProductItem key={product.id} product={product} />
//         ))}
//       </div>
//       <div className="pagination">
//         {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
//           <button
//             key={number}
//             onClick={() => paginate(number + 1)}
//             className={currentPage === number + 1 ? 'active' : ''}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { fetchProducts } from '../utils/api'; // Import the utility function
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Display 8 products per page, so 2 rows per page

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
