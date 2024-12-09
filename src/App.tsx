import React from "react";
import ProductList from "./components/ProductList/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const App: React.FC = () => {
  return (
    <div>
      <h1>Product List App</h1>
      <Router>
        <Routes>
          {/* Route for Product List */}
          <Route path="/" element={<ProductList />} />

          {/* Route for Product Details */}
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
