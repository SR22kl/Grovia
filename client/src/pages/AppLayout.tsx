import { Outlet } from "react-router-dom";
import Banners from "../components/Banners";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSideBar from "../components/CartSideBar";

const AppLayout = () => {
  return (
    <>
      <Banners />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSideBar />
    </>
  );
};

export default AppLayout;
