import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Feedbackform from './components/Feedbackform';
import ProductSlider from './components/ProductSlider';
import Feedbacklist from './components/Feedbacklist'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ProductList />} />
          <Route path="/product/:productId/feedback" element={<Feedbackform />} />
          <Route path="/product/:productId/feedback-list" element={<Feedbacklist />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const isFeedbackPage = location.pathname.includes('/feedback');

  return (
    <div>
      <Navbar />
      {!isFeedbackPage && <ProductSlider />}
      
      <Outlet />
    </div>
  );
};

export default App;
