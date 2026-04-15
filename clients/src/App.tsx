import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import Products from "./pages/products/products";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Navbar from "./components/navbar";


function App() {
  return (

      <BrowserRouter>
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Box>
      </BrowserRouter>
  );
}

export default App;