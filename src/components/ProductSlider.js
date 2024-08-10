
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import '../styles/ProductSlider.css';

// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); 
//         setProducts(data);
//       })
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     arrows: false, 
    
//   };

//   return (
//     <div className="product-slider">
//       <Slider {...settings}>
//         {products.map((product) => (
//           <div key={product.id} className="slider-item">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="slider-image"
//             />
//             <div className="slider-content">
//               <h3>{product.title}</h3>
//               <p>{product.price ? `$${product.price}` : 'Price not available'}</p>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ProductSlider;
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { fetchProducts } from '../utils/api';
import '../styles/ProductSlider.css';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false, // Disables the prev/next buttons
  };

  return (
    <div className="product-slider">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <img
              src={product.image}
              alt={product.title}
              className="slider-image"
            />
            <div className="slider-content">
              <h3>{product.title}</h3>
              <p>{product.price ? `$${product.price}` : 'Price not available'}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
