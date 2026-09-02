import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import FlashDeals from "./pages/FlashDeals";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Addresses from "./pages/Addresses";
import ProtectedRoutes from "./components/ProtectedRoutes";
const App = () => {
  return (
    <>
      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path="/login" element={<Login />} />

        {/* Main pages - With Navbar/Footer  */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="deals" element={<FlashDeals />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1B3022",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
};

export default App;
